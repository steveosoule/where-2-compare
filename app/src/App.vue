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

export default {
  components: {
    Header
  }
}
</script>