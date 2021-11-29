<template>
  <div class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-brand d-flex">
        <img
          src="@/assets/logo.png"
          alt="Pokéball"
          height="50"
          class="d-inline-flex align-top me-3 pe-3 border-end"
        />
        <a href="https://fontmeme.com/pokemon-font/"
          ><img
            src="https://fontmeme.com/permalink/211128/e902b035af70f0461d44b4799ffce690.png"
            alt="pokemon-font"
            border="0"
        /></a>
        <div class="title me-3 fw-bold">{{ title }}</div>
        <div class="subtitle">{{ subtitle }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: process.env.VUE_APP_COURSE
    },
    subtitle: {
      type: String,
      default: process.env.VUE_APP_TITLE
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
