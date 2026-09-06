import api from "./axios";

// Matches RatingController exactly - there's no GET-all on the backend
const ratingApi = {
  getById: (ratingId, config) => api.get(`/ratings/${ratingId}`, config),
  getByOrder: (orderId, config) => api.get(`/ratings/order/${orderId}`, config),
  getByCustomer: (customerId, config) => api.get(`/ratings/customer/${customerId}`, config),
  getByRestaurant: (restaurantId, config) => api.get(`/ratings/restaurant/${restaurantId}`, config),
  getFiveStarByRestaurant: (restaurantId, config) =>
    api.get(`/ratings/restaurant/${restaurantId}/five-star`, config),
  // Body shape assumed to match CreateRatingRequest: { orderId, customerId, restaurantId, rating, comment }
  create: (data) => api.post("/ratings", data),
  update: (ratingId, data) => api.put(`/ratings/${ratingId}`, data),
  remove: (ratingId) => api.delete(`/ratings/${ratingId}`),
};

export default ratingApi;
