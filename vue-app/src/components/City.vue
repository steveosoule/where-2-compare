<template>
  <article class="city">
    <h1>{{ city.city_name }}, {{ city.state_abbr }}</h1>
    <dl>
      <div v-for="(value, key) in city" :key="key">
        <dt>{{key}}</dt>
        <dd>{{value}}</dd>
      </div>
    </dl>
  </article>
</template>

<script>
export default {
  name: 'city',
  props: ['city']
}
</script>