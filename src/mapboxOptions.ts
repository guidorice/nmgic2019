import { MapboxOptions } from 'mapbox-gl';

const options: MapboxOptions = {
    container: '',
    center: [-106.5521572, 36.6989067], // tierra amarilla, nm
    zoom: 16,
    style: {
        version: 8,
        metadata: {
            'mapbox:autocomposite': true,
        },
        sources: {
            'microsoft-building-footprints': {
                url: 'mapbox://agr.9gf1784j', 
                type: 'vector',
                attribution: '© Microsoft under the Open Data Commons Open Database License (ODbL)'
            },
            'riochama-building-footprints': {
                'url': 'mapbox://agr.2xiolioq', 
                type: 'vector',
                attribution: '© Shawn Penman, Earth Data Analysis Center'
            },
            satellite: {
                url: 'mapbox://mapbox.satellite',
                type: 'raster'
            }
        },
        sprite: 'mapbox://sprites/mapbox/satellite-v9',
        glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
        layers: [
            {
                id: 'background',
                type: 'background',
                paint: { 'background-color': 'black' }
            },
            {
                id: 'satellite',
                type: 'raster',
                source: 'satellite',
                'source-layer': 'mapbox_satellite_full'
            },
            {
                id: 'microsoft-building-footprints',
                type: 'line',
                source: 'microsoft-building-footprints',
                'source-layer': 'NewMexico',
                paint: { 'line-color': 'hsl(223, 100%, 62%)', 'line-width': 3 }
            },
            {
                id: 'rio-chama-watershed-building-footprints',
                type: 'line',
                source: 'riochama-building-footprints',
                'source-layer': 'Rio_Chama_Watershed_Building_Footprints',
                'paint': { 'line-color': 'hsl(63, 100%, 56%)', 'line-width': 3 }
            }
        ],
    }
};

export default options;
