<template>
  <div class="sandbox">
    <!-- <h1>foo: {{ foo }}</h1> -->
    <p>{{myFoo}}</p>
  </div>
</template>

<script>
export default {
  name: 'sandbox',
  data () {
    return {
      myFoo: 'FizzBuzz'
    }
  }
}
</script>