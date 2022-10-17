import TileLayer from "ol/layer/Tile";
import TileImage from "ol/source/TileImage";
import OSM from "ol/source/OSM";

export const base = new TileLayer({
  title: "Base map",
  name: "base",
  source: new OSM(),
  visible: true,
});

export const raster = new TileLayer({
  title: "Google Satellite",
  name: "raster",
  source: new TileImage({
    // url: import.meta.VITE_SATELLITE_MAP,
    url:"http://mt1.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga"
  }),
  visible: false,
});


