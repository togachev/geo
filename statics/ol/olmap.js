import 'ol/ol.css';
import Feature from 'ol/Feature';
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

import {pointerMove} from 'ol/events/condition';

const container = document.getElementById('geo-popup');
const content = document.getElementById('geo-popup-content');
const coords_data = document.getElementById('geo-popup-coords_data');
const closer = document.getElementById('geo-popup-closer');
const name_popup = document.getElementById('geo-popup-name-popup');

const overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
  duration: 250,
  },
});

const attributions = '© <a href="https://www.openstreetmap.org/copyright">' + 'OpenStreetMap contributors</a>';

// lookup for selection objects


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
        anchor: [0.5, 0.5],
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

const selectedCountry = new Style({
  stroke: new Stroke({
    color: 'rgba(245,121,0,1)',
    width: 2,
  }),
  fill: new Fill({
    color: 'rgba(245,121,0,0.1)',
  }),
  image: new Circle({
    radius: 5,
    fill: new Fill({
      color: 'black',
    }),
    stroke: new Stroke({
      color: 'rgba(16,106,144,0.5)',
      width: 10
    })
  })
});

const vtLayer = [];

for(let i in layer_id) {
  vtLayer.push(
    new VectorTileLayer({
      declutter: true,
      minZoom: minzoom[i],
      maxZoom: maxzoom[i],
      minResolution: 0,
      maxResolution: 10000,
      renderBuffer: 50,
      renderMode: 'vector',
      updateWhileAnimating: false,
      source: new VectorTileSource({
        format: new MVT({
          featureClass: Feature,
        }),
        url: 'http://192.168.14.142/geo/layer/' + layer_id[i] + '/tile/{z}/{x}/{y}',
      }),
      style: styles,
    })
  );
}

const base_map = new TileLayer({
  source: new XYZ({
    attributions: attributions,
    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }),
});

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
    multiWorld: true,
  }),
});

var res_id = 0;
const selectionLayer = new VectorTileLayer({
  declutter: true,
  map: map,
  renderBuffer: 50,
  renderMode: 'vector',
  updateWhileAnimating: false,
  source: vtLayer[res_id].getSource(),
  style: function (feature) {
    if (feature.get('id') in selection) {
      return selectedCountry;
    }
  },
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


// Чувствительность идентификации
var hit = 5;

let selection = {};

var displayFeatureInfo = function(pixel, coordinate) {
  const coords = transform(coordinate, 'EPSG:3857','EPSG:4326');
  const latlon = '<tr><td>Lon-Lat: </td><td class="popup-text">' + coords[0].toFixed(6) + ', ' + coords[1].toFixed(6) + '</td></tr>';
  var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
    return feature;
  },
  {
    hitTolerance: hit,
  });

  if (feature) {
    name_popup.innerHTML = feature.getProperties().layer;
    content.innerHTML = feature.get('id');
    coords_data.innerHTML = latlon;
  } else {
    name_popup.innerHTML = null;
    content.innerHTML = null;
    coords_data.innerHTML = latlon;
  }

  if (feature) {
    for(let i in layer_id) {
      if (feature.getProperties().layer == layer_name[i]){
        var res_id = i;
      }
    }
  }

  if (feature) {
    var fid = feature.get('id');
    if (feature !== selection) {
      selection = {};
      selection[fid] = feature;
      selectionLayer.setSource(vtLayer[res_id].getSource());
      selectionLayer.changed();
      // console.log(feature, 'test1', fid, res_id, selection);
    }
  } else {
    selection = {};
    selectionLayer.changed();
    return;
  }
};


map.on('click', function(evt) {
  if ((evt.type === 'pointermove')) {
    return;
  }
  displayFeatureInfo(evt.pixel, evt.coordinate);

  let pos = '';
  overlay.setPosition([pos[0], (pos[3]-pos[1])/2]);
  closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  }

});