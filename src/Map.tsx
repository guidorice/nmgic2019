
import React, { useEffect, useRef, useState, CSSProperties } from 'react';
import mapboxgl from 'mapbox-gl';
import mapboxOptions from './mapboxOptions';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || '';

const mapContainerStyle: CSSProperties = {
    width: '100vw',
    height: '100vh',
    position: 'absolute'
};

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
        <div ref={el => (mapContainer.current = el)} style={mapContainerStyle} />
    );
}

export default Map;
