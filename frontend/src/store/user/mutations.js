const mutations = {
  SET_USER: (state, user) => {
    console.log("set user");
    state.user = user;
  },
  SET_ACCESS_TOKEN: (state, token) => {
    state.accessToken = token;
  },
  RESET_USER: (state) => {
    state.user = {};
    state.accessToken = null;
  },
};

export default mutations;
