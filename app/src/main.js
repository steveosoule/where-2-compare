import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './scss/main.scss';

Vue.config.productionTip = false

console.log('hello from main.js 2019-09-11!');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
