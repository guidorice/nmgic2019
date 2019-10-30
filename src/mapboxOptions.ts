import { MapboxOptions, Style } from 'mapbox-gl';

const style : any = {
    "version": 8,
    "name": "Satellite Streets",
    "metadata": {
        "mapbox:type": "default",
        "mapbox:origin": "satellite-streets-v11",
        "mapbox:autocomposite": true,
        "mapbox:groups": {
            "1444855786460.0557": {"name": "Roads", "collapsed": true},
            "1444934295202.7542": {
                "name": "Admin boundaries",
                "collapsed": true
            },
            "1444855799204.86": {"name": "Bridges", "collapsed": true},
            "1444855769305.6016": {"name": "Tunnels", "collapsed": true}
        },
        "mapbox:sdk-support": {
            "js": "0.54.0",
            "android": "7.4.0",
            "ios": "4.11.0"
        },
        "mapbox:trackposition": true
    },
    "center": [-118.4106, 33.750013],
    "zoom": 13,
    "sources": {
        "mapbox://mapbox.satellite": {
            "url": "mapbox://mapbox.satellite",
            "type": "raster",
            "tileSize": 256
        },
        "composite": {
            "url": "mapbox://mapbox.mapbox-streets-v8",
            "type": "vector"
        },
        'microsoft-building-footprints': {
            url: 'mapbox://agr.9gf1784j', 
            type: 'vector',
            attribution: '© Microsoft under the Open Data Commons Open Database License (ODbL)'
        },
        'riochama-building-footprints': {
            'url': 'mapbox://agr.2xiolioq', 
            type: 'vector',
            attribution: '© Shawn Penman, Earth Data Analysis Center'
        }
    },
    "sprite": "mapbox://sprites/agr/ck2ctg6za0sky1cpa7f2w1yqb/0y2vnk8n60t1vz01wcpm3bpqa",
    "glyphs": "mapbox://fonts/agr/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "background",
            "type": "background",
            "layout": {},
            "paint": {"background-color": "hsl(222, 56%, 4%)"}
        },
        {
            "id": "satellite",
            "type": "raster",
            "source": "mapbox://mapbox.satellite",
            "layout": {},
            "paint": {}
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
        },
        {
            "id": "tunnel-primary-secondary-tertiary-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855769305.6016"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "tunnel"],
                [
                    "match",
                    ["get", "class"],
                    ["primary", "secondary", "tertiary"],
                    true,
                    false
                ],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    10,
                    [
                        "match",
                        ["get", "class"],
                        "primary",
                        1,
                        ["secondary", "tertiary"],
                        0.75,
                        0.75
                    ],
                    18,
                    2
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    [
                        "match",
                        ["get", "class"],
                        "primary",
                        0.75,
                        ["secondary", "tertiary"],
                        0.1,
                        0.1
                    ],
                    18,
                    [
                        "match",
                        ["get", "class"],
                        "primary",
                        32,
                        ["secondary", "tertiary"],
                        26,
                        26
                    ]
                ],
                "line-dasharray": [3, 3],
                "line-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    6,
                    ["match", ["get", "class"], ["primary"], 0.25, 0],
                    8,
                    ["match", ["get", "class"], ["primary"], 0.6, 0],
                    12,
                    ["match", ["get", "class"], ["primary"], 1, 0.6],
                    15,
                    0
                ]
            }
        },
        {
            "id": "tunnel-major-link-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855769305.6016"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "tunnel"],
                [
                    "match",
                    ["get", "class"],
                    ["motorway_link", "trunk_link"],
                    true,
                    false
                ],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.75,
                    20,
                    2
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-dasharray": [3, 3],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "tunnel-motorway-trunk-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855769305.6016"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "tunnel"],
                ["match", ["get", "class"], ["motorway", "trunk"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    10,
                    1,
                    18,
                    2
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-dasharray": [3, 3],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "tunnel-path",
            "type": "line",
            "metadata": {"mapbox:group": "1444855769305.6016"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "tunnel"],
                ["==", ["get", "class"], "path"],
                ["!=", ["get", "type"], "steps"],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    15,
                    1,
                    18,
                    4
                ],
                "line-dasharray": [
                    "step",
                    ["zoom"],
                    ["literal", [1, 0]],
                    15,
                    ["literal", [1.75, 1]],
                    16,
                    ["literal", [1, 0.75]],
                    17,
                    ["literal", [1, 0.5]]
                ],
                "line-color": "hsl(0, 0%, 86%)",
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    7.5,
                    0,
                    8,
                    0.15,
                    16,
                    0.5
                ]
            }
        },
        {
            "id": "tunnel-steps",
            "type": "line",
            "metadata": {"mapbox:group": "1444855769305.6016"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 14,
            "filter": [
                "all",
                ["==", ["get", "structure"], "tunnel"],
                ["==", ["get", "class"], "steps"],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    15,
                    1,
                    16,
                    1.6,
                    18,
                    6
                ],
                "line-color": "hsl(0, 0%, 86%)",
                "line-dasharray": [
                    "step",
                    ["zoom"],
                    ["literal", [1, 0]],
                    15,
                    ["literal", [1.75, 1]],
                    16,
                    ["literal", [1, 0.75]],
                    17,
                    ["literal", [0.3, 0.3]]
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    7.5,
                    0,
                    8,
                    0.15,
                    16,
                    0.5
                ]
            }
        },
        {
            "id": "tunnel-major-link",
            "type": "line",
            "metadata": {"mapbox:group": "1444855769305.6016"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "tunnel"],
                [
                    "match",
                    ["get", "class"],
                    ["motorway_link", "trunk_link"],
                    true,
                    false
                ],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": [
                    "match",
                    ["get", "class"],
                    "motorway_link",
                    "hsl(26, 100%, 78%)",
                    "trunk_link",
                    "hsl(46, 77%, 78%)",
                    "hsl(46, 77%, 78%)"
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "tunnel-pedestrian",
            "type": "line",
            "metadata": {"mapbox:group": "1444855769305.6016"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "tunnel"],
                ["==", ["get", "class"], "pedestrian"],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    14,
                    0.5,
                    18,
                    12
                ],
                "line-color": "hsl(0, 0%, 86%)",
                "line-dasharray": [
                    "step",
                    ["zoom"],
                    ["literal", [1, 0]],
                    15,
                    ["literal", [1.5, 0.4]],
                    16,
                    ["literal", [1, 0.2]]
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    7.5,
                    0,
                    8,
                    0.15,
                    16,
                    0.5
                ]
            }
        },
        {
            "id": "tunnel-primary-secondary-tertiary",
            "type": "line",
            "metadata": {"mapbox:group": "1444855769305.6016"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "tunnel"],
                [
                    "match",
                    ["get", "class"],
                    ["primary", "secondary", "tertiary"],
                    true,
                    false
                ],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    [
                        "match",
                        ["get", "class"],
                        "primary",
                        0.75,
                        ["secondary", "tertiary"],
                        0.1,
                        0.1
                    ],
                    18,
                    [
                        "match",
                        ["get", "class"],
                        "primary",
                        32,
                        ["secondary", "tertiary"],
                        26,
                        26
                    ]
                ],
                "line-color": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    8,
                    [
                        "match",
                        ["get", "class"],
                        ["primary"],
                        "hsl(0, 0%, 96%)",
                        "hsl(0, 1%, 17%)"
                    ],
                    10,
                    [
                        "match",
                        ["get", "class"],
                        ["primary"],
                        "hsl(0, 2%, 83%)",
                        "hsl(0, 1%, 17%)"
                    ]
                ],
                "line-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    6,
                    ["match", ["get", "class"], ["primary"], 0.25, 0],
                    8,
                    ["match", ["get", "class"], ["primary"], 0.6, 0],
                    12,
                    ["match", ["get", "class"], ["primary"], 1, 0.6],
                    15,
                    0
                ]
            }
        },
        {
            "id": "tunnel-oneway-arrow-blue",
            "type": "symbol",
            "metadata": {"mapbox:group": "1444855769305.6016"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 15,
            "filter": [
                "all",
                ["==", ["get", "structure"], "tunnel"],
                ["==", ["get", "oneway"], "true"],
                [
                    "step",
                    ["zoom"],
                    [
                        "match",
                        ["get", "class"],
                        [
                            "primary",
                            "secondary",
                            "street",
                            "street_limited",
                            "tertiary"
                        ],
                        true,
                        false
                    ],
                    16,
                    [
                        "match",
                        ["get", "class"],
                        [
                            "primary",
                            "secondary",
                            "tertiary",
                            "street",
                            "street_limited",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "path",
                            "pedestrian",
                            "service",
                            "track"
                        ],
                        true,
                        false
                    ]
                ]
            ],
            "layout": {
                "symbol-placement": "line",
                "icon-image": [
                    "step",
                    ["zoom"],
                    "oneway-small",
                    17,
                    [
                        "match",
                        ["get", "class"],
                        [
                            "primary",
                            "secondary",
                            "tertiary",
                            "street",
                            "street_limited"
                        ],
                        "oneway-large",
                        "oneway-small"
                    ],
                    18,
                    "oneway-large"
                ],
                "symbol-spacing": 200,
                "icon-rotation-alignment": "map"
            },
            "paint": {}
        },
        {
            "id": "tunnel-motorway-trunk",
            "type": "line",
            "metadata": {"mapbox:group": "1444855769305.6016"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "tunnel"],
                ["match", ["get", "class"], ["motorway", "trunk"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-color": [
                    "match",
                    ["get", "class"],
                    "motorway",
                    "hsl(26, 100%, 78%)",
                    "trunk",
                    "hsl(46, 77%, 78%)",
                    "hsl(46, 77%, 78%)"
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "tunnel-oneway-arrow-white",
            "type": "symbol",
            "metadata": {"mapbox:group": "1444855769305.6016"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 16,
            "filter": [
                "all",
                ["==", ["get", "structure"], "tunnel"],
                [
                    "match",
                    ["get", "class"],
                    ["motorway", "motorway_link", "trunk", "trunk_link"],
                    true,
                    false
                ],
                ["==", ["get", "oneway"], "true"]
            ],
            "layout": {
                "symbol-placement": "line",
                "icon-image": [
                    "step",
                    ["zoom"],
                    "oneway-white-small",
                    17,
                    "oneway-white-large"
                ],
                "symbol-spacing": 200
            },
            "paint": {}
        },
        {
            "id": "ferry",
            "type": "line",
            "source": "composite",
            "source-layer": "road",
            "minzoom": 8,
            "filter": ["==", ["get", "type"], "ferry"],
            "layout": {"line-join": "round"},
            "paint": {
                "line-color": "hsl(0, 0%, 86%)",
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    14,
                    0.5,
                    20,
                    1
                ],
                "line-dasharray": [
                    "step",
                    ["zoom"],
                    ["literal", [1, 0]],
                    13,
                    ["literal", [12, 4]]
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    7.5,
                    0,
                    8,
                    0.15,
                    16,
                    0.5
                ]
            }
        },
        {
            "id": "ferry-auto",
            "type": "line",
            "source": "composite",
            "source-layer": "road",
            "filter": ["==", ["get", "type"], "ferry_auto"],
            "layout": {"line-join": "round"},
            "paint": {
                "line-color": "hsl(0, 0%, 86%)",
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    14,
                    0.5,
                    20,
                    1
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    7.5,
                    0,
                    8,
                    0.15,
                    16,
                    0.5
                ]
            }
        },
        {
            "id": "road-pedestrian-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 12,
            "filter": [
                "all",
                ["==", ["get", "class"], "pedestrian"],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    14,
                    2,
                    18,
                    14.5
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1.2],
                    ["zoom"],
                    12,
                    0,
                    14,
                    0.5,
                    15,
                    0
                ]
            }
        },
        {
            "id": "road-street-low",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 11,
            "filter": [
                "all",
                [
                    "match",
                    ["get", "class"],
                    ["street", "street_limited", "primary_link"],
                    true,
                    false
                ],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": "hsl(0, 1%, 17%)",
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1.2],
                    ["zoom"],
                    12,
                    0,
                    14,
                    0.5,
                    15,
                    0
                ]
            }
        },
        {
            "id": "road-street-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 11,
            "filter": [
                "all",
                [
                    "match",
                    ["get", "class"],
                    ["street", "street_limited", "primary_link"],
                    true,
                    false
                ],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.75,
                    20,
                    2
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1.2],
                    ["zoom"],
                    12,
                    0,
                    14,
                    0.5,
                    15,
                    0
                ]
            }
        },
        {
            "id": "road-secondary-tertiary-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "filter": [
                "all",
                [
                    "match",
                    ["get", "class"],
                    ["secondary", "tertiary"],
                    true,
                    false
                ],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    10,
                    0.75,
                    18,
                    2
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    0.1,
                    18,
                    26
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1.2],
                    ["zoom"],
                    12,
                    0,
                    14,
                    0.5,
                    15,
                    0
                ]
            }
        },
        {
            "id": "road-primary-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "filter": [
                "all",
                ["==", ["get", "class"], "primary"],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    10,
                    1,
                    18,
                    2
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    6,
                    0.25,
                    8,
                    0.6,
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "road-major-link-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 10,
            "filter": [
                "all",
                [
                    "match",
                    ["get", "class"],
                    ["motorway_link", "trunk_link"],
                    true,
                    false
                ],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.75,
                    20,
                    2
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "road-motorway-trunk-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "filter": [
                "all",
                ["match", ["get", "class"], ["motorway", "trunk"], true, false],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    10,
                    1,
                    18,
                    2
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "road-path",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 12,
            "filter": [
                "all",
                ["==", ["get", "class"], "path"],
                [
                    "step",
                    ["zoom"],
                    [
                        "!",
                        [
                            "match",
                            ["get", "type"],
                            ["steps", "sidewalk", "crossing"],
                            true,
                            false
                        ]
                    ],
                    16,
                    ["!=", ["get", "type"], "steps"]
                ],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    13,
                    0.5,
                    14,
                    1,
                    15,
                    1,
                    18,
                    4
                ],
                "line-color": "hsl(0, 0%, 86%)",
                "line-dasharray": [
                    "step",
                    ["zoom"],
                    ["literal", [1, 0]],
                    15,
                    ["literal", [1.75, 1]],
                    16,
                    ["literal", [1, 0.75]],
                    17,
                    ["literal", [1, 0.5]]
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    7.5,
                    0,
                    8,
                    0.15,
                    16,
                    0.5
                ]
            }
        },
        {
            "id": "road-steps",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 14,
            "filter": [
                "all",
                ["==", ["get", "type"], "steps"],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    15,
                    1,
                    16,
                    1.6,
                    18,
                    6
                ],
                "line-color": "hsl(0, 0%, 86%)",
                "line-dasharray": [
                    "step",
                    ["zoom"],
                    ["literal", [1, 0]],
                    15,
                    ["literal", [1.75, 1]],
                    16,
                    ["literal", [1, 0.75]],
                    17,
                    ["literal", [0.3, 0.3]]
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    7.5,
                    0,
                    8,
                    0.15,
                    16,
                    0.5
                ]
            }
        },
        {
            "id": "road-major-link",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 10,
            "filter": [
                "all",
                [
                    "match",
                    ["get", "class"],
                    ["motorway_link", "trunk_link"],
                    true,
                    false
                ],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": [
                    "match",
                    ["get", "class"],
                    "motorway_link",
                    "hsl(26, 100%, 68%)",
                    "trunk_link",
                    "hsl(46, 85%, 67%)",
                    "hsl(46, 85%, 67%)"
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "road-pedestrian",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 12,
            "filter": [
                "all",
                ["==", ["get", "class"], "pedestrian"],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    14,
                    0.5,
                    18,
                    12
                ],
                "line-color": "hsl(0, 0%, 86%)",
                "line-dasharray": [
                    "step",
                    ["zoom"],
                    ["literal", [1, 0]],
                    15,
                    ["literal", [1.5, 0.4]],
                    16,
                    ["literal", [1, 0.2]]
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    7.5,
                    0,
                    8,
                    0.15,
                    16,
                    0.5
                ]
            }
        },
        {
            "id": "road-street",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 11,
            "filter": [
                "all",
                [
                    "match",
                    ["get", "class"],
                    ["street", "street_limited", "primary_link"],
                    true,
                    false
                ],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": "hsl(0, 1%, 17%)",
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1.2],
                    ["zoom"],
                    12,
                    0,
                    14,
                    0.5,
                    15,
                    0
                ]
            }
        },
        {
            "id": "road-secondary-tertiary",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "filter": [
                "all",
                [
                    "match",
                    ["get", "class"],
                    ["secondary", "tertiary"],
                    true,
                    false
                ],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    0.1,
                    18,
                    26
                ],
                "line-color": "hsl(0, 1%, 17%)",
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1.2],
                    ["zoom"],
                    12,
                    0,
                    14,
                    0.5,
                    15,
                    0
                ]
            }
        },
        {
            "id": "road-primary",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "filter": [
                "all",
                ["==", ["get", "class"], "primary"],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    8,
                    "hsl(0, 0%, 96%)",
                    10,
                    "hsl(0, 0%, 89%)"
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1.25],
                    ["zoom"],
                    6,
                    0.25,
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "road-oneway-arrow-blue",
            "type": "symbol",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 15,
            "filter": [
                "all",
                ["==", ["get", "oneway"], "true"],
                [
                    "step",
                    ["zoom"],
                    [
                        "match",
                        ["get", "class"],
                        [
                            "primary",
                            "secondary",
                            "tertiary",
                            "street",
                            "street_limited"
                        ],
                        true,
                        false
                    ],
                    16,
                    [
                        "match",
                        ["get", "class"],
                        [
                            "primary",
                            "secondary",
                            "tertiary",
                            "street",
                            "street_limited",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "path",
                            "pedestrian",
                            "service",
                            "track"
                        ],
                        true,
                        false
                    ]
                ],
                ["match", ["get", "structure"], ["none", "ford"], true, false]
            ],
            "layout": {
                "symbol-placement": "line",
                "icon-image": [
                    "step",
                    ["zoom"],
                    "oneway-small",
                    17,
                    [
                        "match",
                        ["get", "class"],
                        [
                            "primary",
                            "secondary",
                            "tertiary",
                            "street",
                            "street_limited"
                        ],
                        "oneway-large",
                        "oneway-small"
                    ],
                    18,
                    "oneway-large"
                ],
                "symbol-spacing": 200,
                "icon-rotation-alignment": "map"
            },
            "paint": {}
        },
        {
            "id": "road-motorway-trunk",
            "type": "line",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "filter": [
                "all",
                ["match", ["get", "class"], ["motorway", "trunk"], true, false],
                ["match", ["get", "structure"], ["none", "ford"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-color": [
                    "step",
                    ["zoom"],
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        "hsl(26, 87%, 62%)",
                        "trunk",
                        "hsl(46, 80%, 60%)",
                        "hsl(46, 80%, 60%)"
                    ],
                    9,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        "hsl(26, 100%, 68%)",
                        "trunk",
                        "hsl(46, 85%, 67%)",
                        "hsl(46, 85%, 67%)"
                    ]
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "road-oneway-arrow-white",
            "type": "symbol",
            "metadata": {"mapbox:group": "1444855786460.0557"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 16,
            "filter": [
                "all",
                ["==", ["get", "oneway"], "true"],
                [
                    "match",
                    ["get", "class"],
                    ["motorway", "trunk", "motorway_link", "trunk_link"],
                    true,
                    false
                ],
                ["match", ["get", "structure"], ["none", "ford"], true, false]
            ],
            "layout": {
                "symbol-placement": "line",
                "icon-image": [
                    "step",
                    ["zoom"],
                    "oneway-white-small",
                    17,
                    "oneway-white-large"
                ],
                "symbol-spacing": 200
            },
            "paint": {}
        },
        {
            "id": "bridge-pedestrian-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                ["==", ["get", "class"], "pedestrian"],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    14,
                    2,
                    18,
                    14.5
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-opacity": ["step", ["zoom"], 0, 14, 1]
            }
        },
        {
            "id": "bridge-primary-secondary-tertiary-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                [
                    "match",
                    ["get", "class"],
                    ["primary", "secondary", "tertiary"],
                    true,
                    false
                ],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    10,
                    [
                        "match",
                        ["get", "class"],
                        "primary",
                        1,
                        ["secondary", "tertiary"],
                        0.75,
                        0.75
                    ],
                    18,
                    2
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    [
                        "match",
                        ["get", "class"],
                        "primary",
                        0.75,
                        ["secondary", "tertiary"],
                        0.1,
                        0.1
                    ],
                    18,
                    [
                        "match",
                        ["get", "class"],
                        "primary",
                        32,
                        ["secondary", "tertiary"],
                        26,
                        26
                    ]
                ],
                "line-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    6,
                    ["match", ["get", "class"], ["primary"], 0.25, 0],
                    8,
                    ["match", ["get", "class"], ["primary"], 0.6, 0],
                    12,
                    ["match", ["get", "class"], ["primary"], 1, 0.6],
                    15,
                    0
                ]
            }
        },
        {
            "id": "bridge-major-link-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                [
                    "match",
                    ["get", "class"],
                    ["motorway_link", "trunk_link"],
                    true,
                    false
                ],
                ["<=", ["get", "layer"], 1],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.75,
                    20,
                    2
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "bridge-motorway-trunk-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                ["match", ["get", "class"], ["motorway", "trunk"], true, false],
                ["<=", ["get", "layer"], 1],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    10,
                    1,
                    18,
                    2
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "bridge-path",
            "type": "line",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                ["==", ["get", "class"], "path"],
                ["!=", ["get", "type"], "steps"],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    15,
                    1,
                    18,
                    4
                ],
                "line-color": "hsl(0, 0%, 86%)",
                "line-dasharray": [
                    "step",
                    ["zoom"],
                    ["literal", [1, 0]],
                    15,
                    ["literal", [1.75, 1]],
                    16,
                    ["literal", [1, 0.75]],
                    17,
                    ["literal", [1, 0.5]]
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    7.5,
                    0,
                    8,
                    0.15,
                    16,
                    0.5
                ]
            }
        },
        {
            "id": "bridge-steps",
            "type": "line",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 14,
            "filter": [
                "all",
                ["==", ["get", "type"], "steps"],
                ["==", ["get", "structure"], "bridge"],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    15,
                    1,
                    16,
                    1.6,
                    18,
                    6
                ],
                "line-color": "hsl(0, 0%, 86%)",
                "line-dasharray": [
                    "step",
                    ["zoom"],
                    ["literal", [1, 0]],
                    15,
                    ["literal", [1.75, 1]],
                    16,
                    ["literal", [1, 0.75]],
                    17,
                    ["literal", [0.3, 0.3]]
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    7.5,
                    0,
                    8,
                    0.15,
                    16,
                    0.5
                ]
            }
        },
        {
            "id": "bridge-major-link",
            "type": "line",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                [
                    "match",
                    ["get", "class"],
                    ["motorway_link", "trunk_link"],
                    true,
                    false
                ],
                ["<=", ["get", "layer"], 1],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": [
                    "match",
                    ["get", "class"],
                    "motorway_link",
                    "hsl(26, 100%, 68%)",
                    "trunk_link",
                    "hsl(46, 85%, 67%)",
                    "hsl(46, 85%, 67%)"
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "bridge-pedestrian",
            "type": "line",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                ["==", ["get", "class"], "pedestrian"],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    14,
                    0.5,
                    18,
                    12
                ],
                "line-color": "hsl(0, 0%, 86%)",
                "line-dasharray": [
                    "step",
                    ["zoom"],
                    ["literal", [1, 0]],
                    15,
                    ["literal", [1.5, 0.4]],
                    16,
                    ["literal", [1, 0.2]]
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    7.5,
                    0,
                    8,
                    0.15,
                    16,
                    0.5
                ]
            }
        },
        {
            "id": "bridge-primary-secondary-tertiary",
            "type": "line",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                [
                    "match",
                    ["get", "class"],
                    ["primary", "secondary", "tertiary"],
                    true,
                    false
                ],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    [
                        "match",
                        ["get", "class"],
                        "primary",
                        0.75,
                        ["secondary", "tertiary"],
                        0.1,
                        0.1
                    ],
                    18,
                    [
                        "match",
                        ["get", "class"],
                        "primary",
                        32,
                        ["secondary", "tertiary"],
                        26,
                        26
                    ]
                ],
                "line-color": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    8,
                    [
                        "match",
                        ["get", "class"],
                        ["primary"],
                        "hsl(0, 0%, 96%)",
                        "hsl(0, 1%, 17%)"
                    ],
                    10,
                    [
                        "match",
                        ["get", "class"],
                        ["primary"],
                        "hsl(0, 2%, 83%)",
                        "hsl(0, 1%, 17%)"
                    ]
                ],
                "line-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    6,
                    ["match", ["get", "class"], ["primary"], 0.25, 0],
                    8,
                    ["match", ["get", "class"], ["primary"], 0.6, 0],
                    12,
                    ["match", ["get", "class"], ["primary"], 1, 0.6],
                    15,
                    0
                ]
            }
        },
        {
            "id": "bridge-oneway-arrow-blue",
            "type": "symbol",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 15,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                ["==", ["get", "oneway"], "true"],
                [
                    "step",
                    ["zoom"],
                    [
                        "match",
                        ["get", "class"],
                        [
                            "primary",
                            "secondary",
                            "tertiary",
                            "street",
                            "street_limited"
                        ],
                        true,
                        false
                    ],
                    16,
                    [
                        "match",
                        ["get", "class"],
                        [
                            "primary",
                            "secondary",
                            "tertiary",
                            "street",
                            "street_limited",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "path",
                            "pedestrian",
                            "track",
                            "service"
                        ],
                        true,
                        false
                    ]
                ]
            ],
            "layout": {
                "symbol-placement": "line",
                "icon-image": [
                    "step",
                    ["zoom"],
                    "oneway-small",
                    17,
                    [
                        "match",
                        ["get", "class"],
                        [
                            "primary",
                            "secondary",
                            "tertiary",
                            "street",
                            "street_limited"
                        ],
                        "oneway-large",
                        "oneway-small"
                    ],
                    18,
                    "oneway-large"
                ],
                "symbol-spacing": 200,
                "icon-rotation-alignment": "map"
            },
            "paint": {}
        },
        {
            "id": "bridge-motorway-trunk",
            "type": "line",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                ["match", ["get", "class"], ["motorway", "trunk"], true, false],
                ["<=", ["get", "layer"], 1],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-color": [
                    "match",
                    ["get", "class"],
                    "motorway",
                    "hsl(26, 100%, 68%)",
                    "trunk",
                    "hsl(46, 85%, 67%)",
                    "hsl(46, 85%, 67%)"
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "bridge-major-link-2-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                [">=", ["get", "layer"], 2],
                [
                    "match",
                    ["get", "class"],
                    ["motorway_link", "trunk_link"],
                    true,
                    false
                ],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.75,
                    20,
                    2
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "bridge-motorway-trunk-2-case",
            "type": "line",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                [">=", ["get", "layer"], 2],
                ["match", ["get", "class"], ["motorway", "trunk"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    10,
                    1,
                    18,
                    2
                ],
                "line-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    9,
                    "hsl(0, 1%, 26%)",
                    12,
                    "hsl(0, 1%, 31%)"
                ],
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "bridge-major-link-2",
            "type": "line",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                [">=", ["get", "layer"], 2],
                [
                    "match",
                    ["get", "class"],
                    ["motorway_link", "trunk_link"],
                    true,
                    false
                ],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": [
                    "match",
                    ["get", "class"],
                    "motorway_link",
                    "hsl(26, 100%, 68%)",
                    "trunk_link",
                    "hsl(46, 85%, 67%)",
                    "hsl(46, 85%, 67%)"
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "bridge-motorway-trunk-2",
            "type": "line",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                [">=", ["get", "layer"], 2],
                ["match", ["get", "class"], ["motorway", "trunk"], true, false],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "line-join": "round",
                "line-cap": ["step", ["zoom"], "round", 12, "butt"]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-color": [
                    "match",
                    ["get", "class"],
                    "motorway",
                    "hsl(26, 100%, 68%)",
                    "trunk",
                    "hsl(46, 85%, 67%)",
                    "hsl(46, 85%, 67%)"
                ],
                "line-opacity": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    13,
                    1,
                    15,
                    0
                ]
            }
        },
        {
            "id": "bridge-oneway-arrow-white",
            "type": "symbol",
            "metadata": {"mapbox:group": "1444855799204.86"},
            "source": "composite",
            "source-layer": "road",
            "minzoom": 16,
            "filter": [
                "all",
                ["==", ["get", "structure"], "bridge"],
                [
                    "match",
                    ["get", "class"],
                    ["motorway", "trunk", "motorway_link", "trunk_link"],
                    true,
                    false
                ],
                ["==", ["get", "oneway"], "true"]
            ],
            "layout": {
                "symbol-placement": "line",
                "icon-image": [
                    "step",
                    ["zoom"],
                    "oneway-white-small",
                    17,
                    "oneway-white-large"
                ],
                "symbol-spacing": 200
            },
            "paint": {}
        },
        {
            "id": "aerialway",
            "type": "line",
            "source": "composite",
            "source-layer": "road",
            "minzoom": 13,
            "filter": ["==", ["get", "class"], "aerialway"],
            "layout": {"line-join": "round"},
            "paint": {
                "line-color": "hsl(230, 10%, 74%)",
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    14,
                    0.5,
                    20,
                    1
                ]
            }
        },
        {
            "id": "admin-1-boundary-bg",
            "type": "line",
            "metadata": {"mapbox:group": "1444934295202.7542"},
            "source": "composite",
            "source-layer": "admin",
            "filter": [
                "all",
                ["==", ["get", "admin_level"], 1],
                ["==", ["get", "maritime"], "false"],
                ["match", ["get", "worldview"], ["all", "US"], true, false]
            ],
            "layout": {"line-join": "bevel"},
            "paint": {
                "line-color": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    8,
                    "hsl(35, 12%, 89%)",
                    16,
                    "hsl(230, 49%, 90%)"
                ],
                "line-width": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    7,
                    3.75,
                    12,
                    5.5
                ],
                "line-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    7,
                    0,
                    8,
                    0.75
                ],
                "line-dasharray": [1, 0],
                "line-translate": [0, 0],
                "line-blur": ["interpolate", ["linear"], ["zoom"], 3, 0, 8, 3]
            }
        },
        {
            "id": "admin-0-boundary-bg",
            "type": "line",
            "metadata": {"mapbox:group": "1444934295202.7542"},
            "source": "composite",
            "source-layer": "admin",
            "minzoom": 1,
            "filter": [
                "all",
                ["==", ["get", "admin_level"], 0],
                ["==", ["get", "maritime"], "false"],
                ["match", ["get", "worldview"], ["all", "US"], true, false]
            ],
            "layout": {},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    3,
                    3.5,
                    10,
                    8
                ],
                "line-color": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    6,
                    "hsl(35, 12%, 89%)",
                    8,
                    "hsl(230, 49%, 90%)"
                ],
                "line-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    3,
                    0,
                    4,
                    0.5
                ],
                "line-translate": [0, 0],
                "line-blur": ["interpolate", ["linear"], ["zoom"], 3, 0, 10, 2]
            }
        },
        {
            "id": "admin-1-boundary",
            "type": "line",
            "metadata": {"mapbox:group": "1444934295202.7542"},
            "source": "composite",
            "source-layer": "admin",
            "filter": [
                "all",
                ["==", ["get", "admin_level"], 1],
                ["==", ["get", "maritime"], "false"],
                ["match", ["get", "worldview"], ["all", "US"], true, false]
            ],
            "layout": {"line-join": "round", "line-cap": "round"},
            "paint": {
                "line-dasharray": [
                    "step",
                    ["zoom"],
                    ["literal", [2, 0]],
                    7,
                    ["literal", [2, 2, 6, 2]]
                ],
                "line-width": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    7,
                    0.75,
                    12,
                    1.5
                ],
                "line-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    2,
                    0,
                    3,
                    1
                ],
                "line-color": "hsl(0, 0%, 0%)"
            }
        },
        {
            "id": "admin-0-boundary",
            "type": "line",
            "metadata": {"mapbox:group": "1444934295202.7542"},
            "source": "composite",
            "source-layer": "admin",
            "minzoom": 1,
            "filter": [
                "all",
                ["==", ["get", "admin_level"], 0],
                ["==", ["get", "disputed"], "false"],
                ["==", ["get", "maritime"], "false"],
                ["match", ["get", "worldview"], ["all", "US"], true, false]
            ],
            "layout": {"line-join": "round", "line-cap": "round"},
            "paint": {
                "line-color": "hsl(0, 0%, 0%)",
                "line-width": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    3,
                    0.5,
                    10,
                    2
                ]
            }
        },
        {
            "id": "admin-0-boundary-disputed",
            "type": "line",
            "metadata": {"mapbox:group": "1444934295202.7542"},
            "source": "composite",
            "source-layer": "admin",
            "minzoom": 1,
            "filter": [
                "all",
                ["==", ["get", "disputed"], "true"],
                ["==", ["get", "admin_level"], 0],
                ["==", ["get", "maritime"], "false"],
                ["match", ["get", "worldview"], ["all", "US"], true, false]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-dasharray": [1.5, 1.5],
                "line-color": "hsl(0, 0%, 0%)",
                "line-width": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    3,
                    0.5,
                    10,
                    2
                ]
            }
        },
        {
            "id": "road-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "road",
            "minzoom": 10,
            "filter": [
                "step",
                ["zoom"],
                [
                    "match",
                    ["get", "class"],
                    ["motorway", "trunk", "primary", "secondary", "tertiary"],
                    true,
                    false
                ],
                12,
                [
                    "match",
                    ["get", "class"],
                    [
                        "motorway",
                        "trunk",
                        "primary",
                        "secondary",
                        "tertiary",
                        "pedestrian",
                        "street",
                        "street_limited"
                    ],
                    true,
                    false
                ],
                15,
                ["match", ["get", "class"], ["golf", "path"], false, true]
            ],
            "layout": {
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    10,
                    [
                        "match",
                        ["get", "class"],
                        [
                            "motorway",
                            "trunk",
                            "primary",
                            "secondary",
                            "tertiary"
                        ],
                        10,
                        [
                            "motorway_link",
                            "trunk_link",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "pedestrian",
                            "street",
                            "street_limited"
                        ],
                        9,
                        6.5
                    ],
                    18,
                    [
                        "match",
                        ["get", "class"],
                        [
                            "motorway",
                            "trunk",
                            "primary",
                            "secondary",
                            "tertiary"
                        ],
                        16,
                        [
                            "motorway_link",
                            "trunk_link",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "pedestrian",
                            "street",
                            "street_limited"
                        ],
                        14,
                        13
                    ]
                ],
                "text-max-angle": 30,
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "symbol-placement": "line",
                "text-padding": 1,
                "text-rotation-alignment": "map",
                "text-pitch-alignment": "viewport",
                "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]],
                "text-letter-spacing": 0.01
            },
            "paint": {
                "text-halo-color": "hsl(0, 0%, 17%)",
                "text-color": "hsl(0, 0%, 100%)",
                "text-halo-width": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    14,
                    1.25,
                    15,
                    1.5
                ]
            }
        },
        {
            "id": "road-number-shield",
            "type": "symbol",
            "source": "composite",
            "source-layer": "road",
            "minzoom": 6,
            "filter": [
                "all",
                ["has", "reflen"],
                ["<=", ["get", "reflen"], 6],
                [
                    "step",
                    ["zoom"],
                    ["==", ["geometry-type"], "Point"],
                    11,
                    [">", ["get", "len"], 5000],
                    12,
                    [">", ["get", "len"], 2500],
                    13,
                    [">", ["get", "len"], 1000],
                    14,
                    true
                ]
            ],
            "layout": {
                "text-size": 9,
                "icon-image": [
                    "concat",
                    ["get", "shield"],
                    "-",
                    ["to-string", ["get", "reflen"]]
                ],
                "icon-rotation-alignment": "viewport",
                "text-max-angle": 38,
                "symbol-spacing": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    11,
                    150,
                    14,
                    200
                ],
                "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
                "symbol-placement": ["step", ["zoom"], "point", 11, "line"],
                "text-rotation-alignment": "viewport",
                "text-field": ["get", "ref"],
                "text-letter-spacing": 0.05
            },
            "paint": {
                "text-color": [
                    "match",
                    ["get", "shield_text_color"],
                    "white",
                    "hsl(0, 0%, 100%)",
                    "black",
                    "hsl(0, 0%, 7%)",
                    "yellow",
                    "hsl(50, 100%, 70%)",
                    "orange",
                    "hsl(25, 100%, 75%)",
                    "blue",
                    "hsl(230, 48%, 34%)",
                    "hsl(0, 0%, 100%)"
                ]
            }
        },
        {
            "id": "road-exit-shield",
            "type": "symbol",
            "source": "composite",
            "source-layer": "motorway_junction",
            "minzoom": 14,
            "filter": ["all", ["has", "reflen"], ["<=", ["get", "reflen"], 9]],
            "layout": {
                "text-field": ["get", "ref"],
                "text-size": 9,
                "icon-image": [
                    "concat",
                    "motorway-exit-",
                    ["to-string", ["get", "reflen"]]
                ],
                "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"]
            },
            "paint": {
                "text-color": "hsl(0, 0%, 100%)",
                "text-translate": [0, 0]
            }
        },
        {
            "id": "waterway-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "natural_label",
            "minzoom": 13,
            "filter": [
                "all",
                [
                    "match",
                    ["get", "class"],
                    ["canal", "river", "stream"],
                    true,
                    false
                ],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "text-font": [
                    "DIN Offc Pro Italic",
                    "Arial Unicode MS Regular"
                ],
                "text-max-angle": 30,
                "symbol-spacing": [
                    "interpolate",
                    ["linear", 1],
                    ["zoom"],
                    15,
                    250,
                    17,
                    400
                ],
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    13,
                    12,
                    18,
                    16
                ],
                "symbol-placement": "line",
                "text-pitch-alignment": "viewport",
                "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]]
            },
            "paint": {
                "text-color": "hsl(196, 80%, 70%)",
                "text-halo-color": "hsl(0, 0%, 17%)",
                "text-halo-width": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    14,
                    1.25,
                    15,
                    1.5
                ]
            }
        },
        {
            "id": "natural-line-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "natural_label",
            "minzoom": 4,
            "filter": [
                "all",
                [
                    "match",
                    ["get", "class"],
                    ["glacier", "landform"],
                    true,
                    false
                ],
                ["==", ["geometry-type"], "LineString"],
                ["<=", ["get", "filterrank"], 2]
            ],
            "layout": {
                "text-size": [
                    "step",
                    ["zoom"],
                    ["step", ["get", "sizerank"], 18, 5, 12],
                    17,
                    ["step", ["get", "sizerank"], 18, 13, 12]
                ],
                "text-max-angle": 30,
                "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]],
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "symbol-placement": "line-center",
                "text-pitch-alignment": "viewport"
            },
            "paint": {
                "text-halo-width": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    14,
                    1.25,
                    15,
                    1.5
                ],
                "text-halo-color": "hsl(0, 0%, 100%)",
                "text-halo-blur": 0.5,
                "text-color": [
                    "step",
                    ["zoom"],
                    [
                        "step",
                        ["get", "sizerank"],
                        "hsl(26, 20%, 42%)",
                        5,
                        "hsl(26, 25%, 32%)"
                    ],
                    17,
                    [
                        "step",
                        ["get", "sizerank"],
                        "hsl(26, 20%, 42%)",
                        13,
                        "hsl(26, 25%, 32%)"
                    ]
                ]
            }
        },
        {
            "id": "natural-point-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "natural_label",
            "minzoom": 4,
            "filter": [
                "all",
                [
                    "match",
                    ["get", "class"],
                    ["dock", "glacier", "landform", "water_feature", "wetland"],
                    true,
                    false
                ],
                ["==", ["geometry-type"], "Point"],
                ["<=", ["get", "filterrank"], 2]
            ],
            "layout": {
                "text-size": [
                    "step",
                    ["zoom"],
                    ["step", ["get", "sizerank"], 18, 5, 12],
                    17,
                    ["step", ["get", "sizerank"], 18, 13, 12]
                ],
                "icon-image": [
                    "step",
                    ["zoom"],
                    ["concat", ["get", "maki"], "-11"],
                    15,
                    ["concat", ["get", "maki"], "-15"]
                ],
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-offset": [
                    "step",
                    ["zoom"],
                    [
                        "step",
                        ["get", "sizerank"],
                        ["literal", [0, 0]],
                        5,
                        ["literal", [0, 0.75]]
                    ],
                    17,
                    [
                        "step",
                        ["get", "sizerank"],
                        ["literal", [0, 0]],
                        13,
                        ["literal", [0, 0.75]]
                    ]
                ],
                "text-anchor": [
                    "step",
                    ["zoom"],
                    ["step", ["get", "sizerank"], "center", 5, "top"],
                    17,
                    ["step", ["get", "sizerank"], "center", 13, "top"]
                ],
                "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]]
            },
            "paint": {
                "icon-opacity": [
                    "step",
                    ["zoom"],
                    ["step", ["get", "sizerank"], 0, 5, 1],
                    17,
                    ["step", ["get", "sizerank"], 0, 13, 1]
                ],
                "text-halo-color": "hsl(0, 0%, 17%)",
                "text-halo-width": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    14,
                    1.25,
                    15,
                    1.5
                ],
                "text-halo-blur": 0.5,
                "text-color": "hsl(0, 0%, 100%)"
            }
        },
        {
            "id": "water-line-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "natural_label",
            "filter": [
                "all",
                [
                    "match",
                    ["get", "class"],
                    ["bay", "ocean", "reservoir", "sea", "water"],
                    true,
                    false
                ],
                ["==", ["geometry-type"], "LineString"]
            ],
            "layout": {
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    7,
                    ["step", ["get", "sizerank"], 24, 6, 18, 12, 12],
                    10,
                    ["step", ["get", "sizerank"], 18, 9, 12],
                    18,
                    ["step", ["get", "sizerank"], 18, 9, 16]
                ],
                "text-max-angle": 30,
                "text-letter-spacing": [
                    "match",
                    ["get", "class"],
                    "ocean",
                    0.25,
                    ["sea", "bay"],
                    0.15,
                    0
                ],
                "text-font": [
                    "DIN Offc Pro Italic",
                    "Arial Unicode MS Regular"
                ],
                "symbol-placement": "line-center",
                "text-pitch-alignment": "viewport",
                "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]]
            },
            "paint": {
                "text-color": "hsl(196, 80%, 70%)",
                "text-halo-color": "hsl(0, 0%, 17%)",
                "text-halo-width": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    14,
                    1.25,
                    15,
                    1.5
                ]
            }
        },
        {
            "id": "water-point-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "natural_label",
            "filter": [
                "all",
                [
                    "match",
                    ["get", "class"],
                    ["bay", "ocean", "reservoir", "sea", "water"],
                    true,
                    false
                ],
                ["==", ["geometry-type"], "Point"]
            ],
            "layout": {
                "text-line-height": 1.3,
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    7,
                    ["step", ["get", "sizerank"], 24, 6, 18, 12, 12],
                    10,
                    ["step", ["get", "sizerank"], 18, 9, 12]
                ],
                "text-font": [
                    "DIN Offc Pro Italic",
                    "Arial Unicode MS Regular"
                ],
                "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]],
                "text-letter-spacing": [
                    "match",
                    ["get", "class"],
                    "ocean",
                    0.25,
                    ["bay", "sea"],
                    0.15,
                    0.01
                ],
                "text-max-width": [
                    "match",
                    ["get", "class"],
                    "ocean",
                    4,
                    "sea",
                    5,
                    ["bay", "water"],
                    7,
                    10
                ]
            },
            "paint": {
                "text-color": "hsl(196, 80%, 70%)",
                "text-halo-color": "hsl(0, 0%, 17%)",
                "text-halo-width": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    14,
                    1.25,
                    15,
                    1.5
                ]
            }
        },
        {
            "id": "poi-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "poi_label",
            "minzoom": 6,
            "filter": [
                "<=",
                ["get", "filterrank"],
                ["+", ["step", ["zoom"], 0, 16, 1, 17, 2], 3]
            ],
            "layout": {
                "text-size": [
                    "step",
                    ["zoom"],
                    ["step", ["get", "sizerank"], 18, 5, 12],
                    17,
                    ["step", ["get", "sizerank"], 18, 13, 12]
                ],
                "icon-image": [
                    "step",
                    ["zoom"],
                    ["concat", ["get", "maki"], "-11"],
                    15,
                    ["concat", ["get", "maki"], "-15"]
                ],
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-offset": [
                    "step",
                    ["zoom"],
                    [
                        "step",
                        ["get", "sizerank"],
                        ["literal", [0, 0]],
                        5,
                        ["literal", [0, 0.75]]
                    ],
                    17,
                    [
                        "step",
                        ["get", "sizerank"],
                        ["literal", [0, 0]],
                        13,
                        ["literal", [0, 0.75]]
                    ]
                ],
                "text-anchor": [
                    "step",
                    ["zoom"],
                    ["step", ["get", "sizerank"], "center", 5, "top"],
                    17,
                    ["step", ["get", "sizerank"], "center", 13, "top"]
                ],
                "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]]
            },
            "paint": {
                "icon-opacity": [
                    "step",
                    ["zoom"],
                    ["step", ["get", "sizerank"], 0, 5, 1],
                    17,
                    ["step", ["get", "sizerank"], 0, 13, 1]
                ],
                "text-halo-color": "hsl(0, 0%, 17%)",
                "text-color": [
                    "match",
                    ["get", "class"],
                    ["park_like"],
                    "hsl(95, 75%, 72%)",
                    "hsl(0, 0%, 100%)"
                ],
                "text-halo-blur": 0.5,
                "text-halo-width": [
                    "step",
                    ["zoom"],
                    ["step", ["get", "sizerank"], 1, 5, 1.5],
                    17,
                    ["step", ["get", "sizerank"], 1.25, 13, 1.5]
                ]
            }
        },
        {
            "id": "transit-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "transit_stop_label",
            "minzoom": 12,
            "filter": [
                "step",
                ["zoom"],
                [
                    "all",
                    [
                        "match",
                        ["get", "mode"],
                        ["rail", "metro_rail"],
                        true,
                        false
                    ],
                    ["!=", ["get", "stop_type"], "entrance"]
                ],
                15,
                [
                    "all",
                    [
                        "match",
                        ["get", "mode"],
                        ["rail", "metro_rail", "ferry", "light_rail"],
                        true,
                        false
                    ],
                    ["!=", ["get", "stop_type"], "entrance"]
                ],
                16,
                [
                    "all",
                    ["!=", ["get", "mode"], "bus"],
                    ["!=", ["get", "stop_type"], "entrance"]
                ],
                17,
                ["!=", ["get", "stop_type"], "entrance"],
                19,
                true
            ],
            "layout": {
                "text-size": 12,
                "icon-image": ["get", "network"],
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-justify": [
                    "match",
                    ["get", "stop_type"],
                    "entrance",
                    "left",
                    "center"
                ],
                "text-offset": [
                    "match",
                    ["get", "stop_type"],
                    "entrance",
                    ["literal", [1, 0]],
                    ["literal", [0, 0.8]]
                ],
                "text-anchor": [
                    "match",
                    ["get", "stop_type"],
                    "entrance",
                    "left",
                    "top"
                ],
                "text-field": [
                    "step",
                    ["zoom"],
                    "",
                    14,
                    [
                        "match",
                        ["get", "mode"],
                        ["rail", "metro_rail"],
                        ["coalesce", ["get", "name_en"], ["get", "name"]],
                        ""
                    ],
                    16,
                    [
                        "match",
                        ["get", "mode"],
                        ["bus", "bicycle"],
                        "",
                        ["coalesce", ["get", "name_en"], ["get", "name"]]
                    ],
                    18,
                    ["coalesce", ["get", "name_en"], ["get", "name"]]
                ],
                "text-letter-spacing": 0.01,
                "text-max-width": [
                    "match",
                    ["get", "stop_type"],
                    "entrance",
                    15,
                    9
                ]
            },
            "paint": {
                "text-halo-color": "hsl(0, 0%, 17%)",
                "text-color": "hsl(0, 0%, 100%)",
                "text-halo-width": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    14,
                    1.25,
                    15,
                    1.5
                ]
            }
        },
        {
            "id": "airport-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "airport_label",
            "minzoom": 8,
            "layout": {
                "text-line-height": 1.1,
                "text-size": ["step", ["get", "sizerank"], 18, 9, 12],
                "icon-image": [
                    "step",
                    ["get", "sizerank"],
                    ["concat", ["get", "maki"], "-15"],
                    9,
                    ["concat", ["get", "maki"], "-11"]
                ],
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-offset": [0, 0.75],
                "text-rotation-alignment": "viewport",
                "text-anchor": "top",
                "text-field": [
                    "step",
                    ["get", "sizerank"],
                    ["coalesce", ["get", "name_en"], ["get", "name"]],
                    15,
                    ["get", "ref"]
                ],
                "text-letter-spacing": 0.01,
                "text-max-width": 9
            },
            "paint": {
                "text-color": "hsl(0, 0%, 100%)",
                "text-halo-color": "hsl(0, 0%, 17%)",
                "text-halo-width": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    14,
                    1.25,
                    15,
                    1.5
                ]
            }
        },
        {
            "id": "settlement-subdivision-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "place_label",
            "minzoom": 10,
            "maxzoom": 15,
            "filter": [
                "all",
                ["==", ["get", "class"], "settlement_subdivision"],
                ["<=", ["get", "filterrank"], 4]
            ],
            "layout": {
                "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]],
                "text-transform": "uppercase",
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-letter-spacing": [
                    "match",
                    ["get", "type"],
                    "suburb",
                    0.15,
                    ["quarter", "neighborhood"],
                    0.1,
                    0.1
                ],
                "text-max-width": 7,
                "text-padding": 3,
                "text-size": [
                    "interpolate",
                    ["cubic-bezier", 0.5, 0, 1, 1],
                    ["zoom"],
                    11,
                    [
                        "match",
                        ["get", "type"],
                        "suburb",
                        11,
                        ["quarter", "neighborhood"],
                        10.5,
                        10.5
                    ],
                    15,
                    [
                        "match",
                        ["get", "type"],
                        "suburb",
                        17,
                        ["quarter", "neighborhood"],
                        16,
                        16
                    ]
                ]
            },
            "paint": {
                "text-halo-color": "hsl(0, 0%, 17%)",
                "text-halo-width": 1,
                "text-color": "hsl(0, 0%, 100%)",
                "text-halo-blur": 0.5
            }
        },
        {
            "id": "settlement-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "place_label",
            "maxzoom": 15,
            "filter": [
                "all",
                ["<=", ["get", "filterrank"], 3],
                ["==", ["get", "class"], "settlement"],
                [
                    "step",
                    ["zoom"],
                    true,
                    13,
                    [">=", ["get", "symbolrank"], 11],
                    14,
                    [">=", ["get", "symbolrank"], 13]
                ]
            ],
            "layout": {
                "text-line-height": 1.1,
                "text-size": [
                    "interpolate",
                    ["cubic-bezier", 0.2, 0, 0.9, 1],
                    ["zoom"],
                    3,
                    [
                        "step",
                        ["get", "symbolrank"],
                        12,
                        9,
                        11,
                        10,
                        10.5,
                        12,
                        9.5,
                        14,
                        8.5,
                        16,
                        6.5,
                        17,
                        4
                    ],
                    15,
                    [
                        "step",
                        ["get", "symbolrank"],
                        28,
                        9,
                        26,
                        10,
                        23,
                        11,
                        21,
                        12,
                        20,
                        13,
                        19,
                        15,
                        17
                    ]
                ],
                "icon-image": [
                    "case",
                    ["==", ["get", "capital"], 2],
                    "border-dot-13",
                    [
                        "step",
                        ["get", "symbolrank"],
                        "dot-11",
                        9,
                        "dot-10",
                        11,
                        "dot-9"
                    ]
                ],
                "text-font": [
                    "step",
                    ["zoom"],
                    [
                        "literal",
                        ["DIN Offc Pro Regular", "Arial Unicode MS Regular"]
                    ],
                    8,
                    [
                        "step",
                        ["get", "symbolrank"],
                        [
                            "literal",
                            ["DIN Offc Pro Medium", "Arial Unicode MS Regular"]
                        ],
                        11,
                        [
                            "literal",
                            ["DIN Offc Pro Regular", "Arial Unicode MS Regular"]
                        ]
                    ],
                    10,
                    [
                        "step",
                        ["get", "symbolrank"],
                        [
                            "literal",
                            ["DIN Offc Pro Medium", "Arial Unicode MS Regular"]
                        ],
                        12,
                        [
                            "literal",
                            ["DIN Offc Pro Regular", "Arial Unicode MS Regular"]
                        ]
                    ],
                    11,
                    [
                        "step",
                        ["get", "symbolrank"],
                        [
                            "literal",
                            ["DIN Offc Pro Medium", "Arial Unicode MS Regular"]
                        ],
                        13,
                        [
                            "literal",
                            ["DIN Offc Pro Regular", "Arial Unicode MS Regular"]
                        ]
                    ],
                    12,
                    [
                        "step",
                        ["get", "symbolrank"],
                        [
                            "literal",
                            ["DIN Offc Pro Medium", "Arial Unicode MS Regular"]
                        ],
                        15,
                        [
                            "literal",
                            ["DIN Offc Pro Regular", "Arial Unicode MS Regular"]
                        ]
                    ],
                    13,
                    [
                        "literal",
                        ["DIN Offc Pro Medium", "Arial Unicode MS Regular"]
                    ]
                ],
                "text-justify": [
                    "step",
                    ["zoom"],
                    [
                        "match",
                        ["get", "text_anchor"],
                        ["bottom", "top"],
                        "center",
                        ["left", "bottom-left", "top-left"],
                        "left",
                        ["right", "bottom-right", "top-right"],
                        "right",
                        "center"
                    ],
                    8,
                    "center"
                ],
                "text-offset": [
                    "step",
                    ["zoom"],
                    [
                        "match",
                        ["get", "capital"],
                        2,
                        [
                            "match",
                            ["get", "text_anchor"],
                            "bottom",
                            ["literal", [0, -0.3]],
                            "bottom-left",
                            ["literal", [0.3, -0.1]],
                            "left",
                            ["literal", [0.45, 0.1]],
                            "top-left",
                            ["literal", [0.3, 0.1]],
                            "top",
                            ["literal", [0, 0.3]],
                            "top-right",
                            ["literal", [-0.3, 0.1]],
                            "right",
                            ["literal", [-0.45, 0]],
                            "bottom-right",
                            ["literal", [-0.3, -0.1]],
                            ["literal", [0, -0.3]]
                        ],
                        [
                            "match",
                            ["get", "text_anchor"],
                            "bottom",
                            ["literal", [0, -0.25]],
                            "bottom-left",
                            ["literal", [0.2, -0.05]],
                            "left",
                            ["literal", [0.4, 0.05]],
                            "top-left",
                            ["literal", [0.2, 0.05]],
                            "top",
                            ["literal", [0, 0.25]],
                            "top-right",
                            ["literal", [-0.2, 0.05]],
                            "right",
                            ["literal", [-0.4, 0.05]],
                            "bottom-right",
                            ["literal", [-0.2, -0.05]],
                            ["literal", [0, -0.25]]
                        ]
                    ],
                    8,
                    ["literal", [0, 0]]
                ],
                "text-anchor": [
                    "step",
                    ["zoom"],
                    ["get", "text_anchor"],
                    8,
                    "center"
                ],
                "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]],
                "text-max-width": 7
            },
            "paint": {
                "text-color": "hsl(0, 0%, 100%)",
                "text-halo-color": "hsl(0, 0%, 17%)",
                "text-halo-width": 1,
                "icon-opacity": ["step", ["zoom"], 1, 8, 0],
                "text-halo-blur": 1
            }
        },
        {
            "id": "state-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "place_label",
            "minzoom": 3,
            "maxzoom": 9,
            "filter": ["==", ["get", "class"], "state"],
            "layout": {
                "text-size": [
                    "interpolate",
                    ["cubic-bezier", 0.85, 0.7, 0.65, 1],
                    ["zoom"],
                    4,
                    ["step", ["get", "symbolrank"], 10, 6, 9.5, 7, 9],
                    9,
                    ["step", ["get", "symbolrank"], 24, 6, 18, 7, 14]
                ],
                "text-transform": "uppercase",
                "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
                "text-field": [
                    "step",
                    ["zoom"],
                    [
                        "step",
                        ["get", "symbolrank"],
                        ["coalesce", ["get", "name_en"], ["get", "name"]],
                        5,
                        [
                            "coalesce",
                            ["get", "abbr"],
                            ["get", "name_en"],
                            ["get", "name"]
                        ]
                    ],
                    5,
                    ["coalesce", ["get", "name_en"], ["get", "name"]]
                ],
                "text-letter-spacing": 0.15,
                "text-max-width": 6
            },
            "paint": {
                "text-color": "hsl(0, 0%, 100%)",
                "text-halo-color": "hsl(0, 0%, 17%)",
                "text-halo-width": 1
            }
        },
        {
            "id": "country-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "place_label",
            "minzoom": 1,
            "maxzoom": 10,
            "filter": ["==", ["get", "class"], "country"],
            "layout": {
                "text-line-height": 1.1,
                "text-size": [
                    "interpolate",
                    ["cubic-bezier", 0.2, 0, 0.7, 1],
                    ["zoom"],
                    1,
                    ["step", ["get", "symbolrank"], 11, 4, 9, 5, 8],
                    9,
                    ["step", ["get", "symbolrank"], 28, 4, 22, 5, 21]
                ],
                "icon-image": "dot-11",
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-justify": [
                    "step",
                    ["zoom"],
                    [
                        "match",
                        ["get", "text_anchor"],
                        ["bottom", "top"],
                        "center",
                        ["left", "bottom-left", "top-left"],
                        "left",
                        ["right", "bottom-right", "top-right"],
                        "right",
                        "center"
                    ],
                    7,
                    "center"
                ],
                "text-offset": [
                    "step",
                    ["zoom"],
                    [
                        "match",
                        ["get", "text_anchor"],
                        "bottom",
                        ["literal", [0, -0.25]],
                        "bottom-left",
                        ["literal", [0.2, -0.05]],
                        "left",
                        ["literal", [0.4, 0.05]],
                        "top-left",
                        ["literal", [0.2, 0.05]],
                        "top",
                        ["literal", [0, 0.25]],
                        "top-right",
                        ["literal", [-0.2, 0.05]],
                        "right",
                        ["literal", [-0.4, 0.05]],
                        "bottom-right",
                        ["literal", [-0.2, -0.05]],
                        ["literal", [0, -0.25]]
                    ],
                    7,
                    ["literal", [0, 0]]
                ],
                "text-anchor": [
                    "step",
                    ["zoom"],
                    ["coalesce", ["get", "text_anchor"], "center"],
                    7,
                    "center"
                ],
                "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]],
                "text-max-width": 6
            },
            "paint": {
                "icon-opacity": [
                    "step",
                    ["zoom"],
                    ["case", ["has", "text_anchor"], 1, 0],
                    7,
                    0
                ],
                "text-color": "hsl(0, 0%, 100%)",
                "text-halo-color": [
                    "interpolate",
                    ["exponential", 1],
                    ["zoom"],
                    0,
                    "hsl(224, 2%, 18%)",
                    4,
                    "hsl(224, 1%, 12%)",
                    8,
                    "hsl(224, 1%, 2%)"
                ],
                "text-halo-width": 1.25
            }
        },        
    ],
};

const options: MapboxOptions = {
    container: '',
    center: [-106.5521572, 36.6989067], // tierra amarilla, nm
    zoom: 16,
    style,
};


export default options;
