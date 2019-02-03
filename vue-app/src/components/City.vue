<template>
  <article class="city">
    <h1>{{ city.city_name }}, {{ city.state_abbr }}</h1>
    <dl>
      <template v-for="(value, key) in city">
        <dt>{{key}}</dt>
        <dd>{{value}}</dd>
      </template>
    </dl>
  </article>
</template>

<script>
export default {
  name: 'city',
  props: ['city']
}
</script>