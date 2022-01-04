<template>
  <v-card class="mx-auto">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="require('../assets/img-dump.png')"
    >
    </v-img>

    <v-card-text class="text--primary">
      <span>{{ party.name }}</span>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <span>{{
        party.party_members.filter((member) => member.is_join).length
      }}</span>
      <span>/</span>
      <span>{{ party.member_limit }}</span>
      <v-spacer></v-spacer>
      <v-btn color="green lighten-3" v-if="handlePartyState" @click="join()">
        Join
      </v-btn>
      <v-btn color="grey lighten-1" v-else @click="leave()"> Leave </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { PartyService } from "../services";

export default {
  props: {
    party: {
      type: Object,
      require: true,
    },
  },
  computed: {
    handlePartyState() {
      const members = this.party.party_members;
      const user = this.$store.state.user.user;
      let canJoin = true;
      for (const member of members) {
        if (member.is_join && member.user_id == user.id) {
          canJoin = false;
          break;
        }
      }

      return canJoin;
    },
  },
  methods: {
    async getParty() {
      const request = await PartyService.show(this.party.id);
      this.party = request.data;
    },
    async join() {
      try {
        await PartyService.join({
          party_id: this.party.id,
        });
        await this.getParty();
        this.$forceUpdate();
      } catch (e) {
        this.$eventBus.$emit("show-sncakbar", e.message, "error");
      }
    },
    async leave() {
      try {
        await PartyService.leave1({
          party_id: this.party.id,
        });
        await this.getParty();
        this.$forceUpdate();
      } catch (e) {
        this.$eventBus.$emit("show-sncakbar", e.message, "error");
      }
    },
  },
};
</script>
