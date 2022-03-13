<template>
  <SelectedPokemon />

  <div class="container">
    <Instructions title="Title" instructions="Lorum." />
    <PokeCard />
  </div>
</template>

<script>
import Instructions from '@/components/Instructions.vue';
import PokeCard from '@/components/PokeCard.vue';
import SelectedPokemon from '@/components/SelectedPokemon.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Main',
  components: {
    Instructions,
    PokeCard,
    SelectedPokemon
  },
  data: () => {
    return {
      graphLink: '',
      pokemon1: null,
      pokemon2: null,
      compare: false,
      showSelectedPokemon: false
    };
  },
  computed: {
    ...mapGetters({
      comparedPokemon: 'getComparedPokemon'
    })
  },
  methods: {
    ...mapActions({
      getComparedPokemon: 'getComparedPokemon'
    })
  },
  mounted() {}
};
</script>
