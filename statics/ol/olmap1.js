import 'ol/ol.css';
import Feature from 'ol/Feature';
import MVT from 'ol/format/MVT';
import Map from 'ol/Map';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import {Group as LayerGroup} from 'ol/layer';
import TileLayer from 'ol/layer/WebGLTile';
import { MouseWheelZoom, defaults } from "ol/interaction";
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import {Circle, Fill, Stroke, Style, Text} from 'ol/style';
import {fromLonLat, transform} from 'ol/proj';
import { METERS_PER_UNIT } from 'ol/proj/Units';
import Overlay from 'ol/Overlay';
import {Attribution, Control, ZoomToExtent, ScaleLine, defaults as defaultControls} from 'ol/control';

import {pointerMove} from 'ol/events/condition';

const container_selection = document.getElementById('selection_object');
const content_id = document.getElementById('selection_object_id');

const container = document.getElementById('geo-popup');
container.style.display = (container.style.display == 'block') ? 'none' : 'block';
const content = document.getElementById('geo-popup-content');
const coords_data = document.getElementById('geo-popup-coords_data');
const closer_popup = document.getElementById('geo-popup-closer');
const name_p = document.getElementById('geo-name-popup');
const name_popup = document.getElementById('geo-popup-name-popup');
const ObjList = document.getElementById('geo-obj-list');
const ObjSelectList = document.getElementById('geo-select-list');

const LPanel = document.getElementById('geo-layer-panel');
const nameLPanel = document.getElementById('geo-layer-name-panel');
const contentLPanel = document.getElementById('geo-layer');
const closerLPanel = document.getElementById('geo-layer-closer');

let selection = {};

var CLbutton = document.createElement('button');
CLbutton.className = 'button';
CLbutton.innerHTML = close_button;
closer_popup.appendChild(CLbutton);

const overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
  duration: 250,
  stopEvent: false,
  },
});

// const attributions = '© <a href="https://www.openstreetmap.org/copyright">' + 'OpenStreetMap contributors</a>';

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
        color: 'rgba(255, 255, 255, 0)',
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
          width: 2,
        }),
      }),
    })
  ]
};

const selectedCountry = new Style({
  stroke: new Stroke({
    color: 'rgba(255,255,0,1)',
    width: 1.5,
  }),
  image: new Circle({
    radius: 7,
    fill: new Fill({
      color: 'rgb(255,255,0)',
    }),
    stroke: new Stroke({
      color: 'rgba(255,255,0,1)',
      width: 2
    })
  }),
});

var vtLayer = [];

for(let i in layer_id) {
  vtLayer.push(
    new VectorTileLayer({
      declutter: true,
      minZoom: minzoom[i],
      maxZoom: maxzoom[i],
      renderBuffer: 200,
      renderOrder: null,
      renderMode: 'vector',
      preload: 0,
      useInterimTilesOnError: false,
      updateWhileAnimating: true,
      source: new VectorTileSource({
        format: new MVT({
          featureClass: Feature,
        }),
        url: '/geo/layer/' + layer_id[i] + '/tile/{z}/{x}/{y}',
      }),
      style: styles,
    })
  );
}

const base_map = new TileLayer({
  source: new OSM(),
});

const attribution = new Attribution({
  collapsible: false,
});

var layer_list = '<table class="popup-text-all">';
for(let i in layer_id) {
  layer_list += '<tr><td><td class="popup-text">' + layer_name[i] + '</td></tr>';
}
layer_list += '</table>';

function LayerPanelControl() {

  const button = document.createElement('button');
  button.innerHTML = layer_fill;

  const element = document.createElement('div');
  element.className = 'ol-layer-data ol-unselectable ol-control';
  element.appendChild(button);
  element.appendChild(LPanel);

  const control = new Control({element: element});

  const CLbutton = document.createElement('button');
  CLbutton.className = 'button';
  CLbutton.innerHTML = close_button;
  closerLPanel.appendChild(CLbutton);

  contentLPanel.innerHTML = layer_list;
  
  button.addEventListener('click', e => {
    container.style.display = (container.style.display == 'none') ? 'block' : 'none';
    console.log(LPanel.scrollHeight)
    LPanel.style.display = (LPanel.style.display == 'block') ? 'none' : 'block';
    LPanel.style.maxHeight = LPanel.scrollHeight + 'px';
    selection = {};
    selectionLayer.changed();
  });

  closerLPanel.addEventListener('click', e => {
    LPanel.style.display = 'none';
  });

  return control;
}

var map = new Map({
  interactions: defaults({mouseWheelZoom: false}).extend([
    new MouseWheelZoom({
      constrainResolution: true // force zooming to a integer zoom
    })
  ]),
  controls: defaultControls({attribution: false}).extend([
    new LayerPanelControl(),
    attribution,
  ]),
  renderer: 'webgl',
  // layers: [base_map],
  layers: [base_map, 
    new LayerGroup({layers: vtLayer})
  ],
  overlays: [overlay],
  moveTolerance: 10,
  target: 'map',
  loadTilesWhileAnimating: true,
  loadTilesWhileInteracting: true,
  view: new View({
    center: fromLonLat([70.538086, 62.201629]),
    // enableRotation: false,
    maxZoom: 18,
    zoom: 6,
    multiWorld: true,
  }),
});

