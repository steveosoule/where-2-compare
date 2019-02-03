<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
      <div>
        <city v-for="city in sample_cities" :key="city._id" :city="city" />
      </div>
      <!-- <b-list-group>
        <b-list-group-item v-for="city in sample_cities">{{city.city_name}}, {{city.state_abbr}}</b-list-group-item>
      </b-list-group> -->
    </div>
  </div>
</template>

<script>
// import Sandbox from './components/Sandbox'

import City from './components/City'

import config from './config';
import axios from 'axios';
import _ from 'lodash';

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
  components: { City }
}
</script>