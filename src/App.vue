<template>
  <Header class="mb-3" />
  <router-view />
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  }
};
</script>

<style></style>
