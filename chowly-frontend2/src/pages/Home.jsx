import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import { GiChopsticks, GiCupcake, GiHamburger, GiSodaCan, GiPizzaSlice, GiLeafSwirl } from "react-icons/gi";
import { HiOutlineViewGrid, HiOutlineTruck, HiOutlineLocationMarker, HiOutlineBadgeCheck, HiOutlineShieldCheck } from "react-icons/hi";
import Layout from "../components/Layout";
import RestaurantCard from "../components/RestaurantCard";
import Cart from "../components/Cart";
import useFetch from "../hooks/useFetch";
import restaurantApi from "../api/restaurantApi";
import { restaurants as mockRestaurants, categories } from "../mock/mockData";
import { normalizeRestaurants } from "../mock/normalize";

const categoryIcons = {
  all: HiOutlineViewGrid,
  local: GiChopsticks,
  pizza: GiPizzaSlice,
  burgers: GiHamburger,
  drinks: GiSodaCan,
  desserts: GiCupcake,
  healthy: GiLeafSwirl,
};

export default function Home() {
  // Backend only has GET /api/restaurants (no /popular or /featured) - so we
  // fetch the full list once and derive both sections from it client-side.
  const { data, loading } = useFetch(
    (signal) => restaurantApi.getAll({ signal }),
    [],
    { fallback: mockRestaurants }
  );

  const allRestaurants =
    Array.isArray(data) && data.length ? normalizeRestaurants(data) : mockRestaurants;

  const popularList = useMemo(
    () => [...allRestaurants].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)),
    [allRestaurants]
  );
  // No "featured" flag exists on the backend yet - showing a different slice
  // of the same list for now. Add a `featured` field to RestaurantResponse
  // to make this a real, distinct section.
  const featuredList = useMemo(() => [...allRestaurants].reverse(), [allRestaurants]);

  return (
    <Layout>
      <div className="flex gap-6">
        <div className="min-w-0 flex-1 space-y-10">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-2xl bg-ink-900">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1600&auto=format&fit=crop"
                alt="Delicious food"
                className="h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/80 to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col gap-4 px-8 py-14 sm:px-12 sm:py-16">
              <h1 className="max-w-lg text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Delicious meals, delivered <span className="text-brand-400">fast</span>
              </h1>
              <p className="max-w-md text-sm text-ink-200 sm:text-base">
                Your favourite restaurants, to your doorstep.
              </p>
              <Link to="/restaurants" className="btn-primary mt-2 w-fit">
                Order Now <HiOutlineArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Popular restaurants */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-ink-900">Popular Restaurants</h2>
              <Link to="/restaurants" className="text-sm font-semibold text-brand-500 hover:text-brand-600">
                View all
              </Link>
            </div>
            {loading ? (
              <p className="text-sm text-ink-400">Loading restaurants...</p>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {popularList.slice(0, 4).map((r) => (
                  <RestaurantCard key={r.id} restaurant={r} />
                ))}
              </div>
            )}
          </section>

          {/* Top categories */}
          <section>
            <h2 className="mb-4 text-xl font-extrabold text-ink-900">Top Categories</h2>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7">
              {categories.map((cat) => {
                const Icon = categoryIcons[cat.id] || HiOutlineViewGrid;
                return (
                  <Link
                    key={cat.id}
                    to={`/restaurants?category=${cat.id}`}
                    className="card flex flex-col items-center gap-2 px-3 py-5 text-center transition hover:shadow-pop hover:border-brand-200"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand-500">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-xs font-semibold text-ink-700">{cat.name}</span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Featured restaurants */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-ink-900">Featured Restaurants</h2>
              <Link to="/restaurants" className="text-sm font-semibold text-brand-500 hover:text-brand-600">
                View all
              </Link>
            </div>
            {loading ? (
              <p className="text-sm text-ink-400">Loading restaurants...</p>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {featuredList.slice(0, 4).map((r) => (
                  <RestaurantCard key={r.id} restaurant={r} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right rail */}
        <div className="hidden w-80 shrink-0 flex-col gap-6 xl:flex">
          <Cart />
          <div className="card p-5">
            <h3 className="mb-3 font-bold text-ink-900">Why choose Chowly?</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <HiOutlineTruck className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                <div>
                  <p className="font-semibold text-ink-800">Fast Delivery</p>
                  <p className="text-xs text-ink-400">Quick delivery at your doorstep</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                <div>
                  <p className="font-semibold text-ink-800">Live Tracking</p>
                  <p className="text-xs text-ink-400">Track your order in real time</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <HiOutlineBadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                <div>
                  <p className="font-semibold text-ink-800">Best Restaurants</p>
                  <p className="text-xs text-ink-400">Handpicked top rated restaurants</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <HiOutlineShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                <div>
                  <p className="font-semibold text-ink-800">Demo Payments</p>
                  <p className="text-xs text-ink-400">Pretend payment only — for demo purposes</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
