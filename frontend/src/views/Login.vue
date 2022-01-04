<template>
  <v-container fill-height fluid>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="pa-2" :loading="loading">
            <v-card-title class="headline"> </v-card-title>
            <v-card-subtitle class="pt-4">
              <v-row row>
                <v-col cols="12">
                  <b>Email</b>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    auto-grow
                    :rules="emailRules"
                    :loading="loading"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <b>Password</b>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    auto-grow
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :loading="loading"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  />
                </v-col>
              </v-row>
            </v-card-subtitle>
            <v-card-actions class="align-right d-flex flex-column">
              <v-row>
                <v-col>
                  <v-btn
                    depressed
                    color="primary"
                    :loading="loading"
                    @click="login"
                  >
                    Login
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn depressed @click="register"> Register </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    showPassword: false,
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length >= 8 || "Password must be 8 characters or more",
    ],
    loading: false,
    loadpagefinish: false,
  }),
  async mounted() {},
  methods: {
    register() {
      this.$router.push("/register");
    },
    async login() {
      this.loading = true;
      try {
        await this.$store.dispatch("user/login", {
          email: this.email,
          password: this.password,
        });
        this.$router.push("/");
      } catch (error) {
        this.$eventBus.$emit("show-sncakbar", error.message, "error");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
