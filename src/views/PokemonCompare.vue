<template>
  <div class="container">
    <ComparePokemon />
  </div>
</template>

<script>
import ComparePokemon from '@/components/ComparePokemon.vue';
// @ is an alias to /src
//import Card from "@/components/Card.vue";

export default {
  name: 'PokemonCompare',
  components: {
    ComparePokemon
  },
  data() {
    return {};
  }
};
</script>
