import 'ol/ol.css';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';

var map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url:
          'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
          '?apikey=Your API key from http://www.thunderforest.com/docs/apikeys/ here',
      }),
    }) ],
  view: new View({
    center: [-472202, 7530279],
    zoom: 12,
  }),
});