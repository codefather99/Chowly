import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineClock, HiOutlineChevronRight } from "react-icons/hi";
import { formatNaira } from "../mock/mockData";

const statusStyles = {
  "On the way": "bg-brand-50 text-brand-600",
  Delivered: "bg-green-50 text-green-600",
  Cancelled: "bg-red-50 text-red-500",
  Preparing: "bg-blue-50 text-blue-600",
  Pending: "bg-ink-100 text-ink-500",
};

export default function OrderCard({ order }) {
  const dateStr = new Date(order.date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link
      to={`/orders/${order.id}`}
      className="card flex items-center justify-between gap-4 p-4 transition hover:shadow-pop"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-semibold text-ink-900">{order.restaurantName}</p>
          <span className={`badge ${statusStyles[order.status] || "bg-ink-100 text-ink-500"}`}>
            {order.status}
          </span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-ink-400">
          <HiOutlineClock className="h-3.5 w-3.5" />
          {dateStr}
        </p>
        <p className="mt-1 text-xs text-ink-400">
          {order.id} • {order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-ink-900">{formatNaira(order.total)}</span>
        <HiOutlineChevronRight className="h-5 w-5 text-ink-300" />
      </div>
    </Link>
  );
}
