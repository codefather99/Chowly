import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (menuItem) => {

        setCartItems((currentItems) => {

            const existingItem = currentItems.find(
                (item) => item.menuItemId === menuItem.menuItemId
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.menuItemId === menuItem.menuItemId
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    ...menuItem,
                    quantity: 1
                }
            ];
        });
    };

    const increaseQuantity = (menuItemId) => {

        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.menuItemId === menuItemId
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );
    };

    const decreaseQuantity = (menuItemId) => {

        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.menuItemId === menuItemId
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (menuItemId) => {

        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.menuItemId !== menuItemId
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                cartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}