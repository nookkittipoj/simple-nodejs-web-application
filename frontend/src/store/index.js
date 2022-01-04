import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import user from "./user";

Vue.use(Vuex);

const modules = {
  user,
};

const vuexStorage = new VuexPersist({
  key: "storageVuex",
  storage: window.localStorage,
  reducer: (state) => ({
    user: state.user,
  }),
});

export default new Vuex.Store({
  modules,
  plugins: [vuexStorage.plugin],
});
