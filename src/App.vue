<template>
  <Header />
  <Navbar class="mb-5" />
  <router-view />
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Header,
    Navbar
  }
};
</script>

<style></style>
