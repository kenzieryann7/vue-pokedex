<template>
  <div
    v-if="showSaving"
    class="alert text-dark alert-warning poke-fixed"
    role="alert"
  >
    Saving image...
  </div>
  <div
    v-if="showSaved"
    class="alert text-dark alert-primary poke-fixed"
    role="alert"
  >
    Image saved at desired location.
  </div>
  <div class="text-start mb-2">
    <router-link :to="{ name: previousPageBeforeCompare }"
      ><button type="button" class="btn poke-btn" title="Return to Pokédex">
        <i class="bi bi-arrow-left-circle h4"></i></button
    ></router-link>
  </div>
  <div class="row">
    <div class="col-5">
      <div class="card text-white bg-dark mb-3 shadow">
        <div class="card-header fw-bold h4">Selected Pokémon</div>
        <div class="card-body">
          <div class="row">
            <div class="col" v-for="poke in comparedPokemon" :key="poke.id">
              <div class="fw-bold h5">{{ poke.name }}</div>
              <img
                v-if="poke?.image"
                class="img-fluid card-img"
                style="width: 12rem;"
                :src="require('@/assets/new-poke/' + poke?.image)"
              />
              <div class="text-muted" v-if="pokemonRoster.includes(poke)">
                In Roster
              </div>
              <button
                v-if="!pokemonRoster.includes(poke)"
                type="button"
                class="btn btn-sm poke-btn fw-bold m-1"
                @click="addPokemonToRoster(poke)"
              >
                Add <i class="bi bi-plus-circle-dotted h5 ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div id="capture" class="card text-white bg-dark mb-3 shadow">
        <div class="card-header fw-bold h4">Compared Data</div>
        <div class="card-body py-2">
          <img :src="graphLink" class="img-fluid rounded" />
        </div>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-lg poke-btn fw-bold"
          @click="showAlert(), savePokeChart()"
        >
          Download Data <i class="bi bi-download h4 ms-1"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
//import html2canvas from 'html2canvas';
import { save } from '@/helpers/elementCapture.js';
import { mapActions, mapGetters } from 'vuex';
let graph_url = null;
export default {
  name: 'ComparePokemon',
  props: {},
  data: () => {
    return {
      //graphURL: graph
      showSaving: false,
      showSaved: false
    };
  },
  computed: {
    ...mapGetters({
      graphLink: 'getGraphURL',
      comparedPokemon: 'getComparedPokemon',
      pokemonRoster: 'getPokemonRoster',
      previousPageBeforeCompare: 'getPreviousPageBeforeCompare'
    }),
    save
  },
  methods: {
    ...mapActions({
      addPokemonToRoster: 'addPokemonToRoster'
    }),
    viewPokedex() {
      this.$emit('view-pokedex', false); // false to change the compare boolean on Main.vue to show Pokedex
    },
    showAlert() {
      this.showSaving = true;
      setTimeout(() => {
        this.showSaving = false;
        this.showSaved = true;
        setTimeout(() => {
          this.showSaved = false;
        }, 4000);
      }, 2000);
    },
    // my microservice
    savePokeChart: async () => {
      const url = graph_url;
      const savePath = '/Users/kenzie/Documents/pokeStats.png';

      let sendImgData = {
        url,
        savePath
      };

      const path = 'http://localhost:8095/savePokeChart';
      await fetch(path, {
        method: 'POST',
        body: JSON.stringify(sendImgData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    }
  },
  mounted() {
    graph_url = this.graphLink;
    //console.log(graph_url);
    //console.log(window.document.getElementById('capture'));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.poke-fixed {
  position: fixed;
  z-index: 1000;
  right: 0;
}
</style>
