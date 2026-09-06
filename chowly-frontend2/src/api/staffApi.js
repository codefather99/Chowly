import api from "./axios";
import createCrudApi from "./createCrudApi";

// Matches StaffController: POST /, GET /, GET /{id}, GET /restaurant/{restaurantId}, PUT /{id}, DELETE /{id}
const base = createCrudApi("/staff");

const staffApi = {
  ...base,
  getByRestaurant: (restaurantId, config) =>
    api.get(`/staff/restaurant/${restaurantId}`, config),
};

export default staffApi;
