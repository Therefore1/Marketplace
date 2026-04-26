import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { isLoggedIn, user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCart = async () => {
        if (!isLoggedIn || !user?.id) return;
        setIsLoading(true);
        try {
            const timestamp = new Date().getTime();
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${user.id}?t=${timestamp}`);
            const data = await response.json();
            if (response.ok) {
                setCartItems(data);
            }
        } catch (err) {
            console.error('Error fetching cart:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn && user?.id) {
            fetchCart();
        } else {
            setCartItems([]);
        }
    }, [isLoggedIn, user?.id]);

    const addToCart = async (productId, quantity = 1) => {
        if (!isLoggedIn || !user?.id) return false;
        
        // OPTIMISTIC UPDATE: Update UI immediately
        // We find if the product exists in the current items
        const existingItemIndex = cartItems.findIndex(item => item.id === productId || item.product_id === productId);
        
        if (existingItemIndex > -1) {
            const newItems = [...cartItems];
            newItems[existingItemIndex] = { 
                ...newItems[existingItemIndex], 
                quantity: (Number(newItems[existingItemIndex].quantity) || 0) + quantity 
            };
            setCartItems(newItems);
        } else {
            // Add a temporary item to show the count change
            setCartItems(prev => [...prev, { id: productId, product_id: productId, quantity: quantity }]);
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, productId, quantity })
            });
            if (response.ok) {
                // Background refresh to get the real product data (images, names) linked to the ID
                await fetchCart();
                return true;
            }
        } catch (err) {
            console.error('Error adding to cart:', err);
            // Revert on error
            fetchCart();
        }
        return false;
    };

    const updateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${cartItemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: newQuantity })
            });
            if (response.ok) {
                setCartItems(prev => prev.map(item => 
                    item.cart_item_id === cartItemId ? { ...item, quantity: newQuantity } : item
                ));
            }
        } catch (err) {
            console.error('Error updating quantity:', err);
        }
    };

    const removeFromCart = async (cartItemId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${cartItemId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setCartItems(prev => prev.filter(item => item.cart_item_id !== cartItemId));
            }
        } catch (err) {
            console.error('Error removing from cart:', err);
        }
    };

    const clearCart = async () => {
        if (!user?.id) return;
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/user/${user.id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setCartItems([]);
            }
        } catch (err) {
            console.error('Error clearing cart:', err);
        }
    };

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            isLoading, 
            addToCart, 
            updateQuantity, 
            removeFromCart, 
            clearCart,
            fetchCart,
            cartCount: cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0),
            cartTotal: cartItems.reduce((acc, item) => {
                let priceNum = 0;
                if (typeof item.price === 'string') {
                    priceNum = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
                } else if (item.numericPrice) {
                    priceNum = Number(item.numericPrice);
                } else {
                    priceNum = item.price || 0;
                }
                return acc + (priceNum * (Number(item.quantity) || 0));
            }, 0)
        }}>
            {children}
        </CartContext.Provider>
    );
};
