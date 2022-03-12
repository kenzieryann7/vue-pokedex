import { createStore } from 'vuex';

// STATE is the data.
// MUTATIONS change state, and are uppercase.
// ACTIONS `commit` mutations, and invoked by `dispatch`
// GETTERS is how state is read.

import pokeData from '@/data/test.json';
export default createStore({
  state: {
    pokeData,
    filteredPokeData: [],
    comparedPokemon: [],
    pokemonRoster: [],
    selectedPokemon1: null,
    selectedPokemon2: null,
    showSelectedPokemon: false,
    searchPokemon: '',
    pokeName1: '',
    pokeName2: '',
    graphURL: null,
    pokeData1: [],
    pokeData2: [],
    pokemonSelected: false,
    previousPageBeforeCompare: 'Main'
  },
  mutations: {
    setFilteredPokeData(state) {
      state.filteredPokeData = state.pokeData;
      state.filteredPokeData.filter(poke => {
        return poke.name
          .toLowerCase()
          .includes(state.searchPokemon.toLowerCase());
      });
    },
    setSearchPokemon(state, search) {
      state.filteredPokeData.filter(poke => {
        return poke.name.toLowerCase().includes(search.toLowerCase());
      });
    },
    setComparedPokemon(state, pokemon) {
      if (state.comparedPokemon.length < 2) {
        state.comparedPokemon.push(pokemon);
      }
      // get each pokemons stats
      if (state.comparedPokemon.length == 2) {
        state.pokemonSelected = true;
        if (state.selectedPokemon1 == null) {
          state.selectedPokemon1 = state.comparedPokemon[0].stats;
          // remove total stat
          if (state.selectedPokemon1.length == 7) {
            state.selectedPokemon1.splice(state.selectedPokemon1.length - 1, 1);
          }
        }
        if (state.selectedPokemon2 == null) {
          state.selectedPokemon2 = state.comparedPokemon[1].stats;
          if (state.selectedPokemon2.length == 7) {
            state.selectedPokemon2.splice(state.selectedPokemon2.length - 1, 1);
          }
        }
      }
      console.log('poke1', state.selectedPokemon1);
      console.log('poke2', state.selectedPokemon2);
    },
    setShowSelectedPokemon(state, show) {
      state.showSelectedPokemon = show;
      console.log(state.showSelectedPokemon);
    },
    setRemovedSelectedPokemon(state, pokeIdx) {
      state.selectedPokemon1 = [];
      state.selectedPokemon2 = [];
      state.comparedPokemon.splice(pokeIdx, 1);
    },
    setPokemonData(state) {
      state.pokeName1 = state.comparedPokemon[0].name;
      state.pokeName2 = state.comparedPokemon[1].name;
      state.selectedPokemon1.map(e => {
        state.pokeData1.push(e.amount);
      });

      state.selectedPokemon2.map(e => {
        state.pokeData2.push(e.amount);
      });
    },
    setSortType(state, sort) {
      let poke = state.pokeData;
      // ascending by name
      if (sort == 'ascName') {
        state.filteredPokeData = poke.sort((a, b) => {
          let fa = a.name,
            fb = b.name;
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      }
      // descending by name
      if (sort == 'descName') {
        state.filteredPokeData = poke.sort((a, b) => {
          let fa = a.name,
            fb = b.name;
          if (fa < fb) {
            return 1;
          }
          if (fa > fb) {
            return -1;
          }
          return 0;
        });
      }
      // ascending by ID
      if (sort == 'ascID') {
        state.filteredPokeData = poke.sort((a, b) => {
          let fa = a.id,
            fb = b.id;
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      }
      // descending by ID
      if (sort == 'descID') {
        state.filteredPokeData = poke.sort((a, b) => {
          let fa = a.id,
            fb = b.id;
          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        });
      }
    },
    setAddPokemonToRoster(state, pokemon) {
      if (state.pokemonRoster.includes(pokemon)) {
        console.log('no duplicates');
        return;
      }
      if (state.pokemonRoster.length == 6) {
        console.log('maximum team');
      } else {
        state.pokemonRoster.push(pokemon);
        console.log(state.pokemonRoster);
      }
    },
    setLastPage(state, page) {
      state.previousPageBeforeCompare = page;
    }
  },
  actions: {
    getPokemonToCompare(context, pokemon) {
      context.commit('setComparedPokemon', pokemon);
      context.commit('setShowSelectedPokemon', true);
      console.log(pokemon);
      if (this.state.pokemonSelected == true) {
        this.dispatch('getPokemonData');
        this.dispatch('generateGraph');
      }
    },
    getRemovedSelectedPokemon(context, pokeIdx) {
      context.commit('setRemovedSelectedPokemon', pokeIdx);
    },
    getShowSelectedPokemon(context, show) {
      context.commit('setShowSelectedPokemon', show);
    },
    getPokemonData(context) {
      context.commit('setPokemonData');
    },
    getFilteredPokeData(context) {
      context.commit('setFilteredPokeData');
    },
    searchPokemon(context, search) {
      context.commit('setSearchPokemon', search);
    },
    getSortType(context, sort) {
      context.commit('setSortType', sort);
    },
    addPokemonToRoster(context, pokemon) {
      context.commit('setAddPokemonToRoster', pokemon);
    },
    getLastPage(context, page) {
      context.commit('setLastPage', page);
      console.log(page);
    },
    generateGraph: async rootState => {
      //const statKeys = statLabels;
      const pokeVals1 = rootState.state.pokeData1;
      const pokeVals2 = rootState.state.pokeData2;
      const poke1 = rootState.state.pokeName1;
      const poke2 = rootState.state.pokeName2;
      console.log(poke1);
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

      rootState.state.graphURL = await val.graph_url;
      console.log(rootState.state.graphURL);
      return val.graph_url;
    }
  },
  getters: {
    getSearchPokemon: state => state.searchPokemon,
    getFilteredPokeData: state => state.filteredPokeData,
    getPokemonRoster: state => state.pokemonRoster,
    getComparedPokemon: state => state.comparedPokemon,
    getShowSelectedPokemon: state => state.showSelectedPokemon,
    getGraphURL: state => state.graphURL
  }
});
