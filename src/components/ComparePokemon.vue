<template>
  <div class="text-start mb-2">
    <button
      type="button"
      class="btn poke-btn"
      title="Return to Pokédex"
      @click="viewPokedex()"
    >
      <i class="bi bi-arrow-left-circle h4"></i>
    </button>
  </div>
  <div class="row">
    <div class="col-3">
      <div class="card text-white bg-dark mb-3 shadow">
        <div class="card-header fw-bold">Selected Pokémon</div>
        <div class="card-body">
          <div v-for="poke in comparedPokemon" :key="poke.id">
            <div class="fw-bold">{{ poke.name }}</div>
            <img
              v-if="poke?.image"
              class="img-fluid card-img"
              style="width: 8rem;"
              :src="require('@/assets/new-poke/' + poke?.image)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card text-white bg-dark mb-3 shadow">
        <div class="card-header fw-bold">Compared Data</div>
        <div class="card-body pb-2">
          <div class="text-start mb-3">
            <div class="fw-bold">Legend</div>

            <h5>
              <span class="badge poke-blue text-white m-1">{{
                comparedPokemon[0].name
              }}</span>
              <span class="badge bg-warning text-white m-1">{{
                comparedPokemon[1].name
              }}</span>
            </h5>
          </div>

          <img src="@/assets/chart.png" class="img-fluid" />Temporary Data Chart
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComparePokemon',
  props: {
    comparedPokemon: Array
  },
  methods: {
    viewPokedex() {
      this.$emit('view-pokedex', false); // false to change the compare boolean on Main.vue to show Pokedex
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
