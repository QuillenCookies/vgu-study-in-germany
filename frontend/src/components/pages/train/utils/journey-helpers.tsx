import L from 'leaflet';
import { MoveHorizontal } from 'lucide-react';

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; const dLat = (lat2 - lat1) * (Math.PI / 180); const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const estimateCost = (journey: any) => {
    if (journey.price?.amount > 0) return { amount: journey.price.amount, type: 'Official Price' };
    let total = 0; let isNat = false;
    journey.legs.forEach((leg: any) => {
        if (!leg.origin?.location || !leg.destination?.location) return;
        const nat = leg.line?.product === 'nationalExpress' || leg.line?.product === 'national';
        if (nat) { isNat = true; total += 15 + (calculateDistance(leg.origin.location.latitude, leg.origin.location.longitude, leg.destination.location.latitude, leg.destination.location.longitude) * 0.15); }
    });
    if (!isNat) return { amount: 0, type: 'Covered by Semesterticket' };
    return { amount: Math.round(total * 100) / 100, type: 'Est. IC/ICE Cost' };
};

const renderWalkLeg = (lat1: number, lon1: number, lat2: number, lon2: number, label: string) => {
    const distKm = calculateDistance(lat1, lon1, lat2, lon2);
    if (distKm < 0.1) return null; // Skip if less than 100 meters

    const walkMins = Math.ceil((distKm / 5) * 60); // 5km/h formula
    return (
        <div className="relative pl-8 border-l-2 border-dotted border-orange-300 ml-2 pb-4">
            <div className="absolute w-3 h-3 bg-white border-2 border-[#f97316] rounded-full -left-[7px] top-1"></div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 shadow-sm text-xs font-medium text-orange-800 flex justify-between items-center mb-2">
                <span className="flex items-center gap-1.5">
                    <MoveHorizontal className="w-3 h-3" /> Walk to {label} ({distKm.toFixed(2)} km)</span>
                <span className="font-bold">{walkMins} min</span>
            </div>
        </div>
    );
};

const getDuration = (start: string, end: string) => Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);

// Create a custom Leaflet icon for the midpoint data square
// Create a custom Leaflet icon for the midpoint data square
const createDataLabelIcon = (distance: number, minutes: number) => {
    return L.divIcon({
        className: 'custom-map-label',
        html: `<div style="background-color: white; border: 2px solid #f97316; color: #0a2463; font-weight: bold; padding: 6px 12px; border-radius: 8px; font-size: 12px; white-space: nowrap; width: max-content; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2); transform: translate(-50%, -50%);">
            ${Math.round(distance)} km<br/>${minutes} min
        </div>`,
        iconSize: [0, 0] // Centered via CSS transform
    });
};

export { calculateDistance, estimateCost, renderWalkLeg, getDuration, createDataLabelIcon }