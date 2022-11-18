import { Map, View } from "ol";
import { transform } from "ol/proj";
import { baseLayerGroup , sublayer1 , sublayer2, sublayer3 } from "./Layers";

const mapObj = new Map({
  target: "map",
  layers: [baseLayerGroup ,sublayer3 , sublayer2, sublayer1],
  controls:[],
  view: new View({
    center: transform(
      [77.6953125, 24.206889622398023],
      "EPSG:4326",
      "EPSG:3857"
    ),
    zoom: 6,
  }),
});

export default mapObj