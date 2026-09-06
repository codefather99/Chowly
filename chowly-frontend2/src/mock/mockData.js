// Local fallback data so the UI renders nicely before the backend is wired up.
// Each page tries the real API first and falls back to this on failure.

export const categories = [
  { id: "all", name: "All", icon: "Grid" },
  { id: "local", name: "Local Dishes", icon: "Bowl" },
  { id: "pizza", name: "Pizza", icon: "Pizza" },
  { id: "burgers", name: "Burgers", icon: "Burger" },
  { id: "drinks", name: "Drinks", icon: "Cup" },
  { id: "desserts", name: "Desserts", icon: "Cake" },
  { id: "healthy", name: "Healthy", icon: "Leaf" },
];

export const restaurants = [
  {
    id: "r1",
    name: "Spice Route",
    rating: 4.8,
    tags: ["African", "Local"],
    eta: "30-40 min",
    deliveryFee: 1000,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "r2",
    name: "Mama's Kitchen",
    rating: 4.6,
    tags: ["Local", "African"],
    eta: "25-35 min",
    deliveryFee: 800,
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "r3",
    name: "Kona Grill",
    rating: 4.7,
    tags: ["Continental", "Grill"],
    eta: "35-45 min",
    deliveryFee: 1200,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "r4",
    name: "The Pasta Hub",
    rating: 4.5,
    tags: ["Italian", "Pasta"],
    eta: "25-35 min",
    deliveryFee: 900,
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "r5",
    name: "Grill Master",
    rating: 4.7,
    tags: ["Grills", "African"],
    eta: "30-40 min",
    deliveryFee: 1000,
    image:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "r6",
    name: "Buka Spot",
    rating: 4.6,
    tags: ["Local", "Nigerian"],
    eta: "25-35 min",
    deliveryFee: 700,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "r7",
    name: "Wok & Go",
    rating: 4.8,
    tags: ["Chinese", "Asian"],
    eta: "30-40 min",
    deliveryFee: 1100,
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "r8",
    name: "Burger Town",
    rating: 4.5,
    tags: ["Burgers", "Fast Food"],
    eta: "20-30 min",
    deliveryFee: 800,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
];

export const menuItemsByRestaurant = {
  r1: [
    { id: "m1", name: "Jollof Rice & Chicken", price: 4500, category: "Local Dishes", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop", description: "Smoky party jollof rice served with grilled chicken." },
    { id: "m2", name: "Grilled Chicken Platter", price: 6500, category: "Grills", image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=600&auto=format&fit=crop", description: "Char-grilled chicken with pepper sauce and plantain." },
    { id: "m3", name: "Zobo Drink", price: 2500, category: "Drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=600&auto=format&fit=crop", description: "Chilled hibiscus drink with ginger and pineapple." },
    { id: "m4", name: "Egusi Soup & Pounded Yam", price: 5200, category: "Local Dishes", image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=600&auto=format&fit=crop", description: "Rich melon-seed soup with assorted meat." },
  ],
};

export const orders = [
  {
    id: "ORD-10231",
    restaurantName: "Spice Route",
    status: "On the way",
    total: 18000,
    itemsCount: 3,
    date: "2026-09-05T18:24:00Z",
  },
  {
    id: "ORD-10190",
    restaurantName: "Wok & Go",
    status: "Delivered",
    total: 9800,
    itemsCount: 2,
    date: "2026-09-01T13:10:00Z",
  },
  {
    id: "ORD-10142",
    restaurantName: "Burger Town",
    status: "Cancelled",
    total: 5200,
    itemsCount: 1,
    date: "2026-08-27T20:45:00Z",
  },
];

export const currentUser = {
  id: "u1",
  name: "Amaka",
  email: "amaka@example.com",
  address: "Lekki Phase 1, Lagos",
  avatar:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
};

export const formatNaira = (amount) =>
  `₦${Number(amount || 0).toLocaleString("en-NG")}`;
