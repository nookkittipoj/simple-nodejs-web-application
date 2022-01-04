<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn tile color="green darken-1" v-bind="attrs" v-on="on">
        <v-icon left> mdi-plus </v-icon>
        Create Party
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation class="pa-5">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :loading="isLoading"
            :disabled="isLoading"
            label="Party Name"
            auto-grow
            required
            autocomplete="off"
          />
          <v-text-field
            v-model="memberLimit"
            :rules="memberLimitReuls"
            :loading="isLoading"
            :disabled="isLoading"
            label="Member Limit"
            auto-grow
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn raised @click="dialog = false"> Close </v-btn>
        <v-btn
          raised
          color="green lighten-1"
          class="white--text"
          @click="create"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { PartyService } from "../services/index";
export default {
  data: () => ({
    valid: false,
    dialog: false,
    isLoading: false,
    name: "",
    nameRules: [(value) => !!value || "Please type party name"],
    memberLimit: null,
    memberLimitReuls: [
      (value) => !!value || "Please member limit",
      (value) =>
        (value && Number.isInteger(Number(value))) || "Please type number",
      (value) => (value > 0 && value <= 10) || "Maximun 10 Members ",
    ],
  }),
  watch: {
    dialog(val) {
      if (val) {
        if (this.$refs.form) {
          this.$refs.form.reset();
        }
      }
    },
  },
  methods: {
    async create() {
      Number.isInteger();
      this.isLoading = true;
      await this.$refs.form.validate();
      if (this.valid) {
        try {
          await PartyService.create({
            name: this.name,
            member_limit: this.memberLimit,
          });
          this.$eventBus.$emit("reload-all-party");
        } catch (e) {
          this.$eventBus.$emit("show-sncakbar", e.message, "error");
        } finally {
          this.dialog = false;
        }
      }
      this.isLoading = false;
    },
  },
};
</script>
