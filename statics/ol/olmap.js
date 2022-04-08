import 'ol/ol.css';
import Feature from 'ol/Feature';
import MVT from 'ol/format/MVT';
import Map from 'ol/Map';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
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

const container = document.getElementById('geo-popup');
container.style.display = (container.style.display == 'block') ? 'none' : 'block';
const content = document.getElementById('geo-popup-content');
const coords_data = document.getElementById('geo-popup-coords_data');
const closer_popup = document.getElementById('geo-popup-closer');
const name_p = document.getElementById('geo-name-popup');
const name_popup = document.getElementById('geo-popup-name-popup');


const LPanel = document.getElementById('geo-layer-panel');
const nameLPanel = document.getElementById('geo-layer-name-panel');
const contentLPanel = document.getElementById('geo-layer');
const closerLPanel = document.getElementById('geo-layer-closer');


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
  fill: new Fill({
    color: 'rgba(255,203,153,0)',
  }),
  image: new Circle({
    radius: 7,
    fill: new Fill({
      color: 'rgba(255,255,0,0.5)',
    }),
    stroke: new Stroke({
      color: 'rgba(255,255,0,1)',
      width: 2
    })
  })
});

var vtLayer = [];

for(let i in layer_id) {
  vtLayer.push(
    new VectorTileLayer({
      declutter: true,
      minZoom: minzoom[i],
      maxZoom: maxzoom[i],
      renderBuffer: 10,
      renderMode: 'vector',
      preload: 0,
      useInterimTilesOnError: false,
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

// https://basemaps.arcgis.com/arcgis/rest/services/OpenStreetMap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf
// https://www.arcgis.com/sharing/rest/content/items/3e1a00aeae81496587988075fe529f71/resources/styles/root.json?f=pjson

const base_map = new TileLayer({
  source: new OSM(),
});

var layer_list = '<table class="popup-text-all">';
for(let i in layer_id) {
  layer_list += '<tr><td>' + i + '</td><td class="popup-text">' + layer_name[i] + '</td></tr>';
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
    

  });

  closerLPanel.addEventListener('click', e => {
    LPanel.style.display = 'none';
  });

  return control;
}

const attribution = new Attribution({
  collapsible: false,
});

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
  layers: [].concat(base_map, vtLayer),
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

const ScaleLineControl = new ScaleLine({
  units: 'metric',
  // bar: true,
  steps: 2,
  // text: true,
  // minWidth: 100,
  dpi: 96,
});



// function mapRatioScale({ map, toRound = true }) {
//   var dpi = 96;
//   var units = map.getView().getProjection().getUnits();
//   var mpu = METERS_PER_UNIT[units];
//   var INCHES_PER_METRE = 39.3701;
//   let scale = map.getView().getResolution()*(mpu * INCHES_PER_METRE * dpi);
//   return toRound ? Math.round(scale) : scale;
// }

map.addControl(zoomToExtentControl);
map.addControl(ScaleLineControl);


// Selection
// Чувствительность идентификации
var hit = 10;

let selection = {};

var displayFeatureInfo = function(pixel, coordinate) {

  // const scale = mapRatioScale({ map });
  // console.log(scale);
  container.style.display = 'block';
  const coords = transform(coordinate, 'EPSG:3857','EPSG:4326');
  const latlon = '<td class="popup-text">' + coords[0].toFixed(6) + ', ' + coords[1].toFixed(6) + '</td></tr>';
  var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
    return feature;
  },
  {
    hitTolerance: hit,
  });
  
  if (feature) {
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
    name_popup.innerHTML = feature.getProperties().layer;
    
    content.innerHTML = attribute;
    coords_data.innerHTML = latlon;
    LPanel.style.display = 'none';

    for(let i in layer_id) {
      if (feature.getProperties().layer == layer_name[i]){
        var res_id = i;
      }
    }

    var fid = feature.get('id');
    if (feature !== selection) {
      selection = {};
      selection[fid] = feature;
      selectionLayer.setSource(vtLayer[res_id].getSource());
      selectionLayer.changed();
    }


  } 
  else {
    name_popup.innerHTML = 'Координаты';
    content.style.display = 'none';
    coords_data.innerHTML = latlon;

    LPanel.style.display = 'none';
    selection = {};
    selectionLayer.changed();
    return;
  }

  // if (feature) {
  //   for(let i in layer_id) {
  //     if (feature.getProperties().layer == layer_name[i]){
  //       var res_id = i;
  //     }
  //   }
  // }

  // if (feature) {
    
  //   var fid = feature.get('id');
  //   if (feature !== selection) {
  //     selection = {};
  //     selection[fid] = feature;
  //     selectionLayer.setSource(vtLayer[res_id].getSource());
  //     selectionLayer.changed();
  //   }
  // } else {
    
  //   LPanel.style.display = 'none';
  //   selection = {};
  //   selectionLayer.changed();
  //   return;
  // }
};

map.on('click', function(evt) {
  let test = map.getFeaturesAtPixel(evt.pixel, function(feature) {
    // для нескольких слоев!
    return feature;
  });
  console.log(test);
  if ((evt.type === 'pointermove')) {
    return;
  }
  displayFeatureInfo(evt.pixel, evt.coordinate);
  
  let pos = '';

  overlay.setPosition([pos[0], (pos[3]-pos[1])/2]);
  closer_popup.onclick = function () {
    overlay.setPosition(undefined);
    selection = {};
    selectionLayer.changed();
    closer_popup.blur();
    return false;
  }
},
{
  hitTolerance: hit,
});


