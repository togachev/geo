import 'ol/ol.css';
import MVT from 'ol/format/MVT';
import Map from 'ol/Map';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import TileLayer from 'ol/layer/WebGLTile';
import { MouseWheelZoom, defaults } from "ol/interaction";
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import {Circle, Fill, Stroke, Style, Text} from 'ol/style';
import {fromLonLat, transform} from 'ol/proj';
import Overlay from 'ol/Overlay';
import {ZoomToExtent, ScaleLine, defaults as defaultControls} from 'ol/control';

const container = document.getElementById('geo-popup');
const content = document.getElementById('geo-popup-content');
const closer = document.getElementById('geo-popup-closer');
const name_popup = document.getElementById('geo-popup-name-popup');

const overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
  duration: 250,
  },
});

const attributions = '© <a href="https://www.openstreetmap.org/copyright">' +
'OpenStreetMap contributors</a>';

// lookup for selection objects
let selection = {};

const styles = (feature) => {
  const data = feature.getProperties();
  var keys = ['les', 'uch_les', 'uroch', 'kvartal', 'vydel', 'term_p_num']; //поля-подписи
  var labels = "";

  for(let i in keys) {
    if (typeof data[keys[i]] == 'string') {
      if (data[keys[i]].length > 0) {
        labels += `${data[keys[i]]}\n`;
      }
    } else if (typeof data[keys[i]] === 'number') {
      labels += `${data[keys[i]]}\n`;
    } 
  }

  return [
    new Style({
      stroke: new Stroke({
        color: 'rgba(255, 0, 0, 1)',
        width: 0.5,
        }),
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.5)',
      }),
    }),
    new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({
          color: 'black',
        }),
        stroke: new Stroke({
            color: 'rgba(255,0,0,0.9)',
            width: 1
        })
    })
  }),
    new Style({
      text: new Text({
        text: labels,
        font: '12px Calibri,sans-serif',
        overflow: true,
        fill: new Fill({
          color: '#000',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 3,
        }),
      }),
    })
  ]
};

const selectedCountry = new Style({
  stroke: new Stroke({
    color: 'rgba(200,20,20,0.8)',
    width: 2,
  }),
  fill: new Fill({
    color: 'rgba(200,20,20,0.4)',
  }),
});

const vtLayer = [];
for(let i in layer_id) {
  vtLayer.push(new VectorTileLayer({
  declutter: true,
  minZoom: minzoom[i],
  maxZoom: maxzoom[i],
  renderBuffer: 50,
  renderMode: 'hybrid',
  updateWhileAnimating: false,
  source: new VectorTileSource({
    format: new MVT({
    }),
    url:
        'http://192.168.14.142/geo/layer/' + layer_id[i] + '/tile/{z}/{x}/{y}',
  }),
  style: styles,
}));
}



const base_map = [new TileLayer({
  source: new XYZ({
    attributions: attributions,
    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }),
})];



const map = new Map({
  interactions: defaults({mouseWheelZoom: false}).extend([
    new MouseWheelZoom({
      constrainResolution: true // force zooming to a integer zoom
    })
  ]),
  controls: defaultControls().extend([
    new ScaleLine(),
  ]),
  renderer: 'webgl',
  layers: [].concat(base_map, vtLayer),
  overlays: [overlay],
  moveTolerance: 10,
  target: 'map',
  view: new View({
    center: fromLonLat([70.538086, 62.201629]),
    enableRotation: false,
    zoom: 6,
  }),
});

var extent = map.getView().calculateExtent(map.getSize());
const span = document.createElement('span');
span.innerHTML = house_fill;
const zoomToExtentControl = new ZoomToExtent({
  extent: extent,
  label: span
});

map.addControl(zoomToExtentControl);

// Selection

const selectionLayer = new VectorTileLayer({
  map: map,
  renderMode: 'vector',
  source: vtLayer.getSource(),
  style: function (feature) {
    if (feature.getId() in selection) {
      return selectedCountry;
    }
  },
});



const selectElement = document.getElementById('type');

map.on(['click', 'pointermove'], function (event) {
  if (
    (selectElement.value === 'singleselect-hover' &&
      event.type !== 'pointermove') ||
    (selectElement.value !== 'singleselect-hover' &&
      event.type === 'pointermove')
  ) {
    return;
  }
  vtLayer.getFeatures(event.pixel).then(function (features) {
    if (!features.length) {
      selection = {};
      selectionLayer.changed();
      return;
    }
    const feature = features[0];
    if (!feature) {
      return;
    }
    const fid = feature.getId();

    if (selectElement.value.indexOf('singleselect') === 0) {
      selection = {};
    }
    // add selected feature to lookup
    selection[fid] = feature;

    selectionLayer.changed();
  });
});


