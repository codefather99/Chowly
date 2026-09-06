// There is no auth/login endpoint on the backend (CustomerController is plain
// CRUD, and CustomerRequest only has customerId/firstName/lastName/phoneNumber
// - no email or address). Until real auth exists, the frontend keeps a single
// "current customer" id in localStorage - created once via POST /api/customers
// the first time someone checks out, then reused on every subsequent visit.

const CUSTOMER_ID_KEY = "chowly_customer_id";
const CUSTOMER_PROFILE_KEY = "chowly_customer_profile";

export function getStoredCustomerId() {
  return localStorage.getItem(CUSTOMER_ID_KEY);
}

// profile: { firstName, lastName, phoneNumber }
export function setStoredCustomer(customerId, profile) {
  localStorage.setItem(CUSTOMER_ID_KEY, customerId);
  if (profile) localStorage.setItem(CUSTOMER_PROFILE_KEY, JSON.stringify(profile));
}

export function getStoredCustomerProfile() {
  try {
    const raw = localStorage.getItem(CUSTOMER_PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearStoredCustomer() {
  localStorage.removeItem(CUSTOMER_ID_KEY);
  localStorage.removeItem(CUSTOMER_PROFILE_KEY);
}
