
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import mapboxOptions from './mapboxOptions';
import './Map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

const Map: React.FC = () => {
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const mapContainer = useRef<Element | null>(null);
    useEffect(() => {
        if (!mapContainer || !mapContainer.current) return;
        if (!map) {
            const map = new mapboxgl.Map({
                ...mapboxOptions,
                container: mapContainer.current,
            });
            map.on('load', () => {
                setMap(map);
                map.resize();
            });
        }
    }, [map]);

    return (
        <div ref={el => (mapContainer.current = el)} className="map-container" />
    );
}

export default Map;
