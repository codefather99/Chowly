import React, { useState } from "react";
import Layout from "../components/Layout";
import OrderCard from "../components/OrderCard";
import useFetch from "../hooks/useFetch";
import orderApi from "../api/orderApi";
import { orders as mockOrders } from "../mock/mockData";
import { getStoredCustomerId } from "../session";
import { normalizeOrders } from "../mock/normalize";

const tabs = ["All", "On the way", "Delivered", "Cancelled"];

export default function Orders() {
  const [tab, setTab] = useState("All");
  const customerId = getStoredCustomerId();

  const { data, loading } = useFetch(
    (signal) =>
      customerId
        ? orderApi.getByCustomer(customerId, { signal })
        : Promise.resolve({ data: [] }),
    [customerId],
    { fallback: customerId ? [] : mockOrders }
  );

  const list = Array.isArray(data) && data.length ? normalizeOrders(data) : customerId ? [] : mockOrders;
  const filtered = tab === "All" ? list : list.filter((o) => o.status === tab);

  return (
    <Layout>
      <h1 className="mb-6 text-2xl font-extrabold text-ink-900">My Orders</h1>

      {!customerId && (
        <div className="mb-6 rounded-2xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
          You haven't placed an order yet, so there's no customer profile linked to this
          browser. Showing sample orders below — place your first order to see real ones.
        </div>
      )}

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === t
                ? "bg-brand-500 text-white"
                : "bg-white text-ink-600 border border-ink-200 hover:bg-ink-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="py-16 text-center text-ink-400">Loading orders...</p>
      ) : filtered.length === 0 ? (
        <p className="py-16 text-center text-ink-400">No orders in this category yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </Layout>
  );
}
