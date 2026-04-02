import React, { useState, useEffect, useCallback } from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Circle,
    Polygon,
    Polyline,
    useMap,
    useMapEvents
} from 'react-leaflet';
// @ts-ignore
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import type { LatLngExpression, LatLngTuple, PathOptions } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- TYPES ---

export type IconColor = 'blue' | 'red' | 'green' | 'orange' | 'purple' | 'yellow' | 'grey' | 'black';
export type IconSize = 'small' | 'medium' | 'large';

export interface MapMarker {
    id: string | number; // Required for stability
    position: LatLngExpression;
    color?: IconColor;
    size?: IconSize;
    icon?: L.Icon | L.DivIcon;
    popup?: { title?: string; content?: string; image?: string; };
}

export interface MapPolyline {
    id: string | number;
    positions: LatLngExpression[] | LatLngExpression[][];
    style?: PathOptions;
    popup?: string | React.ReactNode;
}

// --- HELPERS ---
const createCustomIcon = (color: IconColor = 'blue', size: IconSize = 'medium'): L.Icon => {
    const sizes: Record<IconSize, [number, number]> = { small: [20, 32], medium: [25, 41], large: [30, 50] };
    return new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: sizes[size],
        iconAnchor: [sizes[size][0] / 2, sizes[size][1]],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
};

// --- SUB-COMPONENTS ---
const MapEvents: React.FC<{ onMapClick?: (latlng: L.LatLng) => void }> = ({ onMapClick }) => {
    useMapEvents({
        click: (e) => {
            if (onMapClick) onMapClick(e.latlng);
        },
    });
    return null;
};

// --- MAIN COMPONENT ---

export interface AdvancedMapProps {
    center?: LatLngExpression;
    zoom?: number;
    markers?: MapMarker[];
    polylines?: MapPolyline[];
    onMapClick?: (latlng: L.LatLng) => void;
    enableClustering?: boolean;
    enableControls?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

export const AdvancedMap: React.FC<AdvancedMapProps> = ({
    center = [51.505, -0.09],
    zoom = 13,
    markers = [],
    polylines = [],
    onMapClick,
    enableClustering = false,
    enableControls = true,
    style = { height: '100%', width: '100%' },
    className = ''
}) => {
    const [mapLayer, setMapLayer] = useState<'osm' | 'sat'>('osm');

    return (
        <div className={`relative overflow-hidden ${className}`} style={style}>
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%', zIndex: 0 }}
                scrollWheelZoom={true}
            >

                <TileLayer
                    url={mapLayer === 'osm'
                        ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    }
                />

                <MapEvents onMapClick={onMapClick} />

                {/* Markers logic */}
                {enableClustering ? (
                    <MarkerClusterGroup>
                        {markers.map((m) => (
                            <Marker key={m.id} position={m.position} icon={m.icon || createCustomIcon(m.color, m.size)}>
                                {m.popup && <Popup><strong>{m.popup.title}</strong><br />{m.popup.content}</Popup>}
                            </Marker>
                        ))}
                    </MarkerClusterGroup>
                ) : (
                    markers.map((m) => (
                        <Marker key={m.id} position={m.position} icon={m.icon || createCustomIcon(m.color, m.size)}>
                            {m.popup && <Popup><strong>{m.popup.title}</strong><br />{m.popup.content}</Popup>}
                        </Marker>
                    ))
                )}

                {/* Polylines logic */}
                {polylines.map((p) => (
                    <Polyline key={p.id} positions={p.positions} pathOptions={p.style || { color: '#0a2463', weight: 4 }} />
                ))}

                {/* Layer Toggle Control */}
                {enableControls && (
                    <div className="leaflet-top leaflet-right" style={{ pointerEvents: 'auto', marginTop: '10px', marginRight: '10px' }}>
                        <div className="leaflet-control bg-white p-2 rounded shadow-md flex gap-2">
                            <button
                                onClick={() => setMapLayer('osm')}
                                className={`px-2 py-1 text-xs font-bold rounded ${mapLayer === 'osm' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                            >OSM</button>
                            <button
                                onClick={() => setMapLayer('sat')}
                                className={`px-2 py-1 text-xs font-bold rounded ${mapLayer === 'sat' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                            >SAT</button>
                        </div>
                    </div>
                )}
            </MapContainer>
        </div>
    );
};