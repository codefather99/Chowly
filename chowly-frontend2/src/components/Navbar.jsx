import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineShoppingCart,
  HiOutlineLocationMarker,
  HiChevronDown,
} from "react-icons/hi";
import { useCart } from "../context/CartContext";
import { currentUser } from "../mock/mockData";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/restaurants", label: "Restaurants" },
  { to: "/orders", label: "Orders" },
  { to: "/orders/track", label: "Track Order" },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/restaurants?query=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center gap-6 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-lg font-extrabold text-white">
            C
          </span>
          <span className="text-xl font-extrabold tracking-tight text-ink-900">
            Chowly
          </span>
        </NavLink>

        {/* Location picker */}
        <button className="hidden shrink-0 items-center gap-2 rounded-full border border-ink-200 px-3 py-2 text-left hover:bg-ink-50 md:flex">
          <HiOutlineLocationMarker className="h-5 w-5 text-brand-500" />
          <span className="leading-tight">
            <span className="block text-[11px] text-ink-400">Deliver to</span>
            <span className="flex items-center gap-1 text-sm font-semibold text-ink-800">
              {currentUser.address}
              <HiChevronDown className="h-4 w-4 text-ink-400" />
            </span>
          </span>
        </button>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden max-w-md flex-1 md:block">
          <div className="relative">
            <HiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for restaurants or food..."
              className="input pl-10"
            />
          </div>
        </form>

        {/* Nav links */}
        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `relative pb-1 ${isActive ? "nav-link-active" : "nav-link"}`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-[13px] left-0 h-0.5 w-full rounded-full bg-brand-500" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right icons */}
        <div className="ml-auto flex items-center gap-4 lg:ml-0">
          <NavLink to="/cart" className="relative rounded-full p-2 hover:bg-ink-50">
            <HiOutlineShoppingCart className="h-6 w-6 text-ink-700" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </NavLink>
          <button className="relative rounded-full p-2 hover:bg-ink-50">
            <HiOutlineBell className="h-6 w-6 text-ink-700" />
          </button>
          <button className="flex items-center gap-2 rounded-full pl-1 pr-2 hover:bg-ink-50">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="hidden text-sm font-semibold text-ink-800 sm:block">
              {currentUser.name}
            </span>
            <HiChevronDown className="hidden h-4 w-4 text-ink-400 sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
