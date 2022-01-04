import { AuthService } from "../../services";

const actions = {
  async login({ commit }, data) {
    const user = await AuthService.login(data);
    commit("SET_USER", user);
    commit("SET_ACCESS_TOKEN", user.access_token);
    return user;
  },
  logout({ commit }) {
    commit("RESET_USER");
  },
};

export default actions;
