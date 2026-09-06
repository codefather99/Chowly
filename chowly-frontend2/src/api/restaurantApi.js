import createCrudApi from "./createCrudApi";

// Matches RestaurantController exactly: POST /, GET /, GET /{id}, PUT /{id}, DELETE /{id}
// There is no /popular, /featured, or /search endpoint on the backend -
// pages that need "popular"/"featured" derive it client-side from getAll().
const restaurantApi = createCrudApi("/restaurants");

export default restaurantApi;
