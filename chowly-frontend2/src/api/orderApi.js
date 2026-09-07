import api from "./axios";

// Matches OrderController exactly - see backend/OrderController.java
const orderApi = {
  getAll: (config) => api.get("/orders", config),
  getById: (id, config) => api.get(`/orders/${id}`, config),
  getByCustomer: (customerId, config) => api.get(`/orders/customer/${customerId}`, config),
  getByRestaurant: (restaurantId, config) => api.get(`/orders/restaurant/${restaurantId}`, config),
  getByStatus: (orderStatus, config) => api.get(`/orders/status/${orderStatus}`, config),
  // Matches CreateOrderRequest exactly: { customerId, restaurantId, items: [{menuItemId, quantity}] }
  placeOrder: (data) => api.post("/orders", data),
  updateStatus: (id, orderStatus) => api.patch(`/orders/${id}/status`, { orderStatus }),
  cancelOrder: (id) => api.patch(`/orders/${id}/cancel`),
};

export default orderApi;
