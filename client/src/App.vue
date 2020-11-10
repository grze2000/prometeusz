<template>
  <v-app class="app supertest">
    <router-view></router-view>
    <snackbar></snackbar>
  </v-app>
</template>

<script>
import Snackbar from './components/Snackbar.vue';

export default {
  name: 'App',
  components: {
    Snackbar
  },
  data: () => ({
    //
  }),
};
</script>