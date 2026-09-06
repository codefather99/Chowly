import React from "react";
import { Link } from "react-router-dom";
import { HiStar, HiOutlineHeart, HiOutlineLocationMarker } from "react-icons/hi";
import { formatNaira } from "../mock/mockData";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop";

export default function RestaurantCard({ restaurant }) {
  if (!restaurant) return null;

  const { id, name = "Unnamed Restaurant", location, rating, tags = [], eta, deliveryFee, image } =
    restaurant;

  return (
    <Link
      to={`/restaurants/${id}`}
      className="card group overflow-hidden transition hover:shadow-pop"
    >
      <div className="relative h-40 w-full overflow-hidden bg-ink-100">
        <img
          src={image || FALLBACK_IMAGE}
          alt={name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink-500 shadow-card hover:text-brand-500"
        >
          <HiOutlineHeart className="h-4.5 w-4.5" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-ink-900">{name}</h3>
          {rating != null && (
            <span className="flex items-center gap-1 text-sm font-semibold text-ink-800">
              <HiStar className="h-4 w-4 text-yellow-400" />
              {rating}
            </span>
          )}
        </div>
        {location && (
          <p className="mt-1 flex items-center gap-1 text-xs text-ink-400">
            <HiOutlineLocationMarker className="h-3.5 w-3.5" />
            {location}
          </p>
        )}
        {(eta || deliveryFee != null) && (
          <div className="mt-3 flex items-center justify-between text-xs text-ink-400">
            {eta && <span>{eta}</span>}
            {deliveryFee != null && <span>{formatNaira(deliveryFee)} Delivery</span>}
          </div>
        )}
      </div>
    </Link>
  );
}
