import service from "../api.service";
const url = "party";

const Party = {
  get() {
    return service.get(url);
  },
  show(id) {
    return service.get(`${url}/${id}`);
  },
  create(data) {
    return service.post(url, data);
  },
  update(id, data) {
    return service.put(`${url}/${id}`, data);
  },
  delete(id) {
    return service.delete(`${url}/${id}`);
  },
  join(data) {
    return service.post(`${url}/join`, data);
  },
  leave1(data) {
    return service.post(`${url}/leave`, data);
  },
};

export default Party;
