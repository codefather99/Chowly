// There's no auth/login endpoint on the backend yet (no AuthController),
// so there's no real "logged-in user". Until that exists, we fake a
// "current customer" by remembering a chosen customer id from GET
// /api/customers in localStorage. Swap this out once real auth exists.

const KEY = "chowly_customer_id";

export function getCustomerId() {
  return localStorage.getItem(KEY);
}

export function setCustomerId(id) {
  if (id) localStorage.setItem(KEY, id);
}

export function clearCustomerId() {
  localStorage.removeItem(KEY);
}
