// Normalizes a restaurant object from ANY source (real API or mock) into the
// shape the UI expects. RestaurantRequest only has
// { restaurantId, restaurantName, location } - so a real RestaurantResponse
// is assumed to be just as lean. Fields the schema doesn't have (rating, eta,
// deliveryFee, image, tags) are left undefined/empty rather than faked, and
// components only render them when present.
export function normalizeRestaurant(r, index = 0) {
  if (!r) return null;
  const location = r.location ?? null;
  return {
    id: r.id ?? r.restaurantId ?? `restaurant-${index}`,
    name: r.name ?? r.restaurantName ?? "Unnamed Restaurant",
    location,
    // Not in the schema yet - left undefined so components can hide them
    // instead of showing a fabricated number. Wire these up once you add
    // an aggregated rating (via RatingController) or extra fields to
    // RestaurantResponse.
    rating: r.rating ?? r.averageRating ?? undefined,
    tags: Array.isArray(r.tags) ? r.tags : location ? [location] : [],
    eta: r.eta ?? r.estimatedDeliveryTime ?? undefined,
    deliveryFee: r.deliveryFee ?? undefined,
    image: r.image ?? r.imageUrl ?? undefined,
  };
}

export function normalizeRestaurants(list) {
  if (!Array.isArray(list)) return [];
  return list.map((r, i) => normalizeRestaurant(r, i)).filter(Boolean);
}

// Normalizes an order object from the backend. OrderResponse fields are
// unknown beyond what CreateOrderRequest implies (customerId, restaurantId,
// items) - share the actual OrderResponse DTO to tighten this further.
export function normalizeOrder(o, index = 0) {
  if (!o) return null;
  return {
    id: o.id ?? o.orderId ?? `order-${index}`,
    restaurantName: o.restaurantName ?? o.restaurant?.restaurantName ?? "Restaurant",
    status: o.status ?? o.orderStatus ?? "Pending",
    total: o.total ?? o.totalAmount ?? o.totalPrice ?? 0,
    itemsCount: o.itemsCount ?? o.items?.length ?? 0,
    date: o.date ?? o.createdAt ?? o.orderDate ?? new Date().toISOString(),
  };
}

export function normalizeOrders(list) {
  if (!Array.isArray(list)) return [];
  return list.map((o, i) => normalizeOrder(o, i)).filter(Boolean);
}

// Normalizes a menu item. MenuItemRequest is
// { menuItemId, menuId, itemName, price, itemType } - so a real
// MenuItemResponse is assumed to mirror that.
export function normalizeMenuItem(item, categoryFallback, index = 0) {
  if (!item) return null;
  return {
    id: item.id ?? item.menuItemId ?? `item-${index}`,
    name: item.name ?? item.itemName ?? "Menu Item",
    price: Number(item.price ?? 0),
    category: item.category ?? item.itemType ?? categoryFallback ?? "Menu",
    image: item.image ?? item.imageUrl ?? undefined,
    description: item.description ?? "",
  };
}
