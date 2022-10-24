export function downloadKml(kml) {
  import("downloadjs")
    .then(({ default: props }) => props(kml, "data.kml", "text/xml"))
    .catch((error) => error);
}

export function downloadgeoJson(geojson) {
  import("downloadjs")
    .then(({ default: props }) => props(geojson, "data.geojson", "text/json"))
    .catch((error) => error);
}

export function downloadtopoJson(topojson) {
  import("downloadjs")
    .then(({ default: props }) =>
      props(topojson, "data.json", "text/json")
    )
    .catch((error) => error);
}
