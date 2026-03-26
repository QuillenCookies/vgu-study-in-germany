import React, { useCallback, useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '../components/ui/carousel';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Euro,
  MapPin,
  Search,
  AlertCircle,
  Loader2,
  Navigation,
  Info,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUniversity } from '../context/UniversityContext';

interface CommuteRow {
  from: string;
  to: string;
  line: string;
  time: string;
  delay?: string;
}

interface TrainRoute {
  id: string;
  title: string;
  description: string;
  image: string;
  lines: string[];
  duration: string;
}

interface TicketInfo {
  name: string;
  price: string;
  validity: string;
  note: string;
}

interface JourneySegment {
  type: 'walk' | 'train' | 'transfer' | 'bus' | 'subway' | 'tram';
  line?: string;
  detail: string;
  duration: string;
  departure?: string;
  arrival?: string;
}

interface Journey {
  duration: string;
  changes: number;
  segments: JourneySegment[];
  fare?: string;
  isRMV?: boolean;
}

interface CityOption {
  id: number;
  name: string;
}

const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

const TrainPage: React.FC = () => {
  const { tr } = useLanguage();
  const { selectedLocation } = useUniversity();

  // ── Derive default city from context (reactive) ─────────────────────────
  const getDefaultCity = useCallback(() => {
    return selectedLocation && selectedLocation.type === 'city'
      ? selectedLocation.name
      : 'Frankfurt';
  }, [selectedLocation]);

  // API states
  const [stationName, setStationName] = useState(() => getDefaultCity());
  const [searchInput, setSearchInput] = useState(() => getDefaultCity());
  const [commuteData, setCommuteData] = useState<CommuteRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hero search dropdown state (matching HomePage pattern)
  const [suggestions, setSuggestions] = useState<{ cities: any[]; universities: any[] }>({ cities: [], universities: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  // Journey Planner cities dropdown
  const [cities, setCities] = useState<CityOption[]>([]);
  const [pathFrom, setPathFrom] = useState('');
  const [pathTo, setPathTo] = useState('');
  const [isPathLoading, setIsPathLoading] = useState(false);
  const [suggestedPath, setSuggestedPath] = useState<Journey | null>(null);
  const [pathError, setPathError] = useState<string | null>(null);

  // Static API States
  const [frankfurtRoutes, setFrankfurtRoutes] = useState<TrainRoute[]>([]);
  const [tickets, setTickets] = useState<TicketInfo[]>([]);
  const [estimations, setEstimations] = useState<CommuteRow[]>([]);

  // Carousel logic
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [routesCarouselApi, setRoutesCarouselApi] = useState<CarouselApi>();
  const [canRoutesScrollPrev, setCanRoutesScrollPrev] = useState(false);
  const [canRoutesScrollNext, setCanRoutesScrollNext] = useState(false);
  const [currentRouteSlide, setCurrentRouteSlide] = useState(0);

  // Triple-fetch prevention
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastFetchedQueryRef = useRef<string>('');

  // External station confirmation dialog
  const [pendingExternalStation, setPendingExternalStation] = useState<{ id: string; name: string } | null>(null);

  // ── On mount / context change: sync search inputs ────────────────────────
  useEffect(() => {
    const city = getDefaultCity();
    setSearchInput(city);
    setStationName(city);
    setPathFrom(city);
  }, [getDefaultCity]);

  // ── Click-outside to close hero dropdown ─────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ── Debounced city/uni suggestions for hero search ────────────────────────
  useEffect(() => {
    if (!searchInput.trim()) {
      setSuggestions({ cities: [], universities: [] });
      setShowDropdown(false);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSuggestionsLoading(true);
      setShowDropdown(true);
      try {
        const res = await fetch(`/api/cities/search?q=${encodeURIComponent(searchInput)}`);
        const result = await res.json();
        if (result.status === 'success' && result.data) {
          setSuggestions({
            cities: result.data.cities || [],
            universities: result.data.universities || [],
          });
        }
      } catch {
        // silently ignore
      } finally {
        setIsSuggestionsLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // ── Fetch city list for Journey Planner dropdowns ─────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/cities/list');
        const data = await res.json();
        if (data.status === 'success') {
          setCities(data.data);
        }
      } catch {
        // non-critical, dropdowns will just be empty
      }
    })();
  }, []);

  // Save external station to local DB when user confirms
  const saveExternalStation = useCallback(async (station: { id: string; name: string }) => {
    try {
      await fetch('/api/locations/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(station),
      });
    } catch (err) {
      console.warn('Could not save station locally:', err);
    } finally {
      setPendingExternalStation(null);
    }
  }, []);

  // Helper for station ID resolution (local-first, no auto-save for external)
  const resolveStation = useCallback(async (query: string, signal?: AbortSignal): Promise<{ id: string; name: string; source?: string } | null> => {
    try {
      const res = await fetch(`/api/locations/search?q=${encodeURIComponent(query)}`, { signal });
      const data = await res.json();
      if (data.status === 'success' && data.data.length > 0) {
        return data.data[0];
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') console.error('Resolution error:', err);
    }
    return null;
  }, []);

  const fetchLiveTrainData = useCallback(async (name: string) => {
    const trimmed = name.trim();
    if (trimmed === lastFetchedQueryRef.current) return;

    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);
    lastFetchedQueryRef.current = trimmed;

    try {
      const resolved = await resolveStation(trimmed, controller.signal);
      if (controller.signal.aborted) return;

      if (resolved?.source === 'external') {
        setPendingExternalStation({ id: resolved.id, name: resolved.name });
      }

      const queryParam = resolved ? resolved.id : trimmed;
      const liveRes = await fetch(`/api/trains/routes?station=${encodeURIComponent(queryParam)}`, { signal: controller.signal });
      const liveData = await liveRes.json();

      if (liveData.status === 'success') {
        setCommuteData(liveData.data);
        setStationName(resolved ? resolved.name : trimmed);
      } else {
        setError(liveData.message || 'Error fetching live departures');
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') setError('Failed to connect: ' + err.message);
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
    }
  }, [resolveStation]);

  const fetchStaticTrainData = async (query: string) => {
    try {
      const res = await fetch(`/api/trains/info?station=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.status === 'success') {
        setFrankfurtRoutes(data.data.routes || []);
        setTickets(data.data.tickets || []);
        setEstimations(data.data.commuteEstimations || []);
      }
    } catch (err: any) {
      console.error('Failed to fetch static train info', err);
    }
  };

  // Initial fetch — re-fires when context location changes
  useEffect(() => {
    const city = getDefaultCity();
    lastFetchedQueryRef.current = ''; // reset guard so new city always fetches
    fetchLiveTrainData(city);
    fetchStaticTrainData(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDefaultCity]);

  // Carousels sync
  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    update();
    carouselApi.on('select', update);
    return () => { carouselApi.off('select', update); };
  }, [carouselApi]);

  useEffect(() => {
    if (!routesCarouselApi) return;
    const update = () => {
      setCanRoutesScrollPrev(routesCarouselApi.canScrollPrev());
      setCanRoutesScrollNext(routesCarouselApi.canScrollNext());
      setCurrentRouteSlide(routesCarouselApi.selectedScrollSnap());
    };
    update();
    routesCarouselApi.on('select', update);
    return () => { routesCarouselApi.off('select', update); };
  }, [routesCarouselApi]);

  // ── Hero search handlers ──────────────────────────────────────────────────
  const handleSelectSuggestion = (name: string) => {
    setSearchInput(name);
    setShowDropdown(false);
    setSuggestions({ cities: [], universities: [] });
    lastFetchedQueryRef.current = '';
    fetchLiveTrainData(name);
    fetchStaticTrainData(name);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchInput.trim();
    if (!q) return;
    setShowDropdown(false);
    lastFetchedQueryRef.current = '';
    fetchLiveTrainData(q);
    fetchStaticTrainData(q);
  };

  // ── Journey Planner handler ───────────────────────────────────────────────
  const handlePathSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pathFrom.trim() || !pathTo.trim()) return;

    setIsPathLoading(true);
    setSuggestedPath(null);
    setPathError(null);

    try {
      const fromRes = await resolveStation(pathFrom);
      const toRes = await resolveStation(pathTo);
      console.log('Resolved:', fromRes, toRes);

      if (!fromRes || !toRes) {
        setPathError('Could not resolve stations for journey planning.');
        setIsPathLoading(false);
        return;
      }

      const cacheKey = `journey_${fromRes.id}_${toRes.id}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setSuggestedPath(data);
          setIsPathLoading(false);
          return;
        }
      }

      const journeyUrl = `/api/trains/journey?from=${encodeURIComponent(fromRes.id)}&to=${encodeURIComponent(toRes.id)}&results=1&tickets=true`;
      const res = await fetch(journeyUrl);
      const data = await res.json();

      if (data.journeys && data.journeys.length > 0) {
        const j = data.journeys[0];

        const mappedSegments: JourneySegment[] = j.legs.map((leg: any) => ({
          type: leg.line ? (leg.line.productName === 'bus' ? 'bus' : 'train') : (leg.walking ? 'walk' : 'transfer'),
          line: leg.line?.name || undefined,
          detail: leg.direction || leg.destination?.name || 'Walk',
          duration: `${Math.round((new Date(leg.arrival).getTime() - new Date(leg.departure).getTime()) / 60000)} min`
        }));

        const totalDuration = `${Math.round((new Date(j.arrival).getTime() - new Date(j.departure).getTime()) / 60000)} min`;
        const fare = j.price?.amount ? `€${j.price.amount.toFixed(2)}` : null;

        const journeyResult: Journey = {
          duration: totalDuration,
          changes: j.legs.filter((l: any) => l.line).length - 1,
          segments: mappedSegments,
          fare: fare || undefined,
          isRMV: !fare
        };

        setSuggestedPath(journeyResult);
        localStorage.setItem(cacheKey, JSON.stringify({ data: journeyResult, timestamp: Date.now() }));
      } else {
        setPathError('No journeys found for this route.');
      }
    } catch (err) {
      console.error('Journey Fetch Error:', err);
      setPathError('Failed to fetch journey details.');
    } finally {
      setIsPathLoading(false);
    }
  };

  const getLineStyles = (line: string) => {
    if (line.startsWith('S')) return 'bg-[#008d3f] border-[#006b30]';
    if (line.startsWith('U')) return 'bg-[#003090] border-[#002060]';
    if (line.match(/^(RE|RB|SE)/)) return 'bg-[#be0000] border-[#8b0000]';
    if (line.startsWith('ICE') || line.startsWith('IC')) return 'bg-[#ececec] text-[#ff0000] border-[#cccccc]';
    return 'bg-[#333333] border-black';
  };

  return (
    <>
      {/* External Station Confirmation Banner */}
      {pendingExternalStation && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0a2463] text-white rounded-2xl shadow-2xl border border-white/20 px-6 py-4 flex items-center gap-4 max-w-md w-full">
          <Info className="w-6 h-6 text-[#f97316] shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-sm">Station from external API</p>
            <p className="text-white/70 text-xs mt-0.5"><span className="font-bold text-white">{pendingExternalStation.name}</span> was not in local DB. Save it for faster lookups?</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => saveExternalStation(pendingExternalStation)}
              className="bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
            >Save</button>
            <button
              onClick={() => setPendingExternalStation(null)}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
            >Dismiss</button>
          </div>
        </div>
      )}
      <Layout>
        {/* ── Hero Banner ───────────────────────────────── */}
        <section className="relative bg-[#0a2463] text-white py-20 px-4 overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1920&q=80')" }}
          />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <Badge variant="orange" className="mb-4 text-sm px-4 py-1">{tr('transport', 'badge')} - {stationName}</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
              {tr('transport', 'title1')} <span className="text-[#f97316]">{stationName}</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              {tr('transport', 'desc')}
            </p>

            {/* ── Search with dropdown (matches HomePage) ── */}
            <div className="relative max-w-lg mx-auto mb-10" ref={searchDropdownRef}>
              <form
                onSubmit={handleSearch}
                className="flex w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
              >
                <div className="flex items-center pl-4 text-gray-400">
                  <Navigation className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => { if (searchInput.trim()) setShowDropdown(true); }}
                  placeholder="Search station (e.g. Frankfurt, Darmstadt...)"
                  className="flex-1 px-4 py-4 text-gray-800 text-base outline-none bg-transparent placeholder-gray-400"
                />
                {isSuggestionsLoading && (
                  <div className="flex items-center pr-3 text-gray-400">
                    <Loader2 className="w-5 h-5 animate-spin text-[#f97316]" />
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="m-2 px-7 bg-[#f97316] hover:bg-[#ea580c] rounded-xl font-bold transition-transform active:scale-95 disabled:opacity-60 whitespace-nowrap"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Search className="w-5 h-5 mr-2" />} Find
                </Button>
              </form>

              {/* Dropdown Suggestions */}
              {showDropdown && (suggestions.cities.length > 0 || suggestions.universities.length > 0) && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="max-h-72 overflow-y-auto py-2">
                    {/* Universities */}
                    {suggestions.universities.length > 0 && (
                      <div className="mb-2">
                        <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Universities</div>
                        {suggestions.universities.map((uni, idx) => (
                          <button
                            key={`uni-${uni.id || uni.uni_id || idx}`}
                            type="button"
                            onClick={() => handleSelectSuggestion(uni.name || uni.uni_name)}
                            className="w-full text-left px-4 py-2 hover:bg-orange-50 text-gray-800 focus:bg-orange-50 focus:outline-none transition-colors flex items-center gap-3"
                          >
                            <span className="text-xl">🎓</span>
                            <span>{uni.name || uni.uni_name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {/* Cities */}
                    {suggestions.cities.length > 0 && (
                      <div>
                        <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Cities</div>
                        {suggestions.cities.map((city, idx) => (
                          <button
                            key={`city-${city.id || city.city_id || idx}`}
                            type="button"
                            onClick={() => handleSelectSuggestion(city.name || city.city_name)}
                            className="w-full text-left px-4 py-2 hover:bg-orange-50 text-gray-800 focus:bg-orange-50 focus:outline-none transition-colors flex items-center gap-3"
                          >
                            <span className="text-xl">📍</span>
                            <span>{city.name || city.city_name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: tr('transport', 'statLines'), value: '15+' },
                { label: tr('transport', 'statSBahn'), value: '9' },
                { label: tr('transport', 'statAirport'), value: '11 min' },
                { label: tr('transport', 'statSemester'), value: '~€200' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 min-w-[120px]">
                  <div className="text-3xl font-extrabold text-[#f97316]">{value}</div>
                  <div className="text-sm text-white/70 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Journey Planner ───────────── */}
        <section className="py-12 bg-gray-50 px-4">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 w-full">
                <div className="flex flex-col gap-2 mb-6">
                  <Badge className="w-fit">{tr('transport', 'secPlannerBadge')}</Badge>
                  <h2 className="text-2xl font-bold text-[#0a2463]">{tr('transport', 'secPlannerTitle')}</h2>
                  <p className="text-sm text-gray-400">{tr('transport', 'secPlannerDesc')}</p>
                </div>
                <form onSubmit={handlePathSearch} className="flex flex-col gap-4">
                  {/* From dropdown */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1 uppercase tracking-wide">From</label>
                    <div className="relative">
                      <select
                        value={pathFrom}
                        onChange={(e) => setPathFrom(e.target.value)}
                        required
                        className="w-full appearance-none pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f97316] transition-all text-gray-800 font-medium cursor-pointer"
                      >
                        <option value="" disabled>Select departure city…</option>
                        {cities.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* To dropdown */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 ml-1 uppercase tracking-wide">To</label>
                    <div className="relative">
                      <select
                        value={pathTo}
                        onChange={(e) => setPathTo(e.target.value)}
                        required
                        className="w-full appearance-none pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f97316] transition-all text-gray-800 font-medium cursor-pointer"
                      >
                        <option value="" disabled>Select destination city…</option>
                        {cities.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPathLoading || !pathFrom || !pathTo}
                    className="w-full mt-2 h-12 rounded-xl bg-[#0a2463] hover:bg-[#0a2463]/90 text-white font-bold text-lg"
                  >
                    {isPathLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <MapPin className="w-5 h-5 mr-2" />}
                    {tr('transport', 'btnShowRoutes')}
                  </Button>
                </form>
              </div>

              <div className="flex-1 w-full flex flex-col justify-center">
                {isPathLoading ? (
                  <div className="flex flex-col items-center justify-center p-12 gap-4 text-gray-400">
                    <Loader2 className="w-10 h-10 animate-spin text-[#f97316]" />
                    <p>Finding best routes...</p>
                  </div>
                ) : suggestedPath ? (
                  <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-[#f97316]/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-end mb-6 border-b pb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Suggested Route</p>
                        <h3 className="text-3xl font-black text-[#0a2463]">{suggestedPath.duration}</h3>
                      </div>
                      <div className="text-right">
                        {suggestedPath.fare ? (
                          <p className="font-bold text-[#f97316]">{suggestedPath.fare}</p>
                        ) : (
                          <Badge variant="orange" className="mb-1 text-[10px]">Included in Semesterticket</Badge>
                        )}
                        <p className="text-sm text-gray-500">{suggestedPath.changes} {suggestedPath.changes === 1 ? 'change' : 'changes'}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-[#f97316]" />
                        <div className="flex-1 w-0.5 bg-gray-200 my-1" />
                        <div className="w-3 h-3 rounded-full border-2 border-[#0a2463] bg-white" />
                      </div>
                      <div className="flex flex-col gap-5 flex-1 pb-2">
                        {suggestedPath.segments.map((seg, i) => (
                          <div key={i} className="flex justify-between items-start text-sm">
                            <div>
                              <p className="font-bold text-gray-800 flex items-center gap-2">
                                {seg.line && <span className={`px-2 py-0.5 rounded text-xs text-white ${getLineStyles(seg.line)}`}>{seg.line}</span>}
                                {seg.type === 'walk' ? '🚶 Walk' : seg.type === 'transfer' ? '🔄 Transfer' : seg.detail}
                              </p>
                            </div>
                            <span className="font-medium text-gray-500">{seg.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : pathError ? (
                  <div className="text-center p-10 bg-red-50 border border-dashed border-red-200 rounded-[2rem] h-full flex flex-col items-center justify-center">
                    <AlertCircle className="w-10 h-10 text-red-300 mb-3" />
                    <p className="text-red-400 font-medium">{pathError}</p>
                  </div>
                ) : (
                  <div className="text-center p-10 bg-white/50 border border-dashed border-gray-300 rounded-[2rem] h-full flex flex-col items-center justify-center">
                    <MapPin className="w-10 h-10 text-gray-300 mb-3" />
                    <p className="text-gray-400 font-medium">Select your start and destination to find the best route</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Fastest Connections (Live DB) ────────────────── */}
        <section className="py-16 bg-white overflow-hidden">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="mb-10 flex items-end justify-between">
              <div className="space-y-2">
                <Badge variant="outline" className="text-[#f97316] border-[#f97316]">{tr('transport', 'secLiveBadge')}</Badge>
                <h2 className="text-3xl font-bold text-[#0a2463]">{tr('transport', 'secLiveTitle')}</h2>
                <p className="text-gray-500">{tr('transport', 'secLiveDesc')} {stationName}</p>
              </div>
              <div className="hidden md:flex gap-2">
                <Button size="icon" variant="outline" onClick={() => carouselApi?.scrollPrev()} disabled={!canScrollPrev} className="rounded-xl"><ArrowLeft /></Button>
                <Button size="icon" variant="outline" onClick={() => carouselApi?.scrollNext()} disabled={!canScrollNext} className="rounded-xl"><ArrowRight /></Button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center py-20 gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-[#f97316]" />
              </div>
            ) : commuteData.length === 0 && !error ? (
              <p className="text-center text-gray-500 py-10">No live departures found for this station.</p>
            ) : error ? (
              <p className="text-center text-red-500 py-10 font-bold">{error}</p>
            ) : (
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent className="-ml-4">
                  {commuteData.slice(0, 8).map((route, idx) => {
                    const lineStyle = getLineStyles(route.line);
                    const isIce = route.line.startsWith('IC') || route.line.startsWith('ICE');
                    return (
                      <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/4">
                        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all h-full border-b-8" style={{ borderBottomColor: isIce ? '#cccccc' : lineStyle.split(' ')[0].replace('bg-[', '').replace(']', '') }}>
                          <div className="flex justify-between items-start mb-6">
                            <span className={`font-black px-4 py-1.5 rounded-lg text-sm ${isIce ? 'bg-gray-100 text-red-600 border border-gray-200' : `${lineStyle} text-white`}`}>
                              {route.line}
                            </span>
                            <div className="text-right">
                              <p className={`text-2xl font-black ${route.delay ? 'text-red-500' : 'text-[#0a2463]'}`}>{route.time}</p>
                              {route.delay && <Badge variant="destructive" className="mt-1 text-[10px] animate-pulse">{route.delay}</Badge>}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-[#0a2463] mb-1 line-clamp-2">{route.to}</h3>
                        </div>
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
              </Carousel>
            )}
          </div>
        </section>

        {/* ── Transport Lines Gallery (Static DB) ────────────────── */}
        {frankfurtRoutes.length > 0 && (
          <section className="py-16 bg-gray-50 overflow-hidden">
            <div className="max-w-screen-xl mx-auto px-4">
              <div className="mb-10 flex items-end justify-between">
                <div className="flex flex-col gap-3">
                  <Badge className="w-fit">{tr('transport', 'secRoutesBadge')}</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0a2463] tracking-tight">
                    {tr('transport', 'secRoutesTitle')}
                  </h2>
                  <p className="text-gray-500 max-w-lg text-lg">
                    {tr('transport', 'secRoutesDesc')}
                  </p>
                </div>
                <div className="hidden md:flex shrink-0 gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => routesCarouselApi?.scrollPrev()}
                    disabled={!canRoutesScrollPrev}
                    className="rounded-xl border-[#0a2463]/30 hover:bg-[#0a2463] hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => routesCarouselApi?.scrollNext()}
                    disabled={!canRoutesScrollNext}
                    className="rounded-xl border-[#0a2463]/30 hover:bg-[#0a2463] hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="w-full">
                <Carousel setApi={setRoutesCarouselApi}>
                  <CarouselContent className="ml-4 md:ml-[max(2rem,calc(50vw-560px))]">
                    {frankfurtRoutes.map((route) => (
                      <CarouselItem key={route.id} className="max-w-[300px] md:max-w-[340px] pl-5">
                        <div className="group relative h-full min-h-[420px] overflow-hidden rounded-2xl cursor-pointer shadow-sm border border-gray-100">
                          <img
                            src={route.image}
                            alt={route.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a2463]/90 via-[#0a2463]/30 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {route.lines.map((l) => (
                                <span key={l} className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#f97316] text-white">
                                  {l}
                                </span>
                              ))}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{route.title}</h3>
                            <p className="text-sm text-white/75 line-clamp-3 mb-3">{route.description}</p>
                            <div className="flex items-center gap-1.5 text-sm text-[#f97316] font-medium">
                              <Clock className="w-4 h-4" />
                              {route.duration}
                              <ArrowRight className="ml-auto w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="mt-6 flex justify-center gap-2">
                  {frankfurtRoutes.map((_, i) => (
                    <button
                      key={i}
                      className={`h-2 rounded-full transition-all ${currentRouteSlide === i ? 'w-6 bg-[#0a2463]' : 'w-2 bg-gray-300'}`}
                      onClick={() => routesCarouselApi?.scrollTo(i)}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Commute Estimations & Full Table ────────────────── */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-10">

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#0a2463] mb-6">{tr('transport', 'secLiveBoardTitle')}</h2>
              <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-gray-100 h-[400px] overflow-y-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#0a2463] text-white sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Line</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Destination</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Time</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {commuteData.map((row, i) => {
                      const isIce = row.line.startsWith('IC') || row.line.startsWith('ICE');
                      const lineStyle = getLineStyles(row.line);
                      return (
                        <tr key={i} className="hover:bg-blue-50/50 group">
                          <td className="px-6 py-4">
                            <span className={`${isIce ? 'bg-gray-100 text-red-600 border border-gray-200' : `${lineStyle} text-white`} font-bold text-xs px-3 py-1 rounded-md`}>
                              {row.line}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-[#0a2463]">{row.to}</td>
                          <td className="px-6 py-4 font-mono font-bold text-gray-600">{row.time}</td>
                          <td className="px-6 py-4">
                            {row.delay ? (
                              <span className="text-red-600 font-black text-[11px] flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {row.delay}
                              </span>
                            ) : (
                              <span className="text-green-600 font-black text-[11px] uppercase">On Time</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {commuteData.length === 0 && !isLoading && (
                      <tr>
                        <td colSpan={4} className="text-center py-10 text-gray-400">{tr('transport', 'secLiveBoardEmpty')}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex-1 lg:max-w-md">
              <h2 className="text-2xl font-bold text-[#0a2463] mb-6 flex items-center gap-2">
                <Badge variant="orange">{tr('transport', 'secTravelTimesBadge')}</Badge>
              </h2>
              <div className="overflow-x-auto rounded-[2rem] border border-gray-100 shadow-sm bg-white">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                    <tr>
                      <th className="px-5 py-4 font-semibold">From</th>
                      <th className="px-5 py-4 font-semibold">To</th>
                      <th className="px-5 py-4 font-semibold text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {estimations.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50/50">
                        <td className="px-5 py-4 text-gray-600">{row.from}</td>
                        <td className="px-5 py-4 font-medium text-[#0a2463]">{row.to}</td>
                        <td className="px-5 py-4 flex items-center justify-end gap-1.5 text-gray-600 font-bold">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {row.time}
                        </td>
                      </tr>
                    ))}
                    {estimations.length === 0 && (
                      <tr>
                        <td colSpan={3} className="text-center py-6 text-gray-400">{tr('transport', 'secTravelTimesEmpty')}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ticket Prices ───────────────────────────────────── */}
        {tickets.length > 0 && (
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-screen-xl mx-auto">
              <div className="flex flex-col gap-3 mb-10 text-center items-center">
                <Badge variant="orange" className="w-fit">{tr('transport', 'secTicketsBadge')}</Badge>
                <h2 className="text-3xl font-bold text-[#0a2463]">{tr('transport', 'secTicketsTitle')}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {tickets.map((t) => (
                  <div key={t.name} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#0a2463]/5 rounded-bl-[100%] transition-transform group-hover:scale-110" />

                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-[#0a2463] text-lg leading-tight">{t.name}</h3>
                      <span className="text-2xl font-black text-[#f97316]">{t.price}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg w-fit">
                      <Clock className="w-4 h-4 text-[#f97316]" />
                      {t.validity}
                    </div>

                    <div className="flex items-start gap-2 text-sm text-[#0a2463]/80 bg-blue-50/50 border border-blue-100/50 rounded-xl p-3 mt-auto">
                      <Info className="w-4 h-4 text-[#0a2463] shrink-0 mt-0.5" />
                      {t.note}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a href="https://www.rmv.de/en/homepage/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0a2463] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0a2463]/90 transition-all hover:scale-105 active:scale-95 shadow-md">
                  <MapPin className="w-5 h-5" /> RMV Journey Planner
                </a>
                <a href="https://www.bahn.de/en" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#be0000] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#a00000] transition-all hover:scale-105 active:scale-95 shadow-md">
                  <Euro className="w-5 h-5" /> DB Tickets
                </a>
              </div>
            </div>
          </section>
        )}

      </Layout>
    </>
  );
};

export default TrainPage;