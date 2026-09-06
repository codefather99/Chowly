import api from "./axios";
import createCrudApi from "./createCrudApi";

// Matches MenuItemController: POST /, GET /, GET /{id}, GET /menu/{menuId}, PUT /{id}, DELETE /{id}
// NOTE: there is no restaurant-scoped endpoint on the backend. To list every
// item on a restaurant's menu, first fetch its menus (menuApi.getByRestaurant)
// then fetch items per menu with getByMenu and flatten - see RestaurantMenu.jsx.
const base = createCrudApi("/menu-items");

const menuItemApi = {
  ...base,
  getByMenu: (menuId, config) => api.get(`/menu-items/menu/${menuId}`, config),
};

export default menuItemApi;
