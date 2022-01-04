<template>
  <v-container fill-height fluid>
    <v-row align="stretch" justify="center">
      <v-col cols="12" align="stretch" justify="center">
        <v-card class="mx-auto" max-width="370" outlined>
          <v-card-title class="title font-weight-regular justify-center">
            <center>Register</center>
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation class="pa-5">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :loading="isLoading"
              :disabled="isLoading"
              label="Email"
              auto-grow
              required
              autocomplete="off"
            />
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :loading="isLoading"
              :disabled="isLoading"
              label="Password"
              auto-grow
              required
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
            <v-text-field
              v-model="confirmPassword"
              :rules="confirmPasswordRules"
              :loading="isLoading"
              :disabled="isLoading"
              label="Confirm Password"
              auto-grow
              required
              :type="showConfirmPassword ? 'text' : 'password'"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showConfirmPassword = !showConfirmPassword"
            />
            <v-checkbox
              v-model="checkbox"
              :rules="[(v) => !!v || 'You must agree to continue']"
              label="Accept terms"
              required
            ></v-checkbox>
          </v-form>
          <v-divider />
          <v-card-actions class="d-flex justify-center">
            <v-btn
              raised
              color="primary"
              :loading="isLoading"
              :disabled="isLoading"
              @click="submit"
            >
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { AuthService } from "../services";
import { validationMixin } from "vuelidate";
export default {
  mixins: [validationMixin],
  components: {},
  data: () => ({
    valid: false,
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    isLoading: false,
    checkbox: false,
  }),
  computed: {
    emailRules() {
      return [
        (v) => !!v || "Please type email",
        (v) => /.+@.+\..+/.test(v) || "Email is not valid",
      ];
    },
    passwordRules() {
      return [
        (value) => !!value || "Please type password",
        (value) => (value && value.length >= 8) || "minimum 8 characters",
      ];
    },
    confirmPasswordRules() {
      return [
        (value) => !!value || "Please type confirm password",
        (value) =>
          value === this.password || "The password confirmation does not match",
      ];
    },
  },
  methods: {
    async submit() {
      this.isLoading = true;
      await this.$refs.form.validate();
      if (this.valid) {
        try {
          await AuthService.register({
            email: this.email,
            password: this.password,
            password_confirm: this.confirmPassword,
          });
          this.$router.push("/login");
        } catch (e) {
          this.$eventBus.$emit("show-sncakbar", e.message, "error");
        }
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.loginCard {
  padding: 20px;
}
</style>
