import api from "./axios";

// Matches CustomerComplaintController exactly - there's no GET-all, PUT, or DELETE on the backend
const complaintApi = {
  getById: (complaintId, config) => api.get(`/complaints/${complaintId}`, config),
  getByCustomer: (customerId, config) => api.get(`/complaints/customer/${customerId}`, config),
  getByRestaurant: (restaurantId, config) => api.get(`/complaints/restaurant/${restaurantId}`, config),
  getByStatus: (complaintStatus, config) => api.get(`/complaints/status/${complaintStatus}`, config),
  // Body shape assumed to match CreateComplaintRequest: { orderId, customerId, restaurantId, reason, details }
  create: (data) => api.post("/complaints", data),
  updateStatus: (complaintId, complaintStatus) =>
    api.patch(`/complaints/${complaintId}/status`, { complaintStatus }),
};

export default complaintApi;
