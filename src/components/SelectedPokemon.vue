<template>
  <div class="text-start info-fixed" v-if="selectInfo">
    <span class="ms-2 badge bg-primary shadow"
      ><i class="bi bi-arrow-down h5 align-middle me-1"></i> Click here to see
      the Pokémon you have selected to compare.</span
    >
  </div>
  <div
    class="alert bg-dark text-white poke-fixed p-0 border border-2 border-dark shadow"
    role="alert"
    :class="{
      'lg-width': showSelectedPokemon,
      'sm-width': !showSelectedPokemon
    }"
  >
    <div class="row">
      <div class="col text-start ms-2 my-2" v-if="showSelectedPokemon">
        <span v-if="comparedPokemon">
          <div class="fw-bold mb-2">
            Selected Pokémon: {{ comparedPokemon.length }} / 2
          </div>
          <span v-for="poke in comparedPokemon" :key="poke.id">
            <div>
              <i
                class="bi bi-x-square-fill me-2 text-danger pointer"
                title="Remove Pokémon"
                @click="removePokemon(poke)"
              ></i
              >{{ poke.name }}
              <span class="text-muted pokedex">#{{ formatId(poke.id) }}</span>
            </div>
            <img
              v-if="poke?.image"
              class="img-fluid card-img"
              style="width: 8rem;"
              :src="require('@/assets/new-poke/' + poke?.image)"
            />
          </span>
          <div class="text-center mt-2" v-if="comparedPokemon.length == 2">
            <router-link :to="{ name: 'PokemonCompare' }"
              ><button type="button" class="btn poke-btn">
                Compare
              </button></router-link
            >
          </div>
        </span>
      </div>
      <div class="col-3 text-end ">
        <button
          v-if="showSelectedPokemon == true"
          type="button"
          class="btn close-btn poke-btn"
          style="height: 100%;"
          title="Click to show selected Pokémon."
          @click="getShowSelectedPokemon(false)"
        >
          <i class="bi bi-caret-left-fill"></i>
        </button>
        <button
          v-if="showSelectedPokemon == false"
          type="button"
          class="btn close-btn poke-btn"
          style="height: 100%;"
          title="Click to show selected Pokémon."
          @click="getShowSelectedPokemon(true)"
        >
          <i class="bi bi-caret-right-fill"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'SelectedPokemon',
  props: {},
  data: () => {
    return {
      selectInfo: true
    };
  },
  computed: {
    ...mapGetters({
      showSelectedPokemon: 'getShowSelectedPokemon',
      comparedPokemon: 'getComparedPokemon'
    })
  },
  methods: {
    ...mapActions({
      getShowSelectedPokemon: 'getShowSelectedPokemon',
      getFormatId: 'getFormatId',
      getRemovedSelectedPokemon: 'getRemovedSelectedPokemon'
    }),
    comparingPokemon() {
      this.$emit('comparingPokemon', true);
    },
    formatId(id) {
      if (id < 10) {
        return '00' + id;
      }
      if (id > 10 && id < 100) {
        return '0' + id;
      }
      return id;
    },
    removePokemon(poke) {
      let idx = this.comparedPokemon.indexOf(poke);
      this.getRemovedSelectedPokemon(idx);
    }
  },
  mounted() {
    setTimeout(() => {
      this.selectInfo = false;
    }, 4000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.poke-fixed {
  position: fixed;
  z-index: 1000;
  margin-top: 2.5rem;
}
.info-fixed {
  position: fixed;
  z-index: 500;
}
.close-btn {
  border-radius: 0px !important;
}
.sm-width {
  width: 2.9rem !important;
}
.lg-width {
  width: 18rem !important;
}
</style>
