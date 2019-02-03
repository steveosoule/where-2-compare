<template>
  <div id="app">
    <img src="./assets/logo.png">
    <i class="fa fa-gear"></i>
    <p>foo: {{ foo }}</p>
    <p>appfoo: {{ appfoo }} | {{another}}</p>
    <router-view></router-view>
    <sandbox/>
  </div>
</template>

<script>
import Sandbox from './components/Sandbox'
export default {
  name: 'app',
  props: ['foo'],
  data () {
    return {
      appfoo: 'Bar main.js',
      another: 'thing'
    }
  },
  components: {
    Sandbox
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
