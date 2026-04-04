// frontend/src/components/pages/train/JourneyCalculator.tsx
import React, { useState, useEffect } from 'react';
import { getJourneys, searchStations } from '../../../lib/transport-api';
import type { Location } from '../../../lib/transport-api';
import { StationAutocomplete } from './ui/station-autocomplete';
import { AdvancedMap } from './ui/interactive-map';
import type { MapMarker } from './ui/interactive-map';
import { calculateDistance, estimateCost, renderWalkLeg, getDuration, createDataLabelIcon } from "./utils/journey-helpers";
import { Loader2, Clock, AlertTriangle, Bike, Globe2, MapPin } from 'lucide-react';

const JourneyCalculator: React.FC = () => {
    const [from, setFrom] = useState(''); const [fromStation, setFromStation] = useState<Location | null>(null);
    const [to, setTo] = useState(''); const [toStation, setToStation] = useState<Location | null>(null);
    const [journeys, setJourneys] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [expandedJourney, setExpandedJourney] = useState<number | null>(null);

    const [inNextHours, setInNextHours] = useState('0');
    const [inNextMinutes, setInNextMinutes] = useState('0');
    const [timeZone, setTimeZone] = useState('Europe/Berlin');
    const [previewTimeStr, setPreviewTimeStr] = useState('');
    const [maxTransfers, setMaxTransfers] = useState('any');
    const [bikeFriendly, setBikeFriendly] = useState(false);
    const [mapSelectionMode, setMapSelectionMode] = useState<'from' | 'to' | null>(null);
    const [apiOffline, setApiOffline] = useState(false);

    useEffect(() => {
        const previewTime = new Date();
        previewTime.setHours(previewTime.getHours() + Number(inNextHours || 0));
        previewTime.setMinutes(previewTime.getMinutes() + Number(inNextMinutes || 0));
        const formatter = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', weekday: 'short', month: 'short', day: 'numeric' });
        setPreviewTimeStr(formatter.format(previewTime));
    }, [inNextHours, inNextMinutes, timeZone]);

    // Update handleSearch or any function calling the API
    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setLoading(true);
        setErrorMsg(null);
        setApiOffline(false); // Reset status

        try {
            let finalFrom = fromStation;
            let finalTo = toStation;

            // Auto-resolve typed names ONLY if they didn't pick from dropdown AND didn't click map
            if (!finalFrom && from) { const d = await searchStations(from); if (d.length) finalFrom = d[0]; }
            if (!finalTo && to) { const d = await searchStations(to); if (d.length) finalTo = d[0]; }

            if (!finalFrom || !finalTo) throw new Error("Stations or locations not found.");

            const departureDate = new Date();
            departureDate.setHours(departureDate.getHours() + parseInt(inNextHours || '0'));
            departureDate.setMinutes(departureDate.getMinutes() + parseInt(inNextMinutes || '0'));

            // Pass the full location objects now, not just IDs
            const journeyData = await getJourneys(finalFrom, finalTo, {
                departure: departureDate.toISOString(), transfers: maxTransfers, bike: bikeFriendly
            });
            setJourneys(journeyData.journeys || []);
        } catch (error: any) {
            // Check if it's a 503 or fetch failure
            setApiOffline(true);
            setErrorMsg("The transport service is temporarily unavailable (503).");
        } finally {
            setLoading(false);
        }
    };

    const handleMapClick = async (latlng: any) => {
        if (!mapSelectionMode) return;
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`);
            const data = await res.json();
            const locName = data.address?.city || data.address?.town || data.address?.village || "Selected Location";
            const mock: Location = { id: '', name: locName, type: 'location', location: { latitude: latlng.lat, longitude: latlng.lng } };
            if (mapSelectionMode === 'from') { setFrom(locName); setFromStation(mock); }
            else { setTo(locName); setToStation(mock); }
            setMapSelectionMode(null);
        } catch (err) { console.error(err); }
    };

    // Construct markers for the AdvancedMap WITH EXPLICIT IDs TO PREVENT FLICKERING
    const mapMarkers: MapMarker[] = [];
    if (fromStation?.location) {
        mapMarkers.push({
            id: 'origin-marker', // Stable ID
            position: [fromStation.location.latitude, fromStation.location.longitude],
            color: 'green', size: 'large', popup: { title: 'Origin', content: fromStation.name }
        });
    }
    if (toStation?.location) {
        mapMarkers.push({
            id: 'dest-marker', // Stable ID
            position: [toStation.location.latitude, toStation.location.longitude],
            color: 'red', size: 'large', popup: { title: 'Destination', content: toStation.name }
        });
    }

    // Polylines for the route approximation WITH EXPLICIT IDs
    const mapPolylines: any[] = [];

    if (expandedJourney !== null && journeys[expandedJourney]) {
        journeys[expandedJourney].legs.forEach((leg: any, idx: number) => {
            if (!leg.origin?.location || !leg.destination?.location) return;

            const p1 = [leg.origin.location.latitude, leg.origin.location.longitude];
            const p2 = [leg.destination.location.latitude, leg.destination.location.longitude];

            // 1. Push the dotted line with a unique ID
            mapPolylines.push({
                id: `poly-${expandedJourney}-${idx}-${p1[0]}`, // Stable ID based on coordinates
                positions: [p1, p2],
                style: { color: leg.line?.product === 'nationalExpress' ? '#f97316' : '#0a2463', weight: 4, dashArray: '8, 8' }
            });

            // 2. Add the custom midpoint distance/time label as a marker
            const dist = calculateDistance(p1[0] as number, p1[1] as number, p2[0] as number, p2[1] as number);

            if (dist > 1) {
                // Explicitly type the tuple for Leaflet compatibility
                const midPoint: [number, number] = [
                    ((p1[0] as number) + (p2[0] as number)) / 2,
                    ((p1[1] as number) + (p2[1] as number)) / 2
                ];

                mapMarkers.push({
                    id: `label-${expandedJourney}-${idx}-${midPoint[0]}`,
                    position: midPoint,
                    // Cast as L.Icon if the interface hasn't been updated yet
                    icon: createDataLabelIcon(dist, getDuration(leg.plannedDeparture || leg.departure, leg.plannedArrival || leg.arrival)) as L.Icon
                });
            }
        });
    }

    return (
        <section className="py-8 bg-gray-50 px-4 h-screen flex items-center justify-center">
            {/* ADDED h-[90vh] to lock the height of the entire dashboard */}
            <div className="w-full max-w-screen-2xl h-[90vh] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">

                {/* LEFT SIDE: Inputs & Results */}
                <div className="w-full lg:w-5/12 flex flex-col bg-gray-50/50 h-full border-r border-gray-200">

                    {/* HEADER & FORM WRAPPER: shrink-0 prevents it from compressing */}
                    <div className="shrink-0">
                        <div className="p-6 pb-0 mb-4">
                            <h2 className="text-3xl font-extrabold text-[#0a2463]">Smart Route Explorer</h2>
                            <p className="text-gray-500 mt-1">Plan your journey and check Semesterticket validity.</p>
                        </div>

                        <div className="px-6 pb-6 border-b border-gray-200">
                            <form onSubmit={handleSearch} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-3">
                                    <StationAutocomplete placeholder="Origin" value={from} onChange={(v, s) => { setFrom(v); if (s) setFromStation(s); }} onPickFromMapClick={() => setMapSelectionMode(mapSelectionMode === 'from' ? null : 'from')} isMapModeActive={mapSelectionMode === 'from'} />
                                    <StationAutocomplete placeholder="Destination" value={to} onChange={(v, s) => { setTo(v); if (s) setToStation(s); }} onPickFromMapClick={() => setMapSelectionMode(mapSelectionMode === 'to' ? null : 'to')} isMapModeActive={mapSelectionMode === 'to'} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1"><Clock className="w-3 h-3" /> Depart In</label>
                                            <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                                <input type="number" min="0" value={inNextHours} onChange={e => setInNextHours(e.target.value)} className="w-10 bg-transparent text-center font-bold text-[#0a2463] outline-none" />
                                                <span className="text-gray-400 text-xs font-medium">h</span>
                                                <input type="number" min="0" max="59" value={inNextMinutes} onChange={e => setInNextMinutes(e.target.value)} className="w-10 bg-transparent text-center font-bold text-[#0a2463] outline-none" />
                                                <span className="text-gray-400 text-xs font-medium">m</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1"><Globe2 className="w-3 h-3" /> Timezone</label>
                                            <select value={timeZone} onChange={e => setTimeZone(e.target.value)} className="bg-transparent text-sm font-medium text-[#f97316] outline-none cursor-pointer text-right">
                                                <option value="Europe/Berlin">Germany (CET)</option>
                                                <option value="Asia/Ho_Chi_Minh">Vietnam (ICT)</option>
                                            </select>
                                        </div>
                                        <div className="text-right text-[10px] text-gray-400 font-medium">Time: <span className="text-[#0a2463]">{previewTimeStr}</span></div>
                                    </div>
                                    <div className="flex flex-col gap-3 justify-center pl-4 border-l border-gray-100">
                                        <div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-500 uppercase">Transfers</label>
                                            <select value={maxTransfers} onChange={e => setMaxTransfers(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-sm font-medium text-[#0a2463] outline-none">
                                                <option value="any">Any</option>
                                                <option value="0">Direct</option>
                                                <option value="1">Max 1</option>
                                                <option value="2">Max 2</option>
                                                <option value="3">Max 3</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-500 uppercase">Bike</label>
                                            <button type="button" onClick={() => setBikeFriendly(!bikeFriendly)} className={`p-1.5 rounded-lg transition-colors ${bikeFriendly ? 'bg-orange-100 text-[#f97316]' : 'bg-gray-50 text-gray-400 border border-gray-200'}`}><Bike className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                </div>

                                {/* Search Journeys Button */}
                                <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#0a2463] hover:bg-[#113280] text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-md flex justify-center items-center">
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search Journeys'}
                                </button>

                                {/* API Failure Announcement */}
                                {apiOffline && (
                                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                        <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-sm font-bold text-red-800">Transport API Offline</h4>
                                            <p className="text-xs text-red-600 leading-relaxed mt-1">
                                                We're having trouble connecting to the transit servers (Error 503).
                                                Please try again in a few minutes.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* JOURNEY LIST: flex-1 allows it to take remaining space, overflow-y-auto makes it scroll */}
                    <div className="flex-1 overflow-y-auto p-6 bg-white custom-scrollbar flex flex-col gap-4">
                        {journeys.map((j, idx) => (
                            <div key={`journey-${idx}`} className={`bg-white rounded-2xl border transition-all ${expandedJourney === idx ? 'border-[#f97316] shadow-md' : 'border-gray-200 hover:border-blue-300 shadow-sm'}`}>
                                <div className="p-5 cursor-pointer" onClick={() => setExpandedJourney(expandedJourney === idx ? null : idx)}>
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-extrabold text-xl text-[#0a2463]">
                                                {new Date(j.legs[0].plannedDeparture || j.legs[0].departure).toLocaleTimeString([], { timeZone, hour: '2-digit', minute: '2-digit' })} → {new Date(j.legs[j.legs.length - 1].plannedArrival || j.legs[j.legs.length - 1].arrival).toLocaleTimeString([], { timeZone, hour: '2-digit', minute: '2-digit' })}
                                            </h3>
                                            <p className="text-sm text-gray-500 font-medium">
                                                {Math.floor(getDuration(j.legs[0].plannedDeparture || j.legs[0].departure, j.legs[j.legs.length - 1].plannedArrival || j.legs[j.legs.length - 1].arrival) / 60)}h {getDuration(j.legs[0].plannedDeparture || j.legs[0].departure, j.legs[j.legs.length - 1].plannedArrival || j.legs[j.legs.length - 1].arrival) % 60}m • {j.legs.length - 1} Transfers
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`font-bold text-xl ${estimateCost(j).amount === 0 ? 'text-green-600' : 'text-[#f97316]'}`}>
                                                {estimateCost(j).amount === 0 ? '€0.00' : `~€${estimateCost(j).amount.toFixed(2)}`}
                                            </span>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">{estimateCost(j).type}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 h-2 rounded-full bg-gray-100">
                                        {j.legs.map((l: any, i: number) => <div key={`bar-${idx}-${i}`} className={`h-full flex-1 ${l.line?.product === 'nationalExpress' ? 'bg-[#f97316]' : l.line ? 'bg-[#0a2463]' : 'bg-gray-300'}`}></div>)}
                                    </div>
                                </div>

                                {expandedJourney === idx && (
                                    <div className="p-5 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-5 rounded-b-2xl">
                                        {fromStation?.location && !fromStation.id && j.legs[0]?.origin?.location &&
                                            renderWalkLeg(fromStation.location.latitude, fromStation.location.longitude, j.legs[0].origin.location.latitude, j.legs[0].origin.location.longitude, 'Origin Station')}

                                        {j.legs.map((leg: any, lIdx: number) => (
                                            <div key={`leg-${idx}-${lIdx}`} className="relative pl-8 border-l-2 border-dotted border-gray-300 ml-2 pb-4 last:border-transparent last:pb-0">
                                                <div className="absolute w-4 h-4 bg-white border-4 border-[#0a2463] rounded-full -left-[9px] -top-1"></div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-gray-800 text-sm">{leg.origin?.name}</span>
                                                    <span className="text-xs font-bold text-gray-500">{new Date(leg.plannedDeparture || leg.departure).toLocaleTimeString([], { timeZone, hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                                <div className="bg-white border border-gray-200 rounded-xl p-3 my-2 shadow-sm">
                                                    <div className="flex justify-between items-center">
                                                        <span className={`px-2 py-1 rounded-md text-xs font-bold text-white ${leg.line?.product === 'nationalExpress' ? 'bg-[#f97316]' : leg.line ? 'bg-[#0a2463]' : 'bg-gray-500'}`}>
                                                            {leg.line?.name || 'Walk'}
                                                        </span>
                                                        <span className="text-xs font-bold text-gray-500">{getDuration(leg.plannedDeparture || leg.departure, leg.plannedArrival || leg.arrival)} min</span>
                                                    </div>
                                                    {leg.direction && <div className="text-xs text-gray-600 font-medium mt-2">To: {leg.direction}</div>}
                                                </div>
                                                <div className="mt-2 flex justify-between items-center">
                                                    <span className="font-bold text-gray-800 text-sm">{leg.destination?.name}</span>
                                                    <span className="text-xs font-bold text-gray-500">{new Date(leg.plannedArrival || leg.arrival).toLocaleTimeString([], { timeZone, hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                            </div>
                                        ))}

                                        {toStation?.location && !toStation.id && j.legs[j.legs.length - 1]?.destination?.location &&
                                            renderWalkLeg(j.legs[j.legs.length - 1].destination.location.latitude, j.legs[j.legs.length - 1].destination.location.longitude, toStation.location.latitude, toStation.location.longitude, 'Final Destination')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE: Map Display (h-full maps to the fixed 90vh parent) */}
                <div className="flex-1 relative h-[400px] lg:h-full bg-gray-100">
                    {mapSelectionMode && (
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#f97316] text-white px-8 py-4 rounded-full font-extrabold text-lg shadow-xl z-[1000] animate-bounce flex items-center gap-3">
                            <MapPin className="w-6 h-6" /> CLICK THE MAP TO SELECT {mapSelectionMode.toUpperCase()}
                        </div>
                    )}
                    <AdvancedMap
                        center={fromStation?.location ? [fromStation.location.latitude, fromStation.location.longitude] : [51.1657, 10.4515]}
                        zoom={fromStation ? 11 : 6}
                        markers={mapMarkers}
                        polylines={mapPolylines}
                        onMapClick={handleMapClick}
                        enableControls={true}
                        style={{ height: '100%', width: '100%' }}
                    />
                </div>
            </div>
        </section>
    );
};

export default JourneyCalculator;