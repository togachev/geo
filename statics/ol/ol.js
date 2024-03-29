import 'ol/ol.css';
import MVT from 'ol/format/MVT';
import Map from 'ol/Map';
import { MouseWheelZoom, defaults } from "ol/interaction";
import XYZ from 'ol/source/XYZ';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import TileLayer from 'ol/layer/WebGLTile';
import View from 'ol/View';
import {fromLonLat, transform} from 'ol/proj';
import Overlay from 'ol/Overlay';
import {ZoomToExtent, ScaleLine, defaults as defaultControls} from 'ol/control';

import {Circle, Fill, Stroke, Style, Text} from 'ol/style';

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
        color: 'rgba(0, 134, 255, 1)',
        width: 0.5,
        }),
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.8)',
      }),
    }),
    new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({
          color: 'black',
        }),
        stroke: new Stroke({
            color: 'rgba(0,134,255,0.9)',
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

const layers_data = [];
for(let i in layer_id) {
  layers_data.push(new VectorTileLayer({
    minZoom: minzoom[i],
    maxZoom: maxzoom[i],
    renderBuffer: 10,
    // renderMode: 'vector',
    updateWhileAnimating: false,
    source: new VectorTileSource({ 
      format: new MVT({
    }),
      url:
        '/geo/layer/' + layer_id[i] + '/tile/{z}/{x}/{y}',
    }),
    style: styles,
    declutter: true,
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
  layers: [].concat(base_map, layers_data),
  overlays: [overlay],
  moveTolerance: 10,
  target: 'map',
  view: new View({
    center: fromLonLat([70.538086, 62.201629]),
    enableRotation: false,
    zoom: 6,
  }),
});

// Чувствительность идентификации
var hit = 10;

map.on('singleclick', function(evt) {
  const coordinate = evt.coordinate;
  const coords = transform(coordinate, 'EPSG:3857','EPSG:4326');
  const latlon = '<tr><td>Lon-Lat: </td><td class="popup-text">' + coords[0].toFixed(6) + ', ' + coords[1].toFixed(6) + '</td></tr>';
  let html = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
    const data = feature.getProperties();
    var attribute = '<table class="popup-text-all">';
    const {layer, ...rest} = data;
    const newObj = Object.assign({}, {...rest});
    for(let key in newObj) {
      if (typeof data[key] == 'string') {
        if (data[key].length > 0) {
          attribute += '<tr><td>' + key + '</td><td class="popup-text">' + data[key] + '</td></tr>';
        }
      } else if (typeof data[key] === 'number') {
        attribute += '<tr><td>' + key + '</td><td class="popup-text">' + data[key] + '</td></tr>';
      }
    }
    attribute += latlon + '</table>';
    return attribute;
  },
  {
    hitTolerance: hit,
  })
  //название слоя для всплывающего окна
  let lname = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
    const data = feature.getProperties();
    return data.layer;
  },
  {
    hitTolerance: hit,
  })

  if (html) {
    name_popup.innerHTML = lname;
    content.innerHTML = html; 
  } else {
    name_popup.innerHTML = null;
    content.innerHTML = latlon;
  }
  
  let pos = '';
  overlay.setPosition([pos[0], (pos[3]-pos[1])/2]);
  closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };
});

var extent = map.getView().calculateExtent(map.getSize());
const span = document.createElement('span');
span.innerHTML = house_fill;
const zoomToExtentControl = new ZoomToExtent({
  extent: extent,
  label: span
});

map.addControl(zoomToExtentControl);

map.on('pointermove', function(evt) {
  map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel,
    {
      hitTolerance: hit,
    }
    ) ? 'pointer' : '';
});
