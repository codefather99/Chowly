import createCrudApi from "./createCrudApi";

// Matches CustomerController exactly: POST /, GET /, GET /{id}, PUT /{id}, DELETE /{id}
// There is no login/register/me endpoint on the backend - see src/session.js
// for how the frontend establishes "who the current customer is" without auth.
const customerApi = createCrudApi("/customers");

export default customerApi;
