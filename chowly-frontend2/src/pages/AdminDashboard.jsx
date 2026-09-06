import React from "react";
import {
  HiOutlineCurrencyDollar,
  HiOutlineShoppingBag,
  HiOutlineUserGroup,
  HiOutlineStar,
} from "react-icons/hi";
import Layout from "../components/Layout";
import OrderCard from "../components/OrderCard";
import useFetch from "../hooks/useFetch";
import orderApi from "../api/orderApi";
import { orders as mockOrders, formatNaira } from "../mock/mockData";
import { normalizeOrders } from "../mock/normalize";

const stats = [
  { label: "Total Revenue", value: formatNaira(482500), icon: HiOutlineCurrencyDollar, tone: "bg-brand-50 text-brand-500" },
  { label: "Total Orders", value: "236", icon: HiOutlineShoppingBag, tone: "bg-blue-50 text-blue-500" },
  { label: "Active Customers", value: "1,204", icon: HiOutlineUserGroup, tone: "bg-purple-50 text-purple-500" },
  { label: "Avg. Rating", value: "4.7", icon: HiOutlineStar, tone: "bg-yellow-50 text-yellow-500" },
];

export default function AdminDashboard() {
  const { data } = useFetch((signal) => orderApi.getAll({ signal }), [], {
    fallback: mockOrders,
  });
  const list = Array.isArray(data) && data.length ? normalizeOrders(data) : mockOrders;

  return (
    <Layout>
      <h1 className="mb-6 text-2xl font-extrabold text-ink-900">Admin Dashboard</h1>

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="card p-5">
            <span className={`mb-3 grid h-10 w-10 place-items-center rounded-xl ${tone}`}>
              <Icon className="h-5 w-5" />
            </span>
            <p className="text-xs text-ink-400">{label}</p>
            <p className="mt-1 text-2xl font-extrabold text-ink-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="mb-4 text-lg font-bold text-ink-900">Recent Orders</h2>
          <div className="flex flex-col gap-4">
            {list.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        <div className="card h-fit p-5">
          <h2 className="mb-4 font-bold text-ink-900">Top Restaurants</h2>
          <ul className="space-y-4 text-sm">
            {[
              { name: "Spice Route", orders: 84 },
              { name: "Wok & Go", orders: 61 },
              { name: "Burger Town", orders: 47 },
              { name: "Kona Grill", orders: 39 },
            ].map((r) => (
              <li key={r.name} className="flex items-center justify-between">
                <span className="font-medium text-ink-700">{r.name}</span>
                <span className="text-ink-400">{r.orders} orders</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
