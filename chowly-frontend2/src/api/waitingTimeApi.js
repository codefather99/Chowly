import api from "./axios";

// Matches WaitingTimeController exactly: only GET /waiting-times/order/{orderId} exists
const waitingTimeApi = {
  getByOrder: (orderId, config) => api.get(`/waiting-times/order/${orderId}`, config),
};

export default waitingTimeApi;
