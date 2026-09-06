import api from "./axios";

// Matches PaymentController exactly - there's no GET-all, PUT, or DELETE on the backend
const paymentApi = {
  getById: (paymentId, config) => api.get(`/payments/${paymentId}`, config),
  getByOrder: (orderId, config) => api.get(`/payments/order/${orderId}`, config),
  getByStatus: (paymentStatus, config) => api.get(`/payments/status/${paymentStatus}`, config),
  // Body shape assumed to match CreatePaymentRequest: { orderId, amount, paymentMethod }
  create: (data) => api.post("/payments", data),
  updateStatus: (paymentId, paymentStatus) =>
    api.patch(`/payments/${paymentId}/status`, null, { params: { paymentStatus } }),
};

export default paymentApi;
