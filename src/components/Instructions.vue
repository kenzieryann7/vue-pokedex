<template>
  <div class="alert alert-bg shadow" role="alert">
    This Pokédex shows Generation 1 Pokémon
  </div>
</template>

<script>
export default {
  name: 'Instructions',
  props: {
    title: {
      type: String,
      default: 'Instructions'
    },
    instructions: {
      type: String,
      required: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert-bg {
  background-color: #ffcb05;
  color: black;
}
</style>
