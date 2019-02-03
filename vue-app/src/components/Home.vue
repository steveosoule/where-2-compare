<template>
  <section class="home">
    <div class="jumbotron">
      <h1 class="display-3">Where 2 Compare</h1>
      <p class="lead">Compare the different types of cities in the vast United States of America.</p>
      <hr class="my-2">
      <p class="lead">
        <router-link class="btn btn-primary btn-lg" to="/cities">View Cities</router-link>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Hello World'
    }
  }
}
</script>