import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HiOutlineSearch, HiOutlineAdjustments } from "react-icons/hi";
import Layout from "../components/Layout";
import RestaurantCard from "../components/RestaurantCard";
import useFetch from "../hooks/useFetch";
import restaurantApi from "../api/restaurantApi";
import { restaurants as mockRestaurants, categories } from "../mock/mockData";
import { normalizeRestaurants } from "../mock/normalize";

export default function Restaurants() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "all";
  const [localQuery, setLocalQuery] = useState(query);

  const { data } = useFetch(
    (signal) => restaurantApi.getAll({ signal }),
    [],
    { fallback: mockRestaurants }
  );

  const list =
    Array.isArray(data) && data.length ? normalizeRestaurants(data) : mockRestaurants;

  const filtered = useMemo(() => {
    return list.filter((r) => {
      const matchesQuery = query
        ? r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
        : true;
      const matchesCategory =
        category === "all" ? true : r.tags.some((t) => t.toLowerCase().includes(category));
      return matchesQuery && matchesCategory;
    });
  }, [list, query, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (localQuery) next.set("query", localQuery);
    else next.delete("query");
    setSearchParams(next);
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-extrabold text-ink-900">Restaurants</h1>
        <form onSubmit={handleSearch} className="flex w-full max-w-sm gap-2">
          <div className="relative flex-1">
            <HiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search restaurants or cuisine..."
              className="input pl-10"
            />
          </div>
          <button className="btn-secondary !px-3">
            <HiOutlineAdjustments className="h-5 w-5" />
          </button>
        </form>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              const next = new URLSearchParams(searchParams);
              next.set("category", cat.id);
              setSearchParams(next);
            }}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              category === cat.id
                ? "bg-brand-500 text-white"
                : "bg-white text-ink-600 border border-ink-200 hover:bg-ink-50"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-ink-400">No restaurants match your search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      )}
    </Layout>
  );
}
