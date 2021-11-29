<template>
  <div class="container">
    <Instructions title="Title" instructions="Lorum." />
    <PokeCard />
  </div>
</template>

<script>
import Instructions from '@/components/Instructions.vue';
import PokeCard from '@/components/PokeCard.vue';

export default {
  name: 'Main',
  components: {
    Instructions,
    PokeCard
  },
  data: () => {
    return {};
  },
  methods: {}
};
</script>
