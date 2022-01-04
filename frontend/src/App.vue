<template>
  <v-app>
    <v-main>
      <router-view />
      <snackbar />
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from "./components/Snackbar.component.vue";
export default {
  name: "App",
  components: {
    Snackbar,
  },
};
</script>
