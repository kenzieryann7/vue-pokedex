<template>
  <div class="card bg-dark text-white mb-2">
    <div class="card-body p-2">
      <!-- ************ FILTER NAV ************ -->
      <div class="row ">
        <div class="col text-start">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio1"
              autocomplete="off"
              @click="getSortType('ascName')"
            />
            <label class="btn btn-outline-light" for="btnradio1"
              ><i class="bi bi-sort-alpha-down h4"></i
            ></label>

            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio2"
              autocomplete="off"
              @click="getSortType('descName')"
            />
            <label class="btn btn-outline-light" for="btnradio2"
              ><i class="bi bi-sort-alpha-up h4"></i
            ></label>

            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio3"
              autocomplete="off"
              @click="getSortType('ascID')"
              checked
            />
            <label class="btn btn-outline-light" for="btnradio3"
              ><i class="bi bi-sort-numeric-down h4"></i
            ></label>

            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio4"
              autocomplete="off"
              title="Sort ID in Descending Order"
              @click="getSortType('descID')"
            />
            <label class="btn btn-outline-light" for="btnradio4"
              ><i class="bi bi-sort-numeric-up h4"></i
            ></label>
          </div>
        </div>
        <div class="col-4">
          <form class="d-flex">
            <input
              class="form-control"
              type="text"
              v-model="search"
              placeholder="Search a Pokémon..."
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- ************ FILTER NAV END ************ -->

  <!-- ************ POKECARD ************ -->
  <div class="row">
    <div class="col-3" v-for="poke in filteredList" :key="poke.id">
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
            :poke-tooltip="'View Pokémon Information'"
            type="button"
            class="btn btn-sm poke-btn m-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="getSelectedPokemon(poke)"
          >
            View <i class="bi bi-eye h5 text-end ms-1"></i>
          </button>
          <button
            :poke-tooltip="'Add Pokémon to Compare'"
            type="button"
            class="btn btn-sm poke-btn fw-bold m-1"
            @click="getPokemonToCompare(poke)"
          >
            Compare <i class="bi bi-file-bar-graph h5 ms-1"></i>
          </button>
          <button
            :poke-tooltip="'Add Pokémon to Team Roster'"
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
  <!-- ************ POKECARD END ************ -->

  <!-- ************ MODAL ************ -->
  <div
    class="modal fade "
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable my-5"
    >
      <div
        :class="{
          'gradient-border': selectedPokemon?.legendary == true
        }"
      >
        <div class="modal-content my-2">
          <div class="modal-header mt-5 bg-dark text-white">
            <h4 class="modal-title fw-bold" id="exampleModalLabel">
              {{ selectedPokemon?.name }}
              <span
                class="me-1"
                v-if="selectedPokemon?.image == 'NidoranF.png'"
              >
                <Female
              /></span>
              <span
                class="me-1"
                v-if="selectedPokemon?.image == 'NidoranM.png'"
              >
                <Male
              /></span>
              <span class="text-muted ms-2"
                >#{{ formatId(selectedPokemon?.id) }}</span
              >
            </h4>
            <button
              type="button"
              class="btn poke-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              X
            </button>
          </div>
          <div class="modal-body modal-bg">
            <div class="row mb-3">
              <div class="col" v-if="selectedPokemon?.image">
                <img
                  class="img-fluid modal-img"
                  :src="require('@/assets/new-poke/' + selectedPokemon?.image)"
                />
              </div>
              <div class="col">
                <table
                  class="table table-sm bg-light table-striped border border-dark border-2 m-0 shadow text-start"
                >
                  <thead class="bg-dark text-white ">
                    <tr>
                      <th scope="col">Quick Info</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="info in selectedPokemon?.info" :key="info">
                      <td>{{ info.label }}</td>
                      <td>
                        <span v-if="info.label != 'Gender'">{{
                          info.info
                        }}</span>
                        <span v-if="info.label == 'Gender'">
                          <span v-if="info.info == 'M'"><Male /></span>
                          <span v-if="info.info == 'F'"><Female /></span>
                          <span v-if="info.info == 'MF'"><BothSexes /></span>
                          <span v-if="info.info == 'Unknown'">
                            {{ info.info }}
                          </span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Generation</td>
                      <td>{{ selectedPokemon?.generation }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row mb-3">
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
                    <tr v-for="stats in selectedPokemon?.stats" :key="stats">
                      <td :class="{ 'fw-bold': stats.label == 'Total' }">
                        {{ stats.label }}
                      </td>
                      <td :class="{ 'fw-bold': stats.label == 'Total' }">
                        {{ stats.amount }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col text-start">
                <div class="text-start mb-3">
                  <div class="fw-bold mb-2">Description</div>
                  {{ selectedPokemon?.description }}
                </div>
                <div>
                  <div class="fw-bold mb-2">Type</div>
                  <h5>
                    <span
                      class="badge me-2"
                      v-for="type in selectedPokemon?.type"
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
                  </h5>
                </div>
                <br />
                <div>
                  <div class="fw-bold mb-2">Weaknesses</div>
                  <span v-if="!selectedPokemon?.weak"
                    >No weakness recorded.</span
                  >
                  <!-- WEAKNESS 1 -->
                  <h5>
                    <span
                      v-for="weak in selectedPokemon?.weak"
                      :key="weak"
                      class="badge bg-lg m-1"
                      :class="{
                        normal: weak.label == 'Normal',
                        fire: weak.label == 'Fire',
                        water: weak.label == 'Water',
                        grass: weak.label == 'Grass',
                        electric: weak.label == 'Electric',
                        ice: weak.label == 'Ice',
                        fighting: weak.label == 'Fighting',
                        poison: weak.label == 'Poison',
                        ground: weak.label == 'Ground',
                        flying: weak.label == 'Flying',
                        psychic: weak.label == 'Psychic',
                        bug: weak.label == 'Bug',
                        rock: weak.label == 'Rock',
                        ghost: weak.label == 'Ghost',
                        dragon: weak.label == 'Dragon',
                        dark: weak.label == 'Dark',
                        steel: weak.label == 'Steel',
                        fairy: weak.label == 'Fairy'
                      }"
                      >{{ weak.label }}</span
                    >
                  </h5>
                </div>
              </div>
            </div>
            <div class="text-start">
              <div class="fw-bold">Evolutions</div>
              <span v-if="!selectedPokemon?.evos"
                >This Pokémon does not evolve.</span
              >

              <span v-for="(evo, index) in selectedPokemon?.evos" :key="evo">
                <img
                  class="img-fluid evo-img"
                  :src="require('@/assets/new-poke/' + evo.image)"
                  :title="evo.name + ' ' + evo.pokeNum"
                />
                <i
                  v-if="index != selectedPokemon?.evos.length - 1"
                  class="bi bi-arrow-right h1 ms-2 me-2"
                ></i>
              </span>
            </div>
          </div>
          <div class="modal-footer bg-dark">
            <button type="button" class="btn poke-btn" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ************ MODAL END ************ -->
</template>

<script>
import Male from '@/components/MaleSVG.vue';
import Female from '@/components/FemaleSVG.vue';
import BothSexes from '@/components/BothMFSVG.vue';
import pokeData from '@/data/test.json';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'PokeCard',
  props: {},
  components: {
    Male,
    Female,
    BothSexes
  },
  data: () => {
    return {
      pokeData: pokeData,
      selectedPokemon: null,
      compare2Pokemon: [],
      search: '',
      count: 0
    };
  },
  computed: {
    ...mapGetters({
      filteredPokeData: 'getFilteredPokeData'
    }),
    filteredList() {
      return this.filteredPokeData.filter(poke => {
        return poke.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    ...mapActions({
      getPokemonToCompare: 'getPokemonToCompare',
      getFilteredPokeData: 'getFilteredPokeData',
      getSortType: 'getSortType',
      addPokemonToRoster: 'addPokemonToRoster'
    }),
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
    }
  },
  mounted() {
    this.getFilteredPokeData('getFilteredPokeData');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-img {
  width: 250px;
}

.evo-img {
  width: 120px;
}
.evo-img:hover {
  width: 120px;
  cursor: pointer;
  transform: scale(1.15);
}
.poke-name {
  font-size: 18px;
}
.poke-fixed {
  position: fixed;
  z-index: 1000;
}
</style>
