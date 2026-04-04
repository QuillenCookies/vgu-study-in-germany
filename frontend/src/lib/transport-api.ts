// TO THIS:
const DB_API_BASE = '/db-api';

export interface Location {
    type: string;
    id?: string;
    name: string;
    location?: { latitude: number; longitude: number };
}

export interface JourneyOptions {
    departure?: string;
    transfers?: string;
    bike?: boolean;
}

export async function getJourneys(fromLoc: Location, toLoc: Location, options: JourneyOptions = {}): Promise<any> {
    let url = `${DB_API_BASE}/journeys?results=5&tickets=true`;

    // If it has an ID, it's an exact station. If not, use the lat/long address params.
    if (fromLoc.id) {
        url += `&from=${fromLoc.id}`;
    } else if (fromLoc.location) {
        url += `&from.latitude=${fromLoc.location.latitude}&from.longitude=${fromLoc.location.longitude}&from.address=${encodeURIComponent(fromLoc.name || 'Origin')}`;
    }

    if (toLoc.id) {
        url += `&to=${toLoc.id}`;
    } else if (toLoc.location) {
        url += `&to.latitude=${toLoc.location.latitude}&to.longitude=${toLoc.location.longitude}&to.address=${encodeURIComponent(toLoc.name || 'Destination')}`;
    }

    if (options.transfers && options.transfers !== 'any') url += `&transfers=${options.transfers}`;
    if (options.bike) url += `&bike=true`;
    if (options.departure) url += `&departure=${encodeURIComponent(options.departure)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch journeys');
    return res.json();
}

export interface JourneyOptions {
    departure?: string; // ISO String
    transfers?: string; // 'any', '0', '1', '2'
    bike?: boolean;
}

export async function searchStations(query: string): Promise<Location[]> {
    // This will now request http://localhost:5173/db-api/locations?...
    // Vite intercepts it and secretly asks https://v6.db.transport.rest/locations?...
    const res = await fetch(`${DB_API_BASE}/locations?query=${encodeURIComponent(query)}&results=5`);
    if (!res.ok) throw new Error('Failed to fetch stations');
    return res.json();
}