import api from "./axios";
import createCrudApi from "./createCrudApi";

// Matches MenuController: POST /, GET /, GET /{id}, GET /restaurant/{restaurantId}, PUT /{id}, DELETE /{id}
const base = createCrudApi("/menus");

const menuApi = {
  ...base,
  getByRestaurant: (restaurantId, config) =>
    api.get(`/menus/restaurant/${restaurantId}`, config),
};

export default menuApi;
