<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand d-flex" href="#"
        ><img
          src="@/assets/logo.png"
          alt="Pokéball"
          height="50"
          class="d-inline-flex align-top me-3 pe-3 border-end"/>
        <a href="https://fontmeme.com/pokemon-font/"
          ><img
            src="https://fontmeme.com/permalink/211128/e902b035af70f0461d44b4799ffce690.png"
            alt="pokemon-font"
            border="0"/></a
      ></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#"
              ><router-link
                :to="{ name: 'Main' }"
                class="nav-link"
                @click="getLastPage('Main')"
                >Pokédex</router-link
              ></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"
              ><router-link
                :to="{ name: 'PokemonRoster' }"
                class="nav-link"
                @click="getLastPage('PokemonRoster')"
                >Pokémon Roster</router-link
              ></a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Header',
  props: {},
  methods: {
    ...mapActions({
      getLastPage: 'getLastPage'
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
