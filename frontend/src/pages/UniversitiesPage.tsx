import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../components/Layout';
import { Badge } from '../components/ui/badge';
import { MapPin, Globe, BookOpen, Star, ExternalLink, Loader2, X, Filter, ArrowDownUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUniversity } from '../contexts/UniversityContext';

interface University {
  id: string;
  name: string;
  city: string;
  type: 'Public' | 'Private';
  globalRank: string;
  subjectRank: string;
  highlights: string[];
  image: string;
  url: string;
}

// Helper function to generate consistent random colors based on text string
const getHighlightColor = (text: string) => {
  const colorPalettes = [
    'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50',
    'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50',
    'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50',
    'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50',
    'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/50',
    'bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/50',
    'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50',
  ];

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colorPalettes.length;
  return colorPalettes[index];
};

const UniversitiesPage: React.FC = () => {
  const { tr } = useLanguage();
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Context
  const { selectedLocation, setSelectedLocation } = useUniversity();

  // Local Filter & Sort State
  const [filterCity, setFilterCity] = useState<string>('All');
  const [filterHighlight, setFilterHighlight] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All'); // NEW: Type Filter
  const [sortBy, setSortBy] = useState<'default' | 'global' | 'subject'>('default');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch('/api/universities');
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();

        const mappedData: University[] = data.map((dbUni: any) => ({
          id: String(dbUni.uni_id),
          name: dbUni.uni_name,
          city: dbUni.city_name || `City Region ${dbUni.city_id}`,
          type: dbUni.institution_type ? (dbUni.institution_type.charAt(0).toUpperCase() + dbUni.institution_type.slice(1)) as 'Public' | 'Private' : 'Public',
          globalRank: dbUni.ranking_global ? `#${dbUni.ranking_global} Global` : 'Unranked',
          subjectRank: dbUni.ranking_by_sub ? `#${dbUni.ranking_by_sub} Subject` : 'N/A',
          highlights: dbUni.highlights || [], // Trả về mảng rỗng nếu không có
          image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
          url: dbUni.website_url || '#',
        }));

        setUniversities(mappedData);
      } catch (err: any) {
        console.error('Error fetching universities:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Dynamically extract unique cities and highlights for the dropdowns
  const availableCities = useMemo(() => Array.from(new Set(universities.map(u => u.city))).sort(), [universities]);
  const availableHighlights = useMemo(() => Array.from(new Set(universities.flatMap(u => u.highlights))).sort(), [universities]);

  // Apply Context, Local Filters, and Sorting
  const processedUniversities = useMemo(() => {
    let result = [...universities];

    // 1. Apply Context Filter (From Homepage)
    if (selectedLocation) {
      if (selectedLocation.type === 'city') {
        result = result.filter(u => u.city.toLowerCase() === selectedLocation.name.toLowerCase());
      } else if (selectedLocation.type === 'university') {
        result = result.filter(u => u.id === String(selectedLocation.id));
      }
    }

    // 2. Apply Local Dropdown Filters
    if (filterCity !== 'All') {
      result = result.filter(u => u.city === filterCity);
    }
    if (filterHighlight !== 'All') {
      result = result.filter(u => u.highlights.includes(filterHighlight));
    }
    if (filterType !== 'All') {
      result = result.filter(u => u.type === filterType);
    }

    // 3. Apply Sorting
    const parseRank = (rankString: string) => {
      const match = rankString.match(/\d+/);
      return match ? parseInt(match[0], 10) : 999999;
    };

    if (sortBy === 'global') {
      result.sort((a, b) => parseRank(a.globalRank) - parseRank(b.globalRank));
    } else if (sortBy === 'subject') {
      result.sort((a, b) => parseRank(a.subjectRank) - parseRank(b.subjectRank));
    }

    return result;
  }, [universities, selectedLocation, filterCity, filterHighlight, filterType, sortBy]);


  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-[#FFCC00] mb-4" />
          <p className="text-[#1A2B4C] dark:text-white font-medium">{tr('universities', 'loading')}</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh] text-red-500">
          {tr('universities', 'loading')} error: {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative bg-[#1A2B4C] text-white py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Badge variant="orange" className="mb-4 text-sm px-4 py-1">{tr('universities', 'badge')}</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
            {tr('universities', 'title1')} <span className="text-[#FFCC00]">{tr('universities', 'title2')}</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {tr('universities', 'desc')}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50 dark:bg-[#0B1220] min-h-screen">
        <div className="max-w-screen-xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A2B4C] dark:text-white tracking-tight">
              {selectedLocation?.type === 'city'
                ? `${tr('universities', 'uniIn')} ${selectedLocation.name}`
                : tr('universities', 'uniComparison')}
            </h2>

            {selectedLocation && (
              <button
                onClick={() => setSelectedLocation(null)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 transition-colors shadow-sm text-sm font-medium w-fit"
              >
                <span>{tr('universities', 'filteringBy')} <strong>{selectedLocation.name}</strong></span>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* FILTER AND SORT BAR */}
          <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mr-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">{tr('universities', 'filterLabel')}</span>
              </div>

              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-100 text-sm rounded-lg focus:ring-[#FFCC00] focus:border-[#FFCC00] p-2.5 outline-none cursor-pointer"
              >
                <option value="All">{tr('universities', 'allCities')}</option>
                {availableCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-100 text-sm rounded-lg focus:ring-[#FFCC00] focus:border-[#FFCC00] p-2.5 outline-none cursor-pointer"
              >
                <option value="All">{tr('universities', 'allTypes')}</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>

              <select
                value={filterHighlight}
                onChange={(e) => setFilterHighlight(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-100 text-sm rounded-lg focus:ring-[#FFCC00] focus:border-[#FFCC00] p-2.5 outline-none cursor-pointer max-w-[200px]"
              >
                <option value="All">{tr('universities', 'allHighlights')}</option>
                {availableHighlights.map(highlight => (
                  <option key={highlight} value={highlight}>{highlight}</option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <ArrowDownUp className="w-4 h-4" />
                <span className="text-sm font-medium">{tr('universities', 'sortBy')}</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-100 text-sm rounded-lg focus:ring-[#FFCC00] focus:border-[#FFCC00] p-2.5 outline-none cursor-pointer"
              >
                <option value="default">{tr('universities', 'sortDefault')}</option>
                <option value="global">{tr('universities', 'sortGlobal')}</option>
                <option value="subject">{tr('universities', 'sortSubject')}</option>
              </select>
            </div>
          </div>

          {/* Fallback state */}
          {processedUniversities.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="text-4xl mb-4">🕵️‍♂️</div>
              <h3 className="text-xl font-bold text-[#1A2B4C] dark:text-white mb-2">{tr('universities', 'noResults')}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">{tr('universities', 'tryAdjust')}</p>
              <button
                onClick={() => {
                  setFilterCity('All');
                  setFilterType('All');
                  setFilterHighlight('All');
                }}
                className="px-6 py-2 bg-[#FFCC00] text-white rounded-lg hover:bg-[#e6b800] transition-colors font-medium"
              >
                {tr('universities', 'clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {processedUniversities.map((uni) => (
                <div key={uni.id} className="group bg-white dark:bg-gray-900 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img src={uni.image} alt={uni.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B4C]/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      {/* Dynamic Color for Public vs Private */}
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border shadow-sm backdrop-blur-md ${uni.type === 'Public'
                        ? 'bg-blue-600/90 text-white border-blue-400/50'
                        : 'bg-purple-600/90 text-white border-purple-400/50'
                        }`}>
                        {uni.type === 'Public' ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <h3 className="text-lg font-bold text-[#1A2B4C] dark:text-white leading-tight group-hover:text-[#FFCC00] transition-colors">
                      {uni.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 shrink-0 text-[#FFCC00]" />
                      {uni.city}
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl mt-2 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-start justify-between text-sm">
                        <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Globe className="w-4 h-4 text-blue-500" /> {tr('universities', 'globalRank')}
                        </span>
                        <span className="font-semibold text-[#1A2B4C] dark:text-white">{uni.globalRank.includes('Unranked') ? 'Unranked' : uni.globalRank}</span>
                      </div>
                      <div className="flex items-start justify-between text-sm">
                        <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <BookOpen className="w-4 h-4 text-purple-500" /> {tr('universities', 'subjectRank')}
                        </span>
                        <span className="font-semibold text-[#1A2B4C] dark:text-white">{uni.subjectRank.includes('N/A') ? 'N/A' : uni.subjectRank}</span>
                      </div>
                    </div>

                    {/* Dynamic Colors for Highlights */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {uni.highlights.map((h, idx) => {
                        const colorClass = getHighlightColor(h);
                        return (
                          <span key={idx} className={`flex items-center gap-1 text-xs border rounded-full px-2.5 py-1 ${colorClass}`}>
                            <Star className="w-3 h-3 opacity-70" />
                            {h}
                          </span>
                        );
                      })}
                    </div>

                    <a href={uni.url} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-between text-sm font-semibold text-[#1A2B4C] dark:text-white hover:text-[#FFCC00] dark:hover:text-[#FFCC00] transition-colors pt-4 border-t border-gray-100 dark:border-gray-700">
                      {tr('universities', 'visitWebsite')}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default UniversitiesPage;