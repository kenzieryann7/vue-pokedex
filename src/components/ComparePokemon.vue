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
      <div id="capture" class="card text-white bg-dark mb-3 shadow">
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

          <img src="@/assets/chart.png" class="img-fluid" />
        </div>
      </div>
      <div>
        <button type="button" class="btn btn-primary btn-lg" @click="save">
          Download Data
        </button>
      </div>
    </div>
  </div>
</template>

<script>
//import html2canvas from 'html2canvas';
import { save } from '@/helpers/elementCapture.js';
export default {
  name: 'ComparePokemon',
  props: {
    comparedPokemon: Array
  },
  computed: {
    save
  },
  methods: {
    viewPokedex() {
      this.$emit('view-pokedex', false); // false to change the compare boolean on Main.vue to show Pokedex
    }
    // showCaptureRef() {
    //   console.log('Capture:', this.$refs.capture);
    // }
    // save: function() {
    //   new html2canvas(this.$refs.capture, {
    //     backgroundColor: null,
    //     scrollX: 0,
    //     scrollY: -window.scrollY,
    //     scale: 1,
    //     allowTaint: true,
    //     useCORS: true
    //   }).then(function(canvas) {
    //     let uri = canvas.toDataURL();
    //     let filename = 'data-capture';
    //     let link = document.createElement('a');
    //     if (typeof link.download === 'string') {
    //       link.href = uri;
    //       link.download = filename;
    //       //Firefox requires the link to be in the body
    //       document.body.appendChild(link);
    //       //simulate click
    //       link.click();
    //       //remove the link when done
    //       document.body.removeChild(link);
    //     } else {
    //       window.open(uri);
    //     }
    //   });
    // }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
