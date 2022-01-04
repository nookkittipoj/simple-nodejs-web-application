import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = () => {
  return {
    accessToken: null,
    user: {},
  };
};

const namespaced = true;

export default {
  namespaced,
  actions,
  getters,
  mutations,
  state,
};
