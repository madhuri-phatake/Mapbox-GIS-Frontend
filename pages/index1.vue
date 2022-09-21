<template>
  <main class="w-screen h-screen">
    <!-- <div id="map"></div> -->
    <v-map class="w-full h-full" :options="data.options" @loaded="onMapLoaded">
      <div id="menu">
        <select id="layer-change">
          <option
            id="satellite-v9"
            type="checkbox"
            name="rtoggle1"
            value="satellite-v9"
            checked="checked"
          >
            satellite
          </option>
          <option
            id="dark-v10"
            type="checkbox"
            name="rtoggle2"
            value="dark-v10"
          >
            dark
          </option>
          <option
            id="light-v10"
            type="checkbox"
            name="rtoggle3"
            value="light-v10"
          >
            light
          </option>
          <option
            id="streets-v11"
            type="checkbox"
            name="rtoggle4"
            value="streets-v11"
          >
            streets
          </option>
          <option
            id="outdoors-v11"
            type="checkbox"
            name="rtoggle5"
            value="outdoors-v11"
          >
            outdoors
          </option>
        </select>
      </div>
    </v-map>
  </main>
</template>
<script setup lang="ts">
import mapboxgl, { accessToken } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import VMap from "v-mapbox";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

// mapboxgl.accessToken =
//   "pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ";
const data = reactive({
  options: {
    accessToken:
      "pk.eyJ1IjoibWF5dXJ3YWtpa2FyIiwiYSI6ImNsNmdjdGxwbjBiNGMzY282bWh0dng2c2kifQ.y-m4-zQKOeOOnDG5I1u6ng",
    style: "mapbox://styles/mapbox/outdoors-v11",
    center: [-68.137343, 45.137451],
    zoom: 8,
    maxZoom: 22,
    crossSourceCollisions: false,
    failIfMajorPerformanceCaveat: false,
    attributionControl: false,
    preserveDrawingBuffer: true,
    hash: false,
    minPitch: 0,
    maxPitch: 60,
    container: "map",
  } as mapboxgl.MapboxOptions,
  map: {} as mapboxgl.Map,
});

let allStud = reactive({
  mapData: [],
});

allStud.mapData = await $fetch("http://localhost:3001/location/");
console.log("map data", allStud.mapData);
async function onMapLoaded(map: mapboxgl.Map) {
  data.map = map;
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ";
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  });
  //data.map.addControl(geocoder);

  // const layerToggle: any = document.getElementById("layer-change");
  // layerToggle.addEventListener("change", (event) => {
  //   console.log(event);
  //   map.setStyle("mapbox://styles/mapbox/" + event.target.value);
  // });

  //search box start
  // data.map.addControl(geocoder);
  data.map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    })
  );
  //search box end

  //   Marker Starts
  allStud.mapData.map((ele) => {
    new mapboxgl.Marker({
      draggable: true,
      color: "#" + (Math.random().toString(16) + "000000").substring(2, 8),
    })
      .setLngLat([ele.lat, ele.long])
      .addTo(map);
  });
  // Marker Ends

  //Polygon Add
  data.map.addSource("pune", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [73.68942260742188, 18.530398219358684],
            [73.65509033203125, 18.340187242207897],
            [73.99154663085938, 18.359739156553683],
            [73.99429321289062, 18.641040231399984],
            [73.68942260742188, 18.530398219358684],
          ],
        ],
      },
    },
  });
  //data.map.addSource("pune2", {
  //   type: "geojson",
  //   data: {
  //     type: "Feature",
  //     properties: {},
  //     geometry: {
  //       type: "LineString",
  //       coordinates: [
  //         // [
  //         [73.68942260742188, 18.530398219358684],
  //         [73.65509033203125, 18.340187242207897],
  //         [73.99154663085938, 18.359739156553683],
  //         [73.99429321289062, 18.641040231399984],
  //         [73.68942260742188, 18.530398219358684],
  //         // ],
  //       ],
  //     },
  //},
  //});
  //Polygon Ends

  //Draw Tool
  var Draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
      defaultMode: "draw_polygon",
    },
  });
  map.addControl(Draw, "top-left");
}
</script>
<style>
body {
  margin: 0;
  padding: 0;
}
/* #map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
} */
#menu {
  position: absolute;
  background: #efefef;
  padding: 10px;
  font-family: "Open Sans", sans-serif;
}
.w-screen {
  width: 100vw;
}
.h-screen {
  height: 100vh;
}
.h-full {
  height: 100%;
}
.w-full {
  width: 100%;
}
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
</style>
