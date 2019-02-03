<template>
  <section class="city-list">
    <city v-for="city in three_cities" :key="city._id" :city="city" />
  </section>
</template>

<script>
import City from './City';

export default {
  name: 'city-list',
  props: ['cities'],
  computed: {
    three_cities: function(){
      return _.take(this.cities, 3);
    }
  },
  components: { City }
}
</script>