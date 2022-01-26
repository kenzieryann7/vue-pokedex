<template>
  <div class="text-start info-fixed" v-if="selectInfo">
    <span class="ms-2 badge bg-primary shadow"
      ><i class="bi bi-arrow-down h5 align-middle me-1"></i> Click here to see
      the Pokémon you have selected.</span
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
            <button
              type="button"
              class="btn poke-btn"
              @click="comparingPokemon()"
            >
              Compare
            </button>
          </div>
        </span>
      </div>
      <div class="col-3 text-end ">
        <button
          type="button"
          class="btn close-btn poke-btn"
          style="height: 100%;"
          title="Click to show selected Pokémon."
          @click="showAlert((show = !show))"
        >
          <i
            class="bi"
            :class="{
              'bi-caret-right-fill': !showSelectedPokemon,
              'bi-caret-left-fill': showSelectedPokemon
            }"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectedPokemon',
  props: {
    comparedPokemon: Array,
    showSelectedPokemon: Boolean
  },
  data: () => {
    return {
      show: false,
      selectInfo: true
    };
  },
  methods: {
    comparingPokemon() {
      this.$emit('comparingPokemon', true);
    },
    showAlert(bool) {
      this.$emit('show-selected', bool);
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
      //let idx = this.comparedPokemon.indexOf(poke);
      let payload = {
        pokeObj: poke,
        index: this.comparedPokemon.indexOf(poke)
      };
      this.$emit('remove-pokemon', payload);
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
