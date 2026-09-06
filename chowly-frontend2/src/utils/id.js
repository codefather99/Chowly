// Several entities in the Chowly schema use client-generated string IDs
// (CustomerRequest.customerId, RestaurantRequest.restaurantId, etc. are all
// @NotBlank in the request DTOs) rather than DB-generated ones. This produces
// a reasonably unique, prefixed id for those cases.
export function generateId(prefix = "ID") {
  const uuid =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${prefix}-${uuid}`;
}
