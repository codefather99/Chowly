import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMinus, HiOutlinePlus, HiOutlineX, HiOutlineShieldCheck } from "react-icons/hi";
import { useCart } from "../context/CartContext";
import { formatNaira } from "../mock/mockData";

const DELIVERY_FEE = 0; // free delivery, matches design

export default function Cart({ showCheckoutButton = true }) {
  const { items, restaurantName, incrementItem, decrementItem, removeItem, subtotal, clearCart } =
    useCart();
  const navigate = useNavigate();

  const total = subtotal + DELIVERY_FEE;

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-ink-900">
          Your Cart{" "}
          <span className="font-normal text-ink-400">
            ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
        </h2>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-brand-500 hover:text-brand-600"
          >
            Clear Cart
          </button>
        )}
      </div>

      {restaurantName && (
        <p className="mb-3 text-xs text-ink-400">Ordering from {restaurantName}</p>
      )}

      {items.length === 0 ? (
        <div className="py-10 text-center text-sm text-ink-400">
          Your cart is empty. Add something delicious!
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="h-14 w-14 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-ink-800">{item.name}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="shrink-0 text-ink-300 hover:text-brand-500"
                  >
                    <HiOutlineX className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-ink-400">{formatNaira(item.price)}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full border border-ink-200 px-1.5 py-1">
                    <button
                      onClick={() => decrementItem(item.id)}
                      className="grid h-5 w-5 place-items-center rounded-full text-ink-500 hover:bg-ink-100"
                    >
                      <HiOutlineMinus className="h-3 w-3" />
                    </button>
                    <span className="w-4 text-center text-xs font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => incrementItem(item.id)}
                      className="grid h-5 w-5 place-items-center rounded-full text-ink-500 hover:bg-ink-100"
                    >
                      <HiOutlinePlus className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="text-sm font-bold text-ink-900">
                    {formatNaira(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <>
          <div className="mt-5 space-y-2 border-t border-dashed border-ink-200 pt-4 text-sm">
            <div className="flex justify-between text-ink-500">
              <span>Subtotal</span>
              <span>{formatNaira(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-500">
              <span>Delivery Fee</span>
              <span className="badge bg-brand-50 text-brand-600">FREE</span>
            </div>
            <div className="flex justify-between text-ink-500">
              <span>Service Fee</span>
              <span>{formatNaira(0)}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-3">
            <span className="text-base font-bold text-ink-900">Total</span>
            <span className="text-lg font-extrabold text-ink-900">{formatNaira(total)}</span>
          </div>

          {showCheckoutButton && (
            <button
              onClick={() => navigate("/checkout")}
              className="btn-primary mt-4 w-full !py-3"
            >
              Proceed to Checkout →
            </button>
          )}

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-yellow-50 px-3 py-2.5 text-yellow-700">
            <HiOutlineShieldCheck className="h-5 w-5 shrink-0" />
            <div>
              <p className="text-xs font-bold">Demo Payments</p>
              <p className="text-[11px] text-yellow-600">
                Pretend payment only — no money is ever moved
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
