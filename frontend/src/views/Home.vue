<template>
  <v-container>
    <v-app-bar color="deep-blue accent-4 mb-5" dense dark>
      <v-toolbar-title>All Party</v-toolbar-title>

      <v-spacer></v-spacer>

      <create-party-component></create-party-component>
      <v-btn icon color="red darken-1" @click="logout()">
        <v-icon left> mdi-logout </v-icon>
      </v-btn>
    </v-app-bar>
    <v-row v-if="party.length === 0" dense>
      <v-alert
        border="bottom"
        color="blue-grey"
        dark
        class="text-center"
        style="width: 100%"
      >
        No available party
      </v-alert>
    </v-row>
    <v-row v-else dense>
      <v-col v-for="(item, index) in party" :key="index" sm="6" md="4" lg="3">
        <party-component :party="item"></party-component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PartyComponent from "../components/Party.component.vue";
import CreatePartyComponent from "../components/CreateParty.component.vue";
import { PartyService } from "../services";
export default {
  name: "Home",
  components: {
    PartyComponent,
    CreatePartyComponent,
  },
  async mounted() {
    this.$eventBus.$on("reload-all-party", async () => {
      await this.initial();
    });
    await this.initial();
  },
  data() {
    return {
      party: [],
    };
  },
  methods: {
    async initial() {
      const request = await PartyService.get();
      this.party = request.data;
    },
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push("/login");
    },
  },
  beforeDestroy() {
    this.$eventBus.$off("reload-all-party");
  },
};
</script>
