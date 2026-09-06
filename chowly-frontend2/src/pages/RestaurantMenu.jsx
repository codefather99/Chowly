import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { HiStar, HiOutlineLocationMarker } from "react-icons/hi";
import Layout from "../components/Layout";
import MenuCard from "../components/MenuCard";
import Cart from "../components/Cart";
import restaurantApi from "../api/restaurantApi";
import menuApi from "../api/menuApi";
import menuItemApi from "../api/menuItemApi";
import { useCart } from "../context/CartContext";
import { normalizeRestaurant, normalizeMenuItem } from "../mock/normalize";
import { restaurants as mockRestaurants, menuItemsByRestaurant } from "../mock/mockData";

// The backend only exposes menu items *per menu* (GET /menu-items/menu/{menuId}),
// not per restaurant. So loading a restaurant's full menu is a two-step fetch:
// 1) get its menus, 2) get the items for each menu, then flatten + tag each
// item with its menu's name (MenuRequest.menuName) so we can still group by
// category in the UI.
function useRestaurantMenu(restaurantId) {
  const [state, setState] = useState({ loading: true, error: null, items: [] });

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const { data: menus } = await menuApi.getByRestaurant(restaurantId, {
          signal: controller.signal,
        });
        const menuList = Array.isArray(menus) ? menus : [];

        const itemsPerMenu = await Promise.all(
          menuList.map((menu) =>
            menuItemApi
              .getByMenu(menu.id ?? menu.menuId, { signal: controller.signal })
              .then((res) => (Array.isArray(res.data) ? res.data : []))
              .then((items, i) =>
                items.map((item, idx) =>
                  normalizeMenuItem(item, menu.menuName ?? menu.name, idx)
                )
              )
              .catch(() => [])
          )
        );

        if (!cancelled) {
          setState({ loading: false, error: null, items: itemsPerMenu.flat() });
        }
      } catch (err) {
        if (!cancelled && err?.name !== "CanceledError" && err?.name !== "AbortError") {
          setState({ loading: false, error: err, items: [] });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [restaurantId]);

  return state;
}

export default function RestaurantMenu() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [restaurant, setRestaurant] = useState(null);
  const { loading, error, items: rawItems } = useRestaurantMenu(id);

  useEffect(() => {
    const controller = new AbortController();
    restaurantApi
      .getById(id, { signal: controller.signal })
      .then((res) => setRestaurant(normalizeRestaurant(res.data)))
      .catch(() => setRestaurant(null));
    return () => controller.abort();
  }, [id]);

  const restaurantData =
    restaurant || normalizeRestaurant(mockRestaurants.find((r) => r.id === id) || mockRestaurants[0]);

  const usingFallbackItems = !loading && (error || rawItems.length === 0);
  const items = usingFallbackItems ? menuItemsByRestaurant[id] || menuItemsByRestaurant.r1 : rawItems;

  const menuCategories = useMemo(
    () => ["All", ...new Set(items.map((i) => i.category))],
    [items]
  );
  const visibleItems =
    activeCategory === "All" ? items : items.filter((i) => i.category === activeCategory);

  const handleAdd = (item) => addItem(item, restaurantData.id, restaurantData.name);

  return (
    <Layout>
      <div className="mb-6 overflow-hidden rounded-2xl">
        <div className="relative h-48 w-full sm:h-64">
          <img
            src={
              restaurantData.image ||
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1600&auto=format&fit=crop"
            }
            alt={restaurantData.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-6 sm:left-6">
            <h1 className="text-2xl font-extrabold sm:text-3xl">{restaurantData.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
              {restaurantData.rating != null && (
                <span className="flex items-center gap-1 font-semibold">
                  <HiStar className="h-4 w-4 text-yellow-400" />
                  {restaurantData.rating}
                </span>
              )}
              {restaurantData.location && (
                <span className="flex items-center gap-1">
                  <HiOutlineLocationMarker className="h-4 w-4" />
                  {restaurantData.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="min-w-0 flex-1">
          {loading ? (
            <p className="py-10 text-center text-ink-400">Loading menu...</p>
          ) : (
            <>
              <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
                {menuCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeCategory === cat
                        ? "bg-brand-500 text-white"
                        : "bg-white text-ink-600 border border-ink-200 hover:bg-ink-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visibleItems.map((item) => (
                  <MenuCard key={item.id} item={item} onAdd={handleAdd} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="hidden w-80 shrink-0 lg:block">
          <div className="sticky top-24">
            <Cart />
          </div>
        </div>
      </div>
    </Layout>
  );
}
