// The assignment requires "two roles... a simple switch is enough" - no
// login. This just persists which role the current browser is acting as.
const ROLE_KEY = "chowly_role";

export function getRole() {
  return localStorage.getItem(ROLE_KEY) || "customer";
}

export function setRole(role) {
  localStorage.setItem(ROLE_KEY, role);
}
