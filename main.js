import "./style.css";
import mapObj from "./js/map";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Draw, { createBox } from "ol/interaction/Draw";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import GeoJSON from 'ol/format/GeoJSON'


// layer switcher
const layers = document.querySelector("#layers");

layers.addEventListener("change", (e) => {
  let value = e.target.value;
  mapObj.getLayers().array_.forEach((elm) => {
    const layerName = elm.get("name");
    elm.setVisible(layerName === value);
  });
});

// draw shapes

const styles = {
  Point: new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: "/marker.png",
    }),
  }),
  LineString: new Style({
    fill: new Fill({
      color: "lightred",
    }),
    stroke: new Stroke({
      color: "red",
    }),
  }),
};

const shapes = document.querySelector("#shapes");
let draw;
window.sourceInteraction = new VectorSource({format:GeoJSON, wrapX: false });
const styleFunction = (feature) => {
  console.log(styles[feature.getGeometry().getType()]);
};

window.vector = new VectorLayer({
  source: sourceInteraction,
  map: mapObj,
  style:new Style({
    fill: new Fill({
      color: 'rgba(255 , 0, 0, 0.1)',
    }),
    stroke: new Stroke({
      color: 'red',
    }),
  }),
});

shapes.addEventListener("change", (e) => {
  mapObj.removeInteraction(draw);
  let type = e.target.value;
  let geometryFunction;

  switch (type) {
    case "line":
      type = "LineString";
      break;
    case "square":
      type = "Circle";
      geometryFunction = createBox();

      break;

    case "polygon":
      type = "Polygon";
      break;

    case "point":
      type = "Point";
      break;

    default:
      console.log("");
      break;
  }

  if (geometryFunction === undefined) {
    draw = new Draw({
      source: sourceInteraction,
      type: type,
      stopClick: true,
      style:new Style({
        fill: new Fill({
          color: 'rgba(255 , 0, 0, 0.1)',
        }),
        stroke: new Stroke({
          color: 'red',
          width:"3px"
        }),
      }),
    })
  } else {
    draw = new Draw({
      source: sourceInteraction,
      type: type,
      geometryFunction: geometryFunction,
      stopClick: true,
      style:new Style({
        fill: new Fill({
          color: 'red',
        }),
        stroke: new Stroke({
          color: 'red',
        }),
      }),
    });
  }

  console.log(sourceInteraction.getFeatures());
  mapObj.addInteraction(draw);
});
