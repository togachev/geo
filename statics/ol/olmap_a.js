import Map from 'ol/Map.js';
import View from 'ol/View.js';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import {Fill, Stroke, Style} from 'ol/style.js';

// lookup for selection objects
var selection = {};
// feature property to act as identifier
var idProp = 'iso_a3';

var vtLayer = new VectorTileLayer({
  declutter: true,
  renderMode: 'vector',
  source: new VectorTileSource({
    format: new MVT(),
    url: 'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/' +
      'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf'
  }),
  style: function(feature) {
    var selected = !!selection[feature.get(idProp)];
    return new Style({
      stroke: new Stroke({
        color: selected ? 'rgba(200,20,20,0.8)' : 'gray',
        width: selected ? 2 : 1
      }),
      fill: new Fill({
        color: selected ? 'rgba(200,20,20,0.2)' : 'rgba(20,20,20,0.9)'
      })
    });
  }
});

var map = new Map({
  layers: [
    vtLayer
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

var selectElement = document.getElementById('type');

map.on('click', function(event) {
  var features = map.getFeaturesAtPixel(event.pixel);
  if (!features) {
    selection = {};
    // force redraw of layer style
    vtLayer.setStyle(vtLayer.getStyle());
    return;
  }
  var feature = features[0];
  var fid = feature.get(idProp);

  // if (selectElement.value === 'singleselect') {
    selection = {};
  // }
  // add selected feature to lookup
  selection[fid] = feature;

  // force redraw of layer style
  vtLayer.setStyle(vtLayer.getStyle());
});