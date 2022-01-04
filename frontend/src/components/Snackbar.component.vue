<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      absolute
      top
      right
      :color="getColor()"
      text
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style></style>

<script>
export default {
  data() {
    return {
      snackbar: false,
      timeout: 2000,
      status: null,
      message: "",
    };
  },
  created() {
    this.$eventBus.$on("show-sncakbar", (message, status = null) => {
      this.snackbar = true;
      this.message = message;
      this.status = status;
    });
    this.$eventBus.$on("hide-snackbar", () => {
      this.snackbar = false;
    });
  },
  beforeDestroy() {
    this.$eventBus.$off("show-snackber");
    this.$eventBus.$off("hide-snackbar");
  },
  methods: {
    refreshPage() {
      this.snackbar = false;
    },
    getColor() {
      switch (this.status) {
        case "success":
          return "green";
        case "error":
          return "red";
        default:
          return "primary";
      }
    },
  },
};
</script>
