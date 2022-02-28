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
      :graphLink="graphLink"
      :comparedPokemon="comparedPokemon"
      :pokemon1="pokemon1"
      :pokemon2="pokemon2"
      @view-pokedex="showPokedex($event)"
    />
  </div>
</template>

<script>
import Instructions from '@/components/Instructions.vue';
import PokeCard from '@/components/PokeCard.vue';
import SelectedPokemon from '@/components/SelectedPokemon.vue';
import ComparePokemon from '@/components/ComparePokemon.vue';

let statLabels = [];
let pokeData1 = [];
let pokeData2 = [];
let pokeName1 = null;
let pokeName2 = null;
let graphURL = null;
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
      graphLink: '',
      comparedPokemon: [],
      pokemon1: null,
      pokemon2: null,
      compare: false,
      showSelectedPokemon: false
    };
  },
  methods: {
    getComparedPokemon(poke) {
      if (this.comparedPokemon.length < 2) {
        this.comparedPokemon.push(poke);
      }
      // get each pokemons stats
      if (this.comparedPokemon.length == 2) {
        if (this.pokemon1 == null) {
          this.pokemon1 = this.comparedPokemon[0].stats;
          // remove total stat
          if (this.pokemon1.length == 7) {
            this.pokemon1.splice(this.pokemon1.length - 1, 1);
          }
        }
        if (this.pokemon2 == null) {
          this.pokemon2 = this.comparedPokemon[1].stats;
          if (this.pokemon2.length == 7) {
            this.pokemon2.splice(this.pokemon2.length - 1, 1);
          }
        }

        console.log('poke1', this.pokemon1);
        console.log('poke2', this.pokemon2);
        if (this.pokemon1 != null && this.pokemon2 != null) {
          this.getData();
          this.generateGraph();
          // wait for the graph url
          setTimeout(() => {
            this.graphLink = graphURL;
          }, 500);
        }
        return this.pokemon1, this.pokemon2;
      }

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
      console.log('remove pokemon', payload.pokeObj.stats);
      this.pokemon1 = null;
      this.pokemon2 = null;
      pokeData1 = [];
      pokeData2 = [];

      this.comparedPokemon.splice(payload.index, 1);
    },
    getData() {
      pokeName1 = this.comparedPokemon[0].name;
      pokeName2 = this.comparedPokemon[1].name;
      this.pokemon1.map(e => {
        pokeData1.push(e.amount);
      });
      console.log('pokeData1', pokeData1);

      this.pokemon2.map(e => {
        pokeData2.push(e.amount);
      });
      console.log('pokeData2', pokeData2);

      console.log('data initialized', statLabels);
    },
    generateGraph: async () => {
      //const statKeys = statLabels;
      const pokeVals1 = pokeData1;
      const pokeVals2 = pokeData2;
      const poke1 = pokeName1;
      const poke2 = pokeName2;

      const template = {
        config: {
          type: 'radar',
          data: {
            labels: [
              'Health',
              'Attack',
              'Defense',
              'Special Attack',
              'Special Defense',
              'Speed'
            ],
            datasets: [
              {
                label: poke1,
                backgroundColor: 'rgba(255, 205, 5, 0.3)',
                borderColor: 'rgb(255, 205, 5)',
                pointBackgroundColor: 'rgb(194, 156, 6)',
                data: pokeVals1,
                pointHoverRadius: 30
              },
              {
                label: poke2,
                backgroundColor: 'rgba(61, 124, 202, 0.5)',
                borderColor: 'rgb(61, 124, 202)',
                pointBackgroundColor: 'rgb(26, 78, 143)',
                data: pokeVals2,
                pointHoverRadius: 30
              }
            ]
          },
          options: {
            legend: {
              display: true,
              align: 'start',
              labels: { fontSize: 8, fontColor: 'black' }
            },
            title: { display: true, text: 'Pokemon Stats', fontColor: 'black' },
            scale: { ticks: { display: true } }
          }
        },
        width: 320,
        height: 240
      };
      const path = 'http://localhost:8090/generateGraph';
      const response = await fetch(path, {
        method: 'POST',
        body: JSON.stringify(template),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const val = await response.json();

      graphURL = await val.graph_url;
      //console.log(graphURL);
      return val.graph_url;
    }
  },
  mounted() {}
};
</script>
