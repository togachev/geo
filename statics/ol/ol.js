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
import {shared} from 'ol/style/IconImageCache';
shared.setSize(800);

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

const overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
  duration: 10,
  },
});

const attributions = '© <a href="https://www.openstreetmap.org/copyright">' +
'OpenStreetMap contributors</a>';

const styles = (feature) => {
  const data = feature.getProperties();
  var keys = ['les', 'uch_les', 'uroch', 'kvartal', 'vydel'];
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
    renderBuffer: 0,
    // renderMode: 'hybrid',
    updateWhileAnimating: true,
    source: new VectorTileSource({ 
      format: new MVT({
    }),
      url:
        'http://192.168.14.142/geo/layer/' + layer_id[i] + '/tile/{z}/{x}/{y}',
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
  layers: [].concat(base_map, layers_data),
  overlays: [overlay],
  renderer: 'webgl',
  // moveTolerance: 10,
  target: 'map',
  view: new View({
    center: fromLonLat([70.538086, 62.201629]),
    enableRotation: false,
    zoom: 6,
  }),
});



map.on('click', function(evt) {
  const coordinate = evt.coordinate;
  const coords = transform(coordinate, 'EPSG:3857','EPSG:4326');
  const latlon = '<tr><td>coords: </td><td style = "word-break: break-all;">' + coords[0].toFixed(6) + ', ' + coords[1].toFixed(6) + '</td></tr>';
  let html = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
    const data = feature.getProperties();
    var attribute = '<table>';
    delete data.id;
    for(let key in data) {
      if (typeof data[key] == 'string') {
        if (data[key].length > 0) {
          attribute += `<tr><td>${key}</td><td style = "word-break: break-all;">${data[key]}</td></tr>`;
        }
      } else if (typeof data[key] === 'number') {
        attribute += `<tr><td>${key}</td><td style = "word-break: break-all;">${data[key]}</td></tr>`;
      }
    }
    attribute += latlon + '</table>';
    return attribute;
  })

  if (html) {
    container.style.display="block";
    content.innerHTML = html; 
  } else {
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
var zoom = document.createElement('span');
zoom.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16"><path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/></svg>';
const zoomToExtentControl = new ZoomToExtent({
  extent: extent,
  label: zoom
});

map.addControl(zoomToExtentControl);

map.on('pointermove', function(evt) {
  map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
});
