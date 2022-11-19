import TileLayer from "ol/layer/Tile";
// import Group from "ol/layer/group";
import TileImage from "ol/source/TileImage";
import OSM from "ol/source/OSM";
import TileWMS from "ol/source/TileWMS";


const base = new TileLayer({
  title: "Base map",
  name: "base",
  source: new OSM(),
  visible: true,
});

const raster = new TileLayer({
  title: "Google Satellite",
  name: "raster",
  source: new TileImage({
    url: import.meta.env.VITE_SATELLITE_MAP,
  
  }),
  visible: false,
});

export const baseLayerGroup = new ol.layer.Group({
  title: "Basemap",
  name: "Basemap",
  layers: [base, raster],
  visible: true,
});

export const sublayer1 = new TileLayer({
  title: "sublayer1",
  name: "sublayer1",
  source: new TileWMS({
    url: import.meta.env.VITE_MAP,
    serverType: "geoserver",
    params: {
      TILED: true,
      LAYERS: "odishasampad:Administrative Boundary",
    },
  }),
  visible: false,
});

export const sublayer2 = new TileLayer({
  title:"sublayer2",
  name:"sublayer2",
  source:new TileWMS({
    url:import.meta.env.VITE_BHUVAN,
    serverType:"geoserver",
    params:{
      TILED:true,
      LAYERS:"lulc:OR_LULC50K_0506",
    },
  }),
  visible:false
})


export const sublayer3 = new TileLayer({
  title:"sublayer3",
  name:"sublayer3",
  source:new TileWMS({
    url:import.meta.env.VITE_BHUVAN,
    serverType:"geoserver",
    params:{
      TILED:true,
      LAYERS:"wasteland:OR_WL50K_0809",
    },
  }),
  visible:false
})

