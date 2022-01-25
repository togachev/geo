import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoidG9nYWNoZXYiLCJhIjoiY2pxdzkxNGppMDBqdTN4cjdneHZwMXYzYSJ9.dsqYTRrIFaX-d06mZlR1Cw';

var map = new mapboxgl.Map({
    'container': 'map',

    'zoom': 12,
    'center': [73.420349, 61.263342],
    'style': {
        'version': 8,
        'sources': {
            'openstreetmap': {
                'type': 'raster',
                'tiles': [
                    "http://127.0.0.1:81/tile/{z}/{x}/{y}.png",
                ],
                'tileSize': 256,
            },
            'postgis-tiles': {
                'type': 'vector',
                'tiles': [
                    "http://192.168.14.142/geo/api/v1/data/smoothed_border.mvt?tile={z}/{x}/{y}"
                ]
            }

        },
        'layers': [
            {
                'id': 'openstreetmap-layer',
                'type': 'raster',
                'source': 'openstreetmap',
                'minzoom': 0,
                'maxzoom': 22
            },
            {
                'id': 'postgis-tiles-layer',
                'type': 'fill',
                'source': 'postgis-tiles',
                'source-layer': 'default',
                'minzoom': 0,
                'maxzoom': 22,
                'paint': {
                  'fill-color': '#FFFBD9',
                  'fill-opacity': 0.2
              },
            },
            {
                'id': 'postgis-tiles-layer-stroke',
                'type': 'line',
                'source': 'postgis-tiles',
                'source-layer': 'default',
                'minzoom': 0,
                'maxzoom': 22,
                'paint': {
                    'line-width': 0.5,
                    'line-color': 'red',
                    'line-opacity': 1,
                },
            }
        ]
    }
});
map.on('click', 'postgis-tiles-layer', (e) => {
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('Площадь: ' + e.features[0].properties.area + '<br>' + 'Координаты: ' + Number((e.lngLat.lng).toFixed(6)) + ', ' + Number((e.lngLat.lat).toFixed(6)))
    .addTo(map);
});

// Change the cursor to a pointer when
// the mouse is over the states layer.
map.on('mouseenter', 'postgis-tiles-layer', () => {
map.getCanvas().style.cursor = 'pointer';
});

// Change the cursor back to a pointer
// when it leaves the states layer.
map.on('mouseleave', 'postgis-tiles-layer', () => {
map.getCanvas().style.cursor = '';
});
map.addControl(new mapboxgl.NavigationControl());
const scale = new mapboxgl.ScaleControl({
maxWidth: 100,
unit: 'imperial'
});
map.addControl(scale);
map.scrollZoom.setWheelZoomRate(1);
scale.setUnit('metric');