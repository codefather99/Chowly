import api from "./axios";

/**
 * Generic CRUD factory so each resource file stays tiny and consistent.
 * Usage: const restaurantApi = createCrudApi("/restaurants");
 */
export default function createCrudApi(basePath) {
  return {
    getAll: (params) => api.get(basePath, { params }),
    getById: (id) => api.get(`${basePath}/${id}`),
    create: (data) => api.post(basePath, data),
    update: (id, data) => api.put(`${basePath}/${id}`, data),
    patch: (id, data) => api.patch(`${basePath}/${id}`, data),
    remove: (id) => api.delete(`${basePath}/${id}`),
  };
}
