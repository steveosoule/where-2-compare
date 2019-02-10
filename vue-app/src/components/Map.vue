<template>
  <section class="map">
    <GmapMap
      :center="{lat:10, lng:10}"
      :zoom="7"
      map-type-id="terrain"
    >
      <!-- <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      /> -->
    </GmapMap>
  </section>
</template>

<script>


/*

## Map Libraires:

- https://www.npmjs.com/package/vue2-google-maps
- https://developers.google.com/maps/documentation/javascript/tutorial
- https://github.com/KoRiGaN/Vue2Leaflet
- https://korigan.github.io/Vue2Leaflet/#/components/l-geo-json/
- https://github.com/Akryum/vue-googlemaps
- https://github.com/codynegri/US-City-GeoJSON/blob/master/us_cities.geojson
- https://catalog.data.gov/dataset?res_format=GeoJSON

## Google

- [Custom Search](https://developers.google.com/custom-search/v1/overview)
- [Places](https://developers.google.com/maps/documentation/javascript/places)
- [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
  - [GeoJSON Map](https://developers.google.com/maps/documentation/javascript/datalayer#load_geojson_)

- [Glassdoor](https://www.glassdoor.com/developer/index.htm)

*/

export default {
  name: 'map'
}
</script>


<style>

html, body, .app, .container, .map, .vue-map-container{
  width: 100%;
  height: 93vh;
  margin: 0;
  padding: 0;
  max-width: 100%;
}

</style>
