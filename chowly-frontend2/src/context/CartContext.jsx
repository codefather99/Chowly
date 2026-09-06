import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "chowly_cart";

function loadInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // ignore corrupt storage
  }
  return { items: [], restaurantId: null, restaurantName: null };
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item, restaurantId, restaurantName } = action.payload;

      // Enforce single-restaurant cart (like most food delivery apps)
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        return {
          items: [{ ...item, quantity: item.quantity || 1 }],
          restaurantId,
          restaurantName,
        };
      }

      const existing = state.items.find((i) => i.id === item.id);
      let items;
      if (existing) {
        items = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        );
      } else {
        items = [...state.items, { ...item, quantity: item.quantity || 1 }];
      }
      return { items, restaurantId, restaurantName };
    }
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i))
          .filter((i) => i.quantity > 0),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case "CLEAR_CART":
      return { items: [], restaurantId: null, restaurantName: null };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addItem = (item, restaurantId, restaurantName) =>
    dispatch({ type: "ADD_ITEM", payload: { item, restaurantId, restaurantName } });
  const incrementItem = (id) => dispatch({ type: "INCREMENT", payload: id });
  const decrementItem = (id) => dispatch({ type: "DECREMENT", payload: id });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const itemCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );
  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items]
  );

  const value = {
    ...state,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
