import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import { MapPin, Loader2, Activity } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import 'leaflet/dist/leaflet.css';

// Leaflet icon fix
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

interface StationNode {
    id: string;
    name: string;
    lat: number;
    lon: number;
    radius_meters: number;
    metrics?: {
        time: number;
        transfers: number;
        distance_km: number;
    }
}

const CommuteExplorer: React.FC = () => {
    const [targetLat, setTargetLat] = useState(50.1109); // Default Frankfurt
    const [targetLon, setTargetLon] = useState(8.6821);
    const [maxTime, setMaxTime] = useState(30);
    const [maxTransfers, setMaxTransfers] = useState(1);
    const [walkDistance, setWalkDistance] = useState(1.0); // 1 km

    const [stations, setStations] = useState<StationNode[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCommuteRing = async () => {
        setIsLoading(true);
        try {
            // Updated to pass walk_distance to your new backend logic
            const res = await fetch(`/api/trains/ring/?lat=${targetLat}&lon=${targetLon}&max_minutes=${maxTime}&max_transfers=${maxTransfers}&walk_distance=${walkDistance}`);
            const data = await res.json();
            if (data.stations) setStations(data.stations);
        } catch (error) {
            console.error("Failed to fetch commute ring", error);
        }
        setIsLoading(false);
    };

    // Handle university change (mock coordinates for demo)
    const handleUniChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (val === 'frankfurt') { setTargetLat(50.1109); setTargetLon(8.6821); }
        if (val === 'darmstadt') { setTargetLat(49.8728); setTargetLon(8.6512); }
        if (val === 'mainz') { setTargetLat(49.9929); setTargetLon(8.2473); }
    };

    useEffect(() => {
        fetchCommuteRing();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="py-16 bg-gray-50 px-4">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-col gap-2 mb-8 text-center items-center">
                    <Badge className="bg-[#0a2463] text-white hover:bg-[#0a2463]/90">Housing & Transit Topology</Badge>
                    <h2 className="text-3xl font-bold text-gray-800">Where should you live?</h2>
                    <p className="text-gray-500 max-w-2xl">Don't rely on straight-line distance. Set your university campus and find neighborhoods that are actually connected by good transit lines.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 h-[650px]">
                    {/* Controls Sidebar */}
                    <div className="w-full lg:w-1/3 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6 overflow-y-auto">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">University Campus (Target)</label>
                            <select onChange={handleUniChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f97316]">
                                <option value="frankfurt">Goethe University Frankfurt</option>
                                <option value="darmstadt">TU Darmstadt</option>
                                <option value="mainz">JGU Mainz</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Max Commute Time: {maxTime} mins</label>
                            <input type="range" min="10" max="90" step="5" value={maxTime} onChange={(e) => setMaxTime(Number(e.target.value))} className="w-full accent-[#f97316]" />
                        </div>

                        {/* NEW: Walking Distance Slider */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Max Walk to Station: {walkDistance} km</label>
                            <input type="range" min="0.5" max="3.0" step="0.5" value={walkDistance} onChange={(e) => setWalkDistance(Number(e.target.value))} className="w-full accent-[#f97316]" />
                            <p className="text-xs text-gray-400 mt-1">Approx. {walkDistance * 12} min walk</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Max Transfers</label>
                            <div className="flex gap-2">
                                {[0, 1, 2].map(num => (
                                    <button key={num} onClick={() => setMaxTransfers(num)} className={`flex-1 py-2 rounded-xl font-medium border transition-colors ${maxTransfers === num ? 'bg-[#0a2463] text-white border-[#0a2463]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                                        {num === 0 ? 'Direct' : num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button onClick={fetchCommuteRing} disabled={isLoading} className="w-full mt-auto py-6 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-lg transition-transform active:scale-95">
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Activity className="w-5 h-5 mr-2" />}
                            Generate Search Zones
                        </Button>
                    </div>

                    {/* Map Display */}
                    <div className="w-full lg:w-2/3 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative z-0">
                        {/* Dim map while loading to indicate network request is happening */}
                        {isLoading && <div className="absolute inset-0 z-[500] bg-white/40 backdrop-blur-[1px] flex items-center justify-center transition-all"><Loader2 className="w-10 h-10 animate-spin text-[#f97316]" /></div>}

                        <MapContainer center={[targetLat, targetLon]} zoom={11} style={{ height: '100%', width: '100%' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                            {/* Target Marker */}
                            <Marker position={[targetLat, targetLon]}>
                                <Popup><b>Target Destination</b></Popup>
                            </Marker>

                            {/* Station Markers and Radii */}
                            {stations.map((st, idx) => (
                                <React.Fragment key={idx}>
                                    <Marker position={[st.lat, st.lon]}>
                                        <Popup>
                                            <div className="text-center">
                                                <b className="block mb-1">{st.name}</b>
                                                {st.metrics && (
                                                    <span className="text-xs text-gray-600">
                                                        {st.metrics.time} mins • {st.metrics.transfers} transfers
                                                    </span>
                                                )}
                                            </div>
                                        </Popup>
                                    </Marker>
                                    <Circle
                                        center={[st.lat, st.lon]}
                                        radius={st.radius_meters} // Now pulling directly from backend logic
                                        pathOptions={{ color: '#0a2463', fillColor: '#3b82f6', fillOpacity: 0.2, weight: 1 }}
                                    />
                                </React.Fragment>
                            ))}
                        </MapContainer>

                        {/* Map Legend Overlay */}
                        <div className="absolute bottom-6 right-6 z-[400] bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-gray-100 text-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-4 h-4 rounded-full bg-blue-500/30 border border-[#0a2463]"></div>
                                {/* Dynamic legend text based on selected distance */}
                                <span className="font-medium text-gray-700">{walkDistance} km Walk Zone</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                <span className="font-medium text-gray-700">Transit Station</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommuteExplorer;