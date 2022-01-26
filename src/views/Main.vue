<template>
  <SelectedPokemon
    :comparedPokemon="comparedPokemon"
    :showSelectedPokemon="showSelectedPokemon"
    @comparingPokemon="comparingPokemon($event)"
    @show-selected="showSelected($event)"
    @remove-pokemon="removePokemon($event)"
    v-if="!compare"
  />

  <div class="container">
    <Instructions title="Title" instructions="Lorum." v-if="!compare" />
    <PokeCard @comparePokemon="getComparedPokemon($event)" v-if="!compare" />
    <ComparePokemon
      v-if="compare"
      :comparedPokemon="comparedPokemon"
      @view-pokedex="showPokedex($event)"
    />
  </div>
</template>

<script>
import Instructions from '@/components/Instructions.vue';
import PokeCard from '@/components/PokeCard.vue';
import SelectedPokemon from '@/components/SelectedPokemon.vue';
import ComparePokemon from '@/components/ComparePokemon.vue';

export default {
  name: 'Main',
  components: {
    Instructions,
    PokeCard,
    SelectedPokemon,
    ComparePokemon
  },
  data: () => {
    return {
      comparedPokemon: [],
      compare: false,
      showSelectedPokemon: false
    };
  },
  methods: {
    getComparedPokemon(poke) {
      if (this.comparedPokemon.length < 2) {
        this.comparedPokemon.push(poke);
      }

      console.log('from main', this.comparedPokemon);
      this.showSelectedPokemon = true;
    },
    comparingPokemon(bool) {
      console.log(bool);
      this.compare = bool;
    },
    showPokedex(bool) {
      console.log(bool);
      this.compare = bool;
    },
    showSelected(bool) {
      this.showSelectedPokemon = bool;
    },
    removePokemon(payload) {
      console.log('remove pokemon', payload.pokeObj);
      this.comparedPokemon.splice(payload.index, 1);
    }
  }
};
</script>
