// frontend/src/components/pages/train/sections/DelayCheck.tsx
import React, { useState, useCallback, useRef } from 'react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { StationAutocomplete } from '../ui/station-autocomplete';
import type { Location } from '../../../../lib/transport-api';
import { getLineStyles } from '../utils/line-styles';
import {
  Loader2,
  AlertCircle,
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCw,
  Clock,
  Train,
  ArrowUpDown,
  Filter,
  Globe2
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RawDeparture {
  tripId: string;
  direction: string;
  when: string | null;
  plannedWhen: string;
  delay: number | null; // seconds
  platform: string | null;
  plannedPlatform: string | null;
  line: {
    name: string;
    product: string;
    productName: string;
    mode: string;
  };
  remarks?: { type: string; text: string }[];
}

type DepartureRow = {
  tripId: string;
  line: string;
  product: string;
  direction: string;
  plannedRaw: string;
  actualRaw: string | null;
  delayMin: number | null; // positive = late, negative = early
  platform: string | null;
};

type Tab = 'departures' | 'arrivals';

const PRODUCT_FILTERS = [
  { id: 'all', label: 'All', products: null },
  { id: 'nationalExpress', label: 'ICE / IC', products: ['nationalExpress', 'national'] },
  { id: 'regional', label: 'RE / RB', products: ['regionalExpress', 'regional'] },
  { id: 'suburban', label: 'S-Bahn', products: ['suburban'] },
  { id: 'subway', label: 'U-Bahn', products: ['subway'] },
  { id: 'tram', label: 'Tram', products: ['tram'] },
  { id: 'bus', label: 'Bus', products: ['bus'] },
] as const;

type FilterId = (typeof PRODUCT_FILTERS)[number]['id'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(iso: string | null, timeZone: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
  });
}

function mapRaw(raw: RawDeparture): DepartureRow {
  return {
    tripId: raw.tripId,
    line: raw.line?.name ?? '?',
    product: raw.line?.product ?? 'unknown',
    direction: raw.direction,
    plannedRaw: raw.plannedWhen,
    actualRaw: raw.when ?? null,
    delayMin: raw.delay !== null ? Math.round(raw.delay / 60) : null,
    platform: raw.platform ?? raw.plannedPlatform ?? null,
  };
}

// ─── Board Row ────────────────────────────────────────────────────────────────