function checkSize() {
  const small = map.getSize()[0] < 600;
  attribution.setCollapsible(small);
  attribution.setCollapsed(small);
}

window.addEventListener('resize', checkSize);
checkSize();

var extent = map.getView().calculateExtent(map.getSize());
const span = document.createElement('span');
span.innerHTML = house_fill;
const zoomToExtentControl = new ZoomToExtent({
  extent: extent,
  label: span
});

const ScaleLineControl = new ScaleLine({
  units: 'metric',
  // bar: true,
  steps: 2,
  // text: true,
  // minWidth: 100,
  dpi: 96,
});

map.addControl(zoomToExtentControl);
map.addControl(ScaleLineControl);

// Selection
// Чувствительность идентификации
var hit = 10;

var res_id;

const selectionLayer = new VectorTileLayer({
  map: map,
  declutter: true,
  renderOrder: null,
  renderBuffer: 200,
  renderMode: 'vector',
  preload: 0,
  useInterimTilesOnError: false,
  updateWhileAnimating: true
});

var selectionFeatureInfo = function(evt) {

  var features = map.getFeaturesAtPixel(evt.pixel, function(feature) {},
  {
    hitTolerance: hit,
  });
  var feature = features[0];
  
  popupData();
  
  document.getElementById("geo-select-list").addEventListener("change", SelectFeatureObj);

  function SelectFeatureObj(){
    const obj = JSON.parse(this.value);
    for(let i in layer_id) {
      if (obj.values_.layer == layer_name[i]){
        var res_id = i;
        const fiDD = obj.values_.id;
        console.log(fiDD, this.text);
        selection = {};
        selection[fiDD] = feature;
        selectionLayer.setSource(vtLayer[res_id].getSource());
        selectionLayer.setStyle(function (feature) {
          if (feature.get('id') in selection) {
            return selectedCountry;
          }
        });
        selectionLayer.changed();

        container.style.display = 'block';
        const coords = transform(evt.coordinate, 'EPSG:3857','EPSG:4326');
        const latlon = '<td class="popup-text">' + coords[0].toFixed(6) + ', ' + coords[1].toFixed(6) + '</td></tr>';
        coords_data.innerHTML = latlon;
        ObjList.style.display = 'block';
        // ObjSelectList.options.length = 0;
        // CreateOptionSelect();
    
        content.style.display = 'block';
        const data = obj.values_;
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
        attribute += '</table>';
        name_popup.innerHTML = data.layer;
        content.innerHTML = attribute;
        coords_data.innerHTML = latlon;
      }
    }
  }

  function popupData() {
    container.style.display = 'block';
    const coords = transform(evt.coordinate, 'EPSG:3857','EPSG:4326');
    const latlon = '<td class="popup-text">' + coords[0].toFixed(6) + ', ' + coords[1].toFixed(6) + '</td></tr>';

    if (!features.length){
      name_popup.innerHTML = 'Координаты';
      ObjList.style.display = 'none';
      content.style.display = 'none';
      coords_data.innerHTML = latlon;
  
      LPanel.style.display = 'none';
      selection = {};
      selectionLayer.changed();
      return;
    }
    
    if (features.length > 0) {
      ObjList.style.display = 'block';
      ObjSelectList.options.length = 0;
      CreateOptionSelect();

      content.style.display = 'block';
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
      attribute += '</table>';
      name_popup.innerHTML = data.layer;
      content.innerHTML = attribute;
      coords_data.innerHTML = latlon;
      SelectFeature();
    } 

  }

  function CreateOptionSelect() {
    for (let i of features) {
      ObjSelectList.options.add(new Option(i.getProperties().layer, JSON.stringify(i)));
    }
  }

  function SelectFeature(){
    for(let i in layer_id) {
      if (feature.getProperties().layer == layer_name[i]){
        var res_id = i;
        const fid = feature.get('id');
        // console.log(fid);

        selection = {};
        selection[fid] = feature;
        selectionLayer.setSource(vtLayer[res_id].getSource());
        selectionLayer.setStyle(function (feature) {
          if (feature.get('id') in selection) {
            return selectedCountry;
          }
        });
        selectionLayer.changed();
      }
    }
  }


};

map.on(['singleclick'], function(evt) {
  if ((evt.type === 'pointermove')) {
    return;
  }
  
  selectionFeatureInfo(evt);
  
  let pos = '';
  overlay.setPosition([pos[0], (pos[3]-pos[1])/2]);
  closer_popup.onclick = function () {
    overlay.setPosition(undefined);
    selection = {};
    selectionLayer.changed();
    closer_popup.blur();
    return false;
  }

});
