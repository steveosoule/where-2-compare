import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {version} from '../package.json';

export default new Vuex.Store({
  state: {
    version
  },
  mutations: {
    initialiseStore(state) {
      // Check if the store exists
      if(localStorage.getItem('store')) {
        let store = JSON.parse(localStorage.getItem('store'));
        
        if(store.version == version) {
          this.replaceState(
            Object.assign(state, store)
          )
        }
      }
      localStorage.setItem('store', JSON.stringify(state))
    }
  },
  actions: {

  }
})
