<template>
  <div id="app">
    <navbar/>
    <div class="container">
      <router-view :cities="cities"></router-view>
    </div>
  </div>
</template>

<script>
import config from './config';
import axios from 'axios';
import _ from 'lodash';

import Navbar from './components/Navbar';

export default {
  name: 'app',
  data () {
    return {
      loading: false,
      cities: []
    }
  },
  computed: {
    sample_cities: function(){
      return _.take(this.cities, 5);
    }
  },
  methods: {
    load_cities_from_api: function () {
      var self = this;
      var post_data = {}

      axios
        .post('https://where-2-compare.herokuapp.com/api/cities', post_data, config.AXIOS_CONFIG_JSON)
        .then(function (response) {
          self.loading = false
          self.cities = response.data.results
        })
    }
  },
  created () {
    this.load_cities_from_api()
  },
  components: { Navbar }
}
</script>

<style>
  .container {
    padding-top: 25px;
  }
</style>