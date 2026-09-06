import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineShoppingBag } from "react-icons/hi";
import Layout from "../components/Layout";
import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items } = useCart();

  return (
    <Layout>
      <div className="mx-auto max-w-2xl">
        <Link to="/restaurants" className="mb-4 flex items-center gap-1 text-sm font-semibold text-ink-500 hover:text-brand-500">
          <HiOutlineArrowLeft className="h-4 w-4" />
          Continue browsing
        </Link>
        <h1 className="mb-6 text-2xl font-extrabold text-ink-900">Your Cart</h1>

        {items.length === 0 ? (
          <div className="card flex flex-col items-center gap-3 py-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-500">
              <HiOutlineShoppingBag className="h-7 w-7" />
            </span>
            <p className="font-semibold text-ink-800">Your cart is empty</p>
            <p className="text-sm text-ink-400">Browse restaurants and add your favourite meals.</p>
            <Link to="/restaurants" className="btn-primary mt-2">
              Browse Restaurants
            </Link>
          </div>
        ) : (
          <Cart />
        )}
      </div>
    </Layout>
  );
}
