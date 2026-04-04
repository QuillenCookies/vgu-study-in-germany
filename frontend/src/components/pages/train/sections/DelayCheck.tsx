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
  planned: string;
  actual: string | null;
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

function formatTime(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Berlin',
  });
}

function mapRaw(raw: RawDeparture): DepartureRow {
  return {
    tripId: raw.tripId,
    line: raw.line?.name ?? '?',
    product: raw.line?.product ?? 'unknown',
    direction: raw.direction,
    planned: formatTime(raw.plannedWhen),
    actual: raw.when ? formatTime(raw.when) : null,
    delayMin: raw.delay !== null ? Math.round(raw.delay / 60) : null,
    platform: raw.platform ?? raw.plannedPlatform ?? null,
  };
}

// ─── Board Row ────────────────────────────────────────────────────────────────

const BoardRow: React.FC<{ row: DepartureRow }> = ({ row }) => {
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
      <td className="px-4 py-3 font-semibold text-[#1A2B4C] dark:text-white text-sm max-w-[200px]">
        <span className="line-clamp-2">{row.direction}</span>
      </td>

      {/* Planned time */}
      <td className="px-4 py-3 font-mono text-sm text-gray-600 dark:text-gray-300 font-bold">
        {row.planned}
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
          <span className="text-green-600 font-black text-[11px] uppercase tracking-wide">
            On time
          </span>
        )}
      </td>

      {/* Platform */}
      <td className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500 font-medium">
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
      fetchBoard(station);
    }
  };

  const handleRefresh = () => {
    if (selectedStation) fetchBoard(selectedStation);
  };

  // ── Apply client-side product filter ─────────────────────────────────────
  const filterRows = (rows: DepartureRow[]) => {
    if (activeFilter === 'all') return rows;

    const filterDef = PRODUCT_FILTERS.find((f) => f.id === activeFilter);
    const products = filterDef?.products;

    if (!products) return rows;

    // Cast products to string[] to allow comparison with row.product
    return rows.filter((r) => (products as readonly string[]).includes(r.product));
  };

  const displayRows = filterRows(tab === 'departures' ? departures : arrivals);

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
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
              className="mt-0 shrink-0 rounded-xl h-[50px] w-[50px] border-gray-200 dark:border-gray-700"
              title="Refresh board"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          )}
        </div>

        {/* Tab + Filter row */}
        {selectedStation && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
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

            {/* Line-product filter chips */}
            <div className="flex flex-wrap gap-2">
              {PRODUCT_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${activeFilter === f.id
                    ? 'bg-[#1A2B4C] text-white border-[#1A2B4C]'
                    : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-[#1A2B4C] hover:text-[#1A2B4C]'
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Board Table */}
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          {/* Empty / loading / error states */}
          {!selectedStation ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-600 gap-4">
              <Train className="w-12 h-12" />
              <p className="font-medium">Search for a station to view the live board</p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400 dark:text-gray-500">
              <Loader2 className="w-10 h-10 animate-spin text-[#FFCC00]" />
              <p className="font-medium">Loading live data…</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-red-400 dark:text-red-500 px-6 text-center">
              <AlertCircle className="w-10 h-10" />
              <p className="font-semibold">{error}</p>
              <p className="text-xs text-gray-400">Make sure the Vite dev server proxy is running on port 5173.</p>
            </div>
          ) : displayRows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400 dark:text-gray-600">
              <Clock className="w-10 h-10" />
              <p className="font-medium">No {tab} found for the selected filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#1A2B4C] text-white sticky top-0 z-10">
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
                    <BoardRow key={`${row.tripId}-${idx}`} row={row} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Station name footer */}
        {selectedStation && !isLoading && !error && (
          <p className="text-xs text-gray-400 dark:text-gray-600 text-center mt-4">
            Showing {tab} for{' '}
            <span className="font-bold text-[#1A2B4C] dark:text-gray-300">
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
