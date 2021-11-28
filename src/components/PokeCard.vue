<template>
  <div class="row">
    <div class="col-3" v-for="poke in pokeData" :key="poke.id">
      <div class="card mb-3 shadow">
        <div class="card-body">
          <img
            v-if="poke?.image"
            class="img-fluid card-img"
            :src="require('@/assets/poke-imgs/' + poke?.image)"
          />
          <div class="text-start">
            <div class="fw-bold">
              {{ poke.name }}
              <span class="text-muted">#{{ formatId(poke.id) }}</span>
            </div>
            <span
              class="badge me-2"
              :class="{
                normal: poke.type1 == 'Normal',
                fire: poke.type1 == 'Fire',
                water: poke.type1 == 'Water',
                grass: poke.type1 == 'Grass',
                electric: poke.type1 == 'Electric',
                ice: poke.type1 == 'Ice',
                fighting: poke.type1 == 'Fighting',
                poison: poke.type1 == 'Poison',
                ground: poke.type1 == 'Ground',
                flying: poke.type1 == 'Flying',
                psychic: poke.type1 == 'Psychic',
                bug: poke.type1 == 'Bug',
                rock: poke.type1 == 'Rock',
                ghost: poke.type1 == 'Ghost',
                dragon: poke.type1 == 'Dragon',
                dark: poke.type1 == 'Dark',
                steel: poke.type1 == 'Steel',
                fairy: poke.type1 == 'Fairy'
              }"
              >{{ poke.type1 }}</span
            >
            <span
              class="badge"
              :class="{
                normal: poke.type2 == 'Normal',
                fire: poke.type2 == 'Fire',
                water: poke.type2 == 'Water',
                grass: poke.type2 == 'Grass',
                electric: poke.type2 == 'Electric',
                ice: poke.type2 == 'Ice',
                fighting: poke.type2 == 'Fighting',
                poison: poke.type2 == 'Poison',
                ground: poke.type2 == 'Ground',
                flying: poke.type2 == 'Flying',
                psychic: poke.type2 == 'Psychic',
                bug: poke.type2 == 'Bug',
                rock: poke.type2 == 'Rock',
                ghost: poke.type2 == 'Ghost',
                dragon: poke.type2 == 'Dragon',
                dark: poke.type2 == 'Dark',
                steel: poke.type2 == 'Steel',
                fairy: poke.type2 == 'Fairy'
              }"
              >{{ poke.type2 }}</span
            >
          </div>
        </div>
        <div class="card-footer text-end">
          <button
            type="button"
            class="btn btn-sm poke-btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="getSelectedPokemon(poke)"
          >
            View
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h4 class="modal-title fw-bold" id="exampleModalLabel">
            {{ selectedPokemon?.name }}
            <span class="text-muted">#{{ formatId(selectedPokemon?.id) }}</span>
          </h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body modal-bg">
          <div class="row mb-3">
            <div class="col" v-if="selectedPokemon?.image">
              <img
                class="img-fluid modal-img"
                :src="require('@/assets/poke-imgs/' + selectedPokemon?.image)"
              />
            </div>
            <div class="col">
              <table
                class="table table-sm bg-light table-striped text-start border border-dark border-2 m-0 shadow"
              >
                <thead class="bg-dark text-white">
                  <tr>
                    <th scope="col">Quick Info</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody class="">
                  <tr>
                    <td>Height</td>
                    <td>{{ selectedPokemon?.hp }}</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>{{ selectedPokemon?.attack }}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>{{ selectedPokemon?.defense }}</td>
                  </tr>
                  <tr>
                    <td>Abilities</td>
                    <td>{{ selectedPokemon?.spAttack }}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{{ selectedPokemon?.spDefense }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <table
                class="table table-sm bg-light table-striped text-start border border-dark border-2 m-0 shadow"
              >
                <thead class="bg-dark text-white">
                  <tr>
                    <th scope="col">Statistics</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody class="">
                  <tr>
                    <td>Health</td>
                    <td>{{ selectedPokemon?.hp }}</td>
                  </tr>
                  <tr>
                    <td>Attack</td>
                    <td>{{ selectedPokemon?.attack }}</td>
                  </tr>
                  <tr>
                    <td>Defense</td>
                    <td>{{ selectedPokemon?.defense }}</td>
                  </tr>
                  <tr>
                    <td>Special Attack</td>
                    <td>{{ selectedPokemon?.spAttack }}</td>
                  </tr>
                  <tr>
                    <td>Special Defense</td>
                    <td>{{ selectedPokemon?.spDefense }}</td>
                  </tr>
                  <tr>
                    <td>Speed</td>
                    <td>{{ selectedPokemon?.speed }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col text-start">
              <div>
                <span class="fw-bold">Type</span>
                <br />
                <span
                  class="badge me-2"
                  :class="{
                    normal: selectedPokemon?.type1 == 'Normal',
                    fire: selectedPokemon?.type1 == 'Fire',
                    water: selectedPokemon?.type1 == 'Water',
                    grass: selectedPokemon?.type1 == 'Grass',
                    electric: selectedPokemon?.type1 == 'Electric',
                    ice: selectedPokemon?.type1 == 'Ice',
                    fighting: selectedPokemon?.type1 == 'Fighting',
                    poison: selectedPokemon?.type1 == 'Poison',
                    ground: selectedPokemon?.type1 == 'Ground',
                    flying: selectedPokemon?.type1 == 'Flying',
                    psychic: selectedPokemon?.type1 == 'Psychic',
                    bug: selectedPokemon?.type1 == 'Bug',
                    rock: selectedPokemon?.type1 == 'Rock',
                    ghost: selectedPokemon?.type1 == 'Ghost',
                    dragon: selectedPokemon?.type1 == 'Dragon',
                    dark: selectedPokemon?.type1 == 'Dark',
                    steel: selectedPokemon?.type1 == 'Steel',
                    fairy: selectedPokemon?.type1 == 'Fairy'
                  }"
                  >{{ selectedPokemon?.type1 }}</span
                >
                <span
                  class="badge"
                  :class="{
                    normal: selectedPokemon?.type2 == 'Normal',
                    fire: selectedPokemon?.type2 == 'Fire',
                    water: selectedPokemon?.type2 == 'Water',
                    grass: selectedPokemon?.type2 == 'Grass',
                    electric: selectedPokemon?.type2 == 'Electric',
                    ice: selectedPokemon?.type2 == 'Ice',
                    fighting: selectedPokemon?.type2 == 'Fighting',
                    poison: selectedPokemon?.type2 == 'Poison',
                    ground: selectedPokemon?.type2 == 'Ground',
                    flying: selectedPokemon?.type2 == 'Flying',
                    psychic: selectedPokemon?.type2 == 'Psychic',
                    bug: selectedPokemon?.type2 == 'Bug',
                    rock: selectedPokemon?.type2 == 'Rock',
                    ghost: selectedPokemon?.type2 == 'Ghost',
                    dragon: selectedPokemon?.type2 == 'Dragon',
                    dark: selectedPokemon?.type2 == 'Dark',
                    steel: selectedPokemon?.type2 == 'Steel',
                    fairy: selectedPokemon?.type2 == 'Fairy'
                  }"
                  >{{ selectedPokemon?.type2 }}</span
                >
              </div>
              <br />
              <div class="mb-3">
                <span class="fw-bold">Weaknesses</span>
              </div>
              <div>
                <span class="fw-bold">Evolution</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-dark">
          <button type="button" class="btn poke-btn2" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pokeData from '@/data/gen1.json';
export default {
  name: 'PokeCard',
  props: {},
  data: () => {
    return {
      pokeData: pokeData,
      selectedPokemon: null
    };
  },
  computed: {},
  methods: {
    formatId(id) {
      if (id < 10) {
        return '00' + id;
      }
      if (id > 10 && id < 100) {
        return '0' + id;
      }
      return id;
    },
    getSelectedPokemon(poke) {
      this.selectedPokemon = poke;
      console.log('Selected Pokemon:', this.selectedPokemon);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-img {
  width: 200px;
}
.card-img {
  height: 210px;
}
</style>
