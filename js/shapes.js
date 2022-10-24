import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import mapObj from './map'


export const lineSource = new VectorSource({ wrapX: false });
export const lineVector = new VectorLayer({
  source: lineSource,
  map: mapObj,
  style: new Style({
    stroke: new Stroke({
      color: "#fb6b90",
      width:4
    }),
  }),
});

export const markerSource = new VectorSource({ wrapX: false });
export const markerVector = new VectorLayer({
  source: markerSource,
  map: mapObj,
  style: new Style({
    image: new Icon({
      src: "/medium.png",
    }),
  }),
});

export const squareSource = new VectorSource({ wrapX: false });
export const squareVector = new VectorLayer({
  source: squareSource,
  map: mapObj,
  style: new Style({
    fill: new Fill({
      color: "rgb(255, 165, 0, 0.1)",
    }),
    stroke: new Stroke({
      color: "rgb(255, 165, 0)",
      width:4
    }),
  }),
});

export const polygonSource = new VectorSource({ wrapX: false });
export const polygonVector = new VectorLayer({
  source: polygonSource,
  map: mapObj,
  style: new Style({
    fill: new Fill({
      color: "rgba(255,0,0 ,0.2)",
    }),
    stroke: new Stroke({
      color: "red",
      width:4
    }),
  }),
});