<template>
  <SelectedPokemon />
  <div class="container">
    <div
      v-if="pokemonRoster.length == 0"
      class="alert alert-bg shadow"
      role="alert"
    >
      You have no added Pokémon to your Team Roster. Go to the Pokédex to add
      some!
    </div>
    <div class="row" v-if="pokemonRoster.length >= 1">
      <div class="fw-bold h2 text-dark mb-3">Pokémon Team Roster</div>
      <div class="col-4" v-for="poke in pokemonRoster" :key="poke.id">
        <div
          class="card poke-card bg-light mb-3 shadow "
          :class="{
            'gradient-border': poke.legendary == true,
            'border border-dark border-2': poke.legendary == false
          }"
        >
          <div class="card-body card-bg pb-1">
            <!-- *** POKE IMAGE *** -->
            <img
              v-if="poke?.image"
              class="img-fluid card-img"
              :src="require('@/assets/new-poke/' + poke?.image)"
            />
            <!-- POKE NAME -->
            <div class="poke-name fw-bold text-start">
              {{ poke.name }}
              <span class="me-1" v-if="poke?.image == 'NidoranF.png'">
                <Female
              /></span>
              <span class="me-1" v-if="poke?.image == 'NidoranM.png'">
                <Male
              /></span>
              <span class="pokedex">#{{ formatId(poke.id) }}</span>
            </div>
            <div class="text-start">
              <span
                class="badge me-2 mb-1 border border-dark border-2 shadow-sm"
                v-for="type in poke.type"
                :key="type"
                :class="{
                  normal: type.label == 'Normal',
                  fire: type.label == 'Fire',
                  water: type.label == 'Water',
                  grass: type.label == 'Grass',
                  electric: type.label == 'Electric',
                  ice: type.label == 'Ice',
                  fighting: type.label == 'Fighting',
                  poison: type.label == 'Poison',
                  ground: type.label == 'Ground',
                  flying: type.label == 'Flying',
                  psychic: type.label == 'Psychic',
                  bug: type.label == 'Bug',
                  rock: type.label == 'Rock',
                  ghost: type.label == 'Ghost',
                  dragon: type.label == 'Dragon',
                  dark: type.label == 'Dark',
                  steel: type.label == 'Steel',
                  fairy: type.label == 'Fairy'
                }"
                >{{ type.label }}</span
              >
            </div>
          </div>
          <div class="card-footer bg-dark text-white p-2">
            <button
              type="button"
              class="btn btn-sm poke-btn m-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="getSelectedPokemon(poke)"
            >
              View <i class="bi bi-eye h5 text-end ms-1"></i>
            </button>
            <button
              type="button"
              class="btn btn-sm poke-btn fw-bold m-1"
              @click="getPokemonToCompare(poke)"
            >
              Compare <i class="bi bi-file-bar-graph h5 ms-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectedPokemon from '@/components/SelectedPokemon.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'PokemonRoster',
  components: {
    SelectedPokemon
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      pokemonRoster: 'getPokemonRoster'
    })
  },
  methods: {
    ...mapActions({
      getPokemonToCompare: 'getPokemonToCompare'
    }),
    formatId(id) {
      if (id < 10) {
        return '00' + id;
      }
      if (id > 10 && id < 100) {
        return '0' + id;
      }
      return id;
    }
  }
};
</script>

<style scoped>
.alert-bg {
  background-color: #ffcb05;
  color: black;
}
</style>
