import "./style.css";
import mapObj from "./js/map";
import Draw, { createBox } from "ol/interaction/Draw";
import {
  lineSource,
  lineVector,
  squareSource,
  squareVector,
  polygonSource,
  polygonVector,
  markerSource,
  markerVector,
} from "./js/shapes";
import { Feature } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import KML from "ol/format/KML";
import TopoJSON from "ol/format/TopoJSON";
import {
  downloadKml,
  downloadgeoJson,
  downloadtopoJson,
} from "./js/downloader";

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

window.source = markerSource;

const shapes = document.querySelector("#shapes");
let lineDraw, markerDraw, squareDraw, polygonDraw;

shapes.addEventListener("change", (e) => {
  mapObj.removeInteraction(lineDraw);
  mapObj.removeInteraction(markerDraw);
  mapObj.removeInteraction(squareDraw);
  mapObj.removeInteraction(polygonDraw);
  let type = e.target.value;

  switch (type) {
    case "line":
      type = "LineString";

      lineDraw = new Draw({
        source: lineSource,
        type: type,
        stopClick: false,
      });
      mapObj.addInteraction(lineDraw);

      lineDraw.on("drawend", (e) => {
        lineDraw.setActive(false);
      });

      break;
    case "square":
      type = "Circle";

      squareDraw = new Draw({
        source: squareSource,
        type: type,
        stopClick: false,
        geometryFunction: createBox(),
      });
      mapObj.addInteraction(squareDraw);

      squareDraw.on("drawend", (e) => {
        squareDraw.setActive(false);
      });

      break;

    case "polygon":
      type = "Polygon";
      polygonDraw = new Draw({
        source: polygonSource,
        type: type,
        stopClick: false,
      });

      mapObj.addInteraction(polygonDraw);
      polygonDraw.on("drawend", (e) => {
        polygonDraw.setActive(false);
      });
      break;

    case "point":
      type = "Point";
      markerDraw = new Draw({
        source: markerSource,
        type: type,
        stopClick: false,
      });
      mapObj.addInteraction(markerDraw);
      markerDraw.on("drawend", (e) => {
        markerDraw.setActive(false);
      });

      break;

    default:
      console.log(" Not in option ");
      break;
  }
});

// download data

const getKML = (features) => {
  const formatKml = new KML();
  const kml = formatKml.writeFeatures(features, {
    featureProjection: "EPSG:3857",
  });
  return kml;
};

const getGeoJson = (features) => {
  const formatGeojson = new GeoJSON();
  const geojson = formatGeojson.writeFeatures(features, {
    featureProjection: "EPSG:3857",
  });
  const parseJson = JSON.parse(geojson);
  const f = parseJson.features;
  for (const i of f) {
    i.properties = {};
  }
  return JSON.stringify(parseJson);
};

const getTopoJson = (features) => {
  const formattopojson = new TopoJSON();
  const topojson = formattopojson.writeFeatures(features);
  return topojson;
};

const getAllfeatures = (lineVal, squareVal, polygonVal, markerVal) => {
  let features = [];

  lineVal.forEach((l) => {
    features.push(l);
  });
  squareVal.forEach((l) => {
    features.push(l);
  });
  polygonVal.forEach((l) => {
    features.push(l);
  });
  markerVal.forEach((l) => {
    features.push(l);
  });

  return features;
};

const format = document.querySelector("#format");

format.addEventListener("change", (e) => {
  const lineVal = lineSource.getFeatures();
  const squareVal = squareSource.getFeatures();
  const polygonVal = polygonSource.getFeatures();
  const markerVal = markerSource.getFeatures();
  const allFeatures = getAllfeatures(lineVal, squareVal, polygonVal, markerVal);

  const value = e.target.value;
  switch (value) {
    case "kml":
      const kml = getKML(allFeatures);
      downloadKml(kml);
      break;

    case "topojson":
      const topojson = getTopoJson(allFeatures);
      console.log(topojson);
      // downloadtopoJson(topojson)
      break;

    case "geojson":
      const geojson = getGeoJson(allFeatures);
      downloadgeoJson(geojson);
      break;

    default:
      console.log("value error");
      break;
  }
});
