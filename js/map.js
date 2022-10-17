import { Map, View } from "ol";
import { transform } from "ol/proj";
import { raster, base } from "./Layers";

const mapObj = new Map({
  target: "map",
  layers: [base, raster],
  view: new View({
    center: transform(
      [77.6953125, 24.206889622398023],
      "EPSG:4326",
      "EPSG:3857"
    ),
    zoom: 6,
  }),
});

export default mapObj;
