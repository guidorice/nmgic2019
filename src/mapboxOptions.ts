import { MapboxOptions } from 'mapbox-gl';

const options: MapboxOptions = {
    container: '',
    center: [-106.5604504, 36.7009819], // tierra amarilla
    zoom: 15,
    style: {
        version: 8,
        metadata: {
            'mapbox:autocomposite': true,
        },
        sources: {
            'microsoft-building-footprints': {
                url: 'mapbox://agr.0y36gd2l', 'type': 'vector',
                attribution: '© Microsoft under the Open Data Commons Open Database License (ODbL)'
            },
            'riochama-building-footprints': {
                'url': 'mapbox://agr.5j3t7kjc', 'type': 'vector',
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
                id: 'microsoftriochamabuildingfootprints',
                type: 'line',
                source: 'microsoft-building-footprints',
                'source-layer': 'microsoftriochamabuildingfootprints',
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
