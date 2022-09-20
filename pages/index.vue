<template>
  <main class="w-screen h-screen">
    <!-- <div id="map"></div> -->
    <v-map class="w-full h-full" :options="state.map" @loaded="onMapLoaded">
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
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import VMap from "v-mapbox";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ";
const state = reactive({
  map: {
    container: "map",
    // accessToken:
    //   "pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ",
    style: "mapbox://styles/mapbox/streets-v11?optimize=true",
    center: [444.04931277036667, 26.266912177018096] as number[], //uses longitude, latitude
    zoom: 6,
    maxZoom: 22,
  },
});
let allStud = reactive({
  mapData: [],
});

allStud.mapData = await $fetch("http://localhost:3001/location/");
console.log("map data", allStud.mapData);
function onMapLoaded(map: mapboxgl.Map) {
  const layerToggle: any = document.getElementById("layer-change");
  layerToggle.addEventListener("change", (event) => {
    console.log(event);
    map.setStyle("mapbox://styles/mapbox/" + event.target.value);
  });

  //search box start
  map.addControl(
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
