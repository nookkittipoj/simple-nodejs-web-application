import service from "../api.service";
const url = "auth";

const Auth = {
  get() {
    return service.get(`${url}/me`);
  },
  login(data) {
    return service.post(`${url}/login`, data);
  },
  register(data) {
    return service.post(`${url}/register`, data);
  },
  logout() {
    return service.post(`${url}/logout`);
  },
};

export default Auth;
