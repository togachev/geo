import 'ol/ol.css';
import Feature from 'ol/Feature';
import MVT from 'ol/format/MVT';
import Map from 'ol/Map';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import TileLayer from 'ol/layer/WebGLTile';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import {Fill, Stroke, Style} from 'ol/style';
import {fromLonLat, transform} from 'ol/proj';

const country = new Style({
  stroke: new Stroke({
    color: 'gray',
    width: 1,
  }),
  fill: new Fill({
    color: '#106a9080',
  }),
});

const base_map = new TileLayer({
  source: new XYZ({
    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }),
});

const vtLayer = [];
for(let i in layer_id) {
    vtLayer.push(new VectorTileLayer({
        declutter: true,
        minZoom: minzoom[i],
        maxZoom: maxzoom[i],
        renderBuffer: 50,
        renderMode: 'vector',
        updateWhileAnimating: false,
        source: new VectorTileSource({
            format: new MVT({featureClass: Feature}),
            url:
                'http://192.168.14.142/geo/layer/' + layer_id[i] + '/tile/{z}/{x}/{y}',
        }),
        style: country,
    }));
}

const map = new Map({
    layers: [].concat(base_map, vtLayer),
    target: 'map',
    view: new View({
        center: fromLonLat([70.538086, 62.201629]),
        enableRotation: false,
        zoom: 6,
        multiWorld: true,
    }),
});