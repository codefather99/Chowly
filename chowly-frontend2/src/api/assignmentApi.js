import api from "./axios";

// Matches OrderAssignmentController exactly (base path is /order-assignments, not /assignments)
const assignmentApi = {
  getById: (assignmentId, config) => api.get(`/order-assignments/${assignmentId}`, config),
  getByOrder: (orderId, config) => api.get(`/order-assignments/order/${orderId}`, config),
  getByStaff: (staffId, config) => api.get(`/order-assignments/staff/${staffId}`, config),
  // Body shape assumed to match OrderAssignmentRequest: { orderId, staffId }
  assignStaffToOrder: (orderId, staffId) =>
    api.post("/order-assignments", { orderId, staffId }),
  update: (assignmentId, data) => api.put(`/order-assignments/${assignmentId}`, data),
  remove: (assignmentId) => api.delete(`/order-assignments/${assignmentId}`),
};

export default assignmentApi;