const BoardRow: React.FC<{ row: DepartureRow, timeZone?: string }> = ({ row, timeZone = 'Europe/Berlin' }) => {
  const isIce =
    row.line.startsWith('ICE') || row.line.startsWith('IC');
  const lineStyle = getLineStyles(row.line);
  const delayed = row.delayMin !== null && row.delayMin > 0;
  const early = row.delayMin !== null && row.delayMin < 0;

  return (
    <tr className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors group border-b border-gray-50 dark:border-gray-800 last:border-0">
      {/* Line */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span
          className={`font-black text-xs px-2.5 py-1 rounded-md border ${isIce
            ? 'bg-gray-100 text-red-600 border-gray-300'
            : `${lineStyle} text-white`
            }`}
        >
          {row.line}
        </span>
      </td>

      {/* Direction */}
      <td className="px-4 py-3 font-semibold text-[#1A2B4C] dark:text-gray-200 text-sm max-w-[200px]">
        <span className="line-clamp-2">{row.direction}</span>
      </td>

      {/* Planned time */}
      <td className="px-4 py-3 font-mono text-sm text-gray-600 dark:text-gray-300 font-bold">
        {formatTime(row.plannedRaw, timeZone)}
      </td>

      {/* Status */}
      <td className="px-4 py-3 whitespace-nowrap">
        {delayed ? (
          <span className="inline-flex items-center gap-1 text-red-600 font-black text-[11px]">
            <AlertCircle className="w-3 h-3" />
            +{row.delayMin} min
          </span>
        ) : early ? (
          <span className="text-blue-500 font-bold text-[11px]">
            {row.delayMin} min
          </span>
        ) : (
          <span className="text-green-600 dark:text-green-400 font-black text-[11px] uppercase tracking-wide">
            On time
          </span>
        )}
      </td>

      {/* Platform */}
      <td className="px-4 py-3 text-sm text-gray-400 dark:text-blue-300 font-medium">
        {row.platform ?? '—'}
      </td>
    </tr>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const DelayCheck: React.FC = () => {
  const [stationInput, setStationInput] = useState('');
  const [selectedStation, setSelectedStation] = useState<Location | null>(null);

  const [tab, setTab] = useState<Tab>('departures');
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [lineFilter, setLineFilter] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [timeZone, setTimeZone] = useState('Europe/Berlin');

  const [departures, setDepartures] = useState<DepartureRow[]>([]);
  const [arrivals, setArrivals] = useState<DepartureRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  // ── Fetch both departures & arrivals in parallel ──────────────────────────
  const fetchBoard = useCallback(async (station: Location) => {
    if (!station.id) {
      setError('Station ID not found. Please select a station from the dropdown.');
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setIsLoading(true);
    setError(null);
    setDepartures([]);
    setArrivals([]);

    try {
      const [depRes, arrRes] = await Promise.all([
        fetch(`/db-api/stops/${station.id}/departures?results=30&duration=90`, {
          signal: ctrl.signal,
        }),
        fetch(`/db-api/stops/${station.id}/arrivals?results=30&duration=90`, {
          signal: ctrl.signal,
        }),
      ]);

      const depData = await depRes.json();
      const arrData = await arrRes.json();

      setDepartures(
        ((depData.departures ?? depData) as RawDeparture[]).map(mapRaw)
      );
      setArrivals(
        ((arrData.arrivals ?? arrData) as RawDeparture[]).map(mapRaw)
      );
      setLastFetched(
        new Date().toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Europe/Berlin',
        })
      );
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setError('Failed to load live board. Check that the dev server proxy is running.');
    } finally {
      if (!ctrl.signal.aborted) setIsLoading(false);
    }
  }, []);

  const handleStationSelect = (value: string, station?: Location) => {
    setStationInput(value);
    if (station) {
      setSelectedStation(station);
      setLineFilter('');
      fetchBoard(station);
    }
  };

  const handleRefresh = () => {
    if (selectedStation) fetchBoard(selectedStation);
  };

  // ── Apply client-side product filter, line filter and sort ──────────────
  const displayRows = React.useMemo(() => {
    const rawRows = tab === 'departures' ? departures : arrivals;

    // Filter by Product
    let filtered = rawRows;
    if (activeFilter !== 'all') {
      const filterDef = PRODUCT_FILTERS.find((f) => f.id === activeFilter);
      const products = filterDef?.products;
      if (products) {
        filtered = filtered.filter((r) => (products as readonly string[]).includes(r.product));
      }
    }

    // Filter by Line (case-insensitive substring)
    if (lineFilter.trim() !== '') {
      const lowFilter = lineFilter.toLowerCase();
      filtered = filtered.filter((r) => r.line.toLowerCase().includes(lowFilter));
    }

    // Sort by Schedule Time
    return filtered.sort((a, b) => {
      const tA = new Date(a.plannedRaw).getTime();
      const tB = new Date(b.plannedRaw).getTime();
      return sortAscending ? tA - tB : tB - tA;
    });
  }, [departures, arrivals, tab, activeFilter, lineFilter, sortAscending]);

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <Badge variant="outline" className="w-fit text-[#FFCC00] border-[#FFCC00]">
                Real-Time Board
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A2B4C] dark:text-white">
                Live Departures &amp; Arrivals
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl">
                Search any German station and see the live departure and arrival board
                with real-time delay information.
              </p>
            </div>
            {lastFetched && (
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 shrink-0">
                <Clock className="w-3.5 h-3.5" />
                Updated {lastFetched}
              </div>
            )}
          </div>
        </div>

        {/* Station Search */}
        <div className="max-w-xl mb-8 flex gap-3 items-start">
          <div className="flex-1">
            <StationAutocomplete
              placeholder="Search station (e.g. Frankfurt Hbf, Darmstadt…)"
              value={stationInput}
              onChange={handleStationSelect}
            />
          </div>
          {selectedStation && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isLoading}
              className="mt-0 shrink-0 rounded-xl h-[50px] w-[50px] border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Refresh board"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          )}
        </div>

        {/* Tab + Filter row */}
        {selectedStation && (
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              {/* Dep / Arr tabs */}
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setTab('departures')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'departures'
                    ? 'bg-[#1A2B4C] text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  <ArrowUpFromLine className="w-4 h-4" />
                  Departures
                  {departures.length > 0 && (
                    <span className="text-[10px] font-black bg-[#FFCC00] text-[#1A2B4C] px-1.5 py-0.5 rounded-full">
                      {departures.length}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setTab('arrivals')}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'arrivals'
                    ? 'bg-[#1A2B4C] text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  <ArrowDownToLine className="w-4 h-4" />
                  Arrivals
                  {arrivals.length > 0 && (
                    <span className="text-[10px] font-black bg-[#FFCC00] text-[#1A2B4C] px-1.5 py-0.5 rounded-full">
                      {arrivals.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Sorting Toggle */}
              <button
                type="button"
                onClick={() => setSortAscending(prev => !prev)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowUpDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                Time ({sortAscending ? 'Asc' : 'Desc'})
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Timezone Selector */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Globe2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="bg-transparent text-sm font-bold text-[#1A2B4C] dark:text-gray-200 outline-none cursor-pointer"
                >
                  <option value="Europe/Berlin" className="dark:bg-gray-800">Germany (CET)</option>
                  <option value="Asia/Ho_Chi_Minh" className="dark:bg-gray-800">Vietnam (ICT)</option>
                </select>
              </div>

              {/* Line filter text input */}
              <div className="relative">
                <Filter className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter line (e.g. S8)"
                  value={lineFilter}
                  onChange={(e) => setLineFilter(e.target.value)}
                  className="pl-9 pr-4 py-2 w-40 text-sm font-medium bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1A2B4C] dark:focus:ring-blue-600"
                />
              </div>

              {/* Vehicle filter dropdown */}
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value as FilterId)}
                className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 outline-none cursor-pointer hover:border-gray-300 dark:hover:border-gray-600"
              >
                {PRODUCT_FILTERS.map((f) => (
                  <option key={f.id} value={f.id} className="dark:bg-gray-800">{f.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Board Table wrapped in scrollable container */}
        <div className="bg-white dark:bg-gray-950 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col max-h-[500px]">
          {/* Empty / loading / error states */}
          {!selectedStation ? (
            <div className="flex flex-col items-center justify-center flex-1 py-16 min-h-[300px] text-gray-400 dark:text-gray-600 gap-4">
              <Train className="w-12 h-12" />
              <p className="font-medium">Search for a station to view the live board</p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center flex-1 py-16 min-h-[300px] gap-4 text-gray-400 dark:text-gray-500">
              <Loader2 className="w-10 h-10 animate-spin text-[#FFCC00]" />
              <p className="font-medium">Loading live data…</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center flex-1 py-16 min-h-[300px] gap-3 text-red-400 dark:text-red-500 px-6 text-center">
              <AlertCircle className="w-10 h-10" />
              <p className="font-semibold">{error}</p>
              <p className="text-xs text-gray-400">Make sure the Vite dev server proxy is running on port 5173.</p>
            </div>
          ) : displayRows.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 py-16 min-h-[300px] gap-3 text-gray-400 dark:text-gray-600">
              <Clock className="w-10 h-10" />
              <p className="font-medium">No {tab} found for the selected filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto flex-1 overflow-y-auto custom-scrollbar">
              <table className="w-full text-left relative border-collapse">
                <thead className="bg-[#1A2B4C] text-white sticky top-0 z-10 shadow-md">
                  <tr>
                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap">Line</th>
                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest">
                      {tab === 'departures' ? 'Destination' : 'Origin'}
                    </th>
                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap">Sched.</th>
                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest">Status</th>
                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-widest">Track</th>
                  </tr>
                </thead>
                <tbody>
                  {displayRows.map((row, idx) => (
                    <BoardRow key={`${row.tripId}-${idx}`} row={row} timeZone={timeZone} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Station name footer */}
        {selectedStation && !isLoading && !error && (
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-4">
            Showing {tab} for{' '}
            <span className="font-bold text-[#1A2B4C] dark:text-blue-300">
              {selectedStation.name}
            </span>{' '}
            · Next 90 minutes · Powered by{' '}
            <a
              href="https://v6.db.transport.rest"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#FFCC00] transition-colors"
            >
              DB Transport REST
            </a>
          </p>
        )}
      </div>
    </section>
  );
};

export default DelayCheck;
