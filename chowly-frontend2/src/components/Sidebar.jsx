import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineStar,
  HiOutlineLocationMarker,
  HiOutlineTag,
  HiOutlineSparkles,
  HiOutlineViewGrid,
  HiOutlineFire,
} from "react-icons/hi";
import { GiChopsticks, GiCupcake, GiHamburger, GiSodaCan, GiPizzaSlice, GiLeafSwirl } from "react-icons/gi";
import { categories } from "../mock/mockData";

const browseLinks = [
  { to: "/", label: "Home", icon: HiOutlineHome },
  { to: "/restaurants?sort=top", label: "Top Rated", icon: HiOutlineStar },
  { to: "/restaurants?filter=near", label: "Near You", icon: HiOutlineLocationMarker },
  { to: "/restaurants?filter=offers", label: "Offers", icon: HiOutlineTag },
  { to: "/restaurants?filter=new", label: "New Restaurants", icon: HiOutlineSparkles },
];

const categoryIcons = {
  all: HiOutlineViewGrid,
  local: GiChopsticks,
  pizza: GiPizzaSlice,
  burgers: GiHamburger,
  drinks: GiSodaCan,
  desserts: GiCupcake,
  healthy: GiLeafSwirl,
};

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-6 border-r border-ink-100 bg-white px-4 py-6 lg:flex">
      <div>
        <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-ink-400">
          Browse
        </p>
        <nav className="flex flex-col gap-1">
          {browseLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={label}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand-50 text-brand-600"
                    : "text-ink-600 hover:bg-ink-50"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div>
        <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-ink-400">
          Categories
        </p>
        <nav className="flex flex-col gap-1">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id] || HiOutlineFire;
            return (
              <NavLink
                key={cat.id}
                to={`/restaurants?category=${cat.id}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-50 text-brand-600"
                      : "text-ink-600 hover:bg-ink-50"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {cat.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto rounded-2xl bg-brand-50 p-5">
        <p className="text-base font-extrabold text-ink-900">
          Get food delivered fast
        </p>
        <p className="mt-1 text-xs text-ink-500">
          Quick delivery at your doorstep
        </p>
        <NavLink to="/restaurants" className="btn-primary mt-4 w-fit !px-4 !py-2 text-xs">
          Order Now →
        </NavLink>
      </div>
    </aside>
  );
}
