<template>
  <div class="alert alert-bg shadow" role="alert">
    A simple primary alert—check it out!
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
