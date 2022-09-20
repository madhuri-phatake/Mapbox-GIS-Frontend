import { defineNuxtConfig } from "nuxt";
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  css: ["mapbox-gl/dist/mapbox-gl.css", "v-mapbox/dist/v-mapbox.css"],

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
  build: {
    postcss: {
      postcssOptions: require('./postcss.config.js'),
    },
  }
})