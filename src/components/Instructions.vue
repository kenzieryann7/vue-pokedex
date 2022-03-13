<template>
  <div class="alert alert-bg shadow fw-bold" role="alert">
    This Pokédex shows Generation 1 Pokémon.
    <div>
      Click Compare to add two Pokémon to your selected list to then compare
      battle stats.
    </div>
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
  background-color: #3d7dca;
  color: white;
}
</style>
