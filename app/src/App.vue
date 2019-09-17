<template>
  <div id="app">
    <div class="container-fluid">
      <Header />
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

// import api from '@/api.js'
// import store from '@/store.js'

export default {
  components: {
    Header
	},
	/* beforeCreate() {
		this.$store.commit('initialiseStore');
	} */
  /* beforeMount: function () {
    this.load_compared_cities();
  },
  methods: {
    load_compared_cities: function () {
			console.log('load_compared_cities', store.state.compared_city_ids);
			
    }
  }, */
}
</script>