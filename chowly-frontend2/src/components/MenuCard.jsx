import React from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { formatNaira } from "../mock/mockData";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop";

export default function MenuCard({ item, onAdd }) {
  return (
    <div className="card group overflow-hidden transition hover:shadow-pop">
      <div className="relative h-36 w-full overflow-hidden">
        <img
          src={item.image || FALLBACK_IMAGE}
          alt={item.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {item.category && (
          <span className="badge absolute left-3 top-3 bg-white/90 text-ink-700">
            {item.category}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-ink-900">{item.name}</h3>
        {item.description && (
          <p className="mt-1 line-clamp-2 text-xs text-ink-500">{item.description}</p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-brand-600">
            {formatNaira(item.price)}
          </span>
          <button
            onClick={() => onAdd?.(item)}
            className="grid h-9 w-9 place-items-center rounded-full bg-brand-500 text-white shadow-card transition hover:bg-brand-600"
            aria-label={`Add ${item.name} to cart`}
          >
            <HiOutlinePlus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
