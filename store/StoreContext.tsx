import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { AppView, CartItem, Order, Ingredient, OrderStatus } from '../types';
import { INITIAL_INVENTORY, MOCK_ORDERS } from '../constants';

interface StoreContextType {
    view: AppView;
    setView: (view: AppView) => void;
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    updateCartItemQuantity: (id: string, delta: number) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    orders: Order[];
    placeOrder: (customerName?: string) => Promise<boolean>;
    refundOrder: (orderId: string) => void;
    inventory: Ingredient[];
    updateInventoryStock: (ingredientId: string, quantity: number) => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [view, setView] = useState<AppView>(AppView.MENU);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
    const [inventory, setInventory] = useState<Ingredient[]>(INITIAL_INVENTORY);

    const addToCart = useCallback((item: CartItem) => {
        setCart(prev => {
            const existingItemIndex = prev.findIndex(p => 
                p.pizzaId === item.pizzaId && 
                p.size === item.size &&
                JSON.stringify(p.customIngredients) === JSON.stringify(item.customIngredients) &&
                JSON.stringify(p.removedIngredients) === JSON.stringify(item.removedIngredients)
            );

            if (existingItemIndex >= 0) {
                const newCart = [...prev];
                newCart[existingItemIndex].quantity += item.quantity;
                return newCart;
            }
            return [...prev, item];
        });
        setIsCartOpen(true); // Open cart automatically when an item is added
    }, []);

    const updateCartItemQuantity = useCallback((id: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    }, []);

    const clearCart = useCallback(() => setCart([]), []);

    const placeOrder = useCallback(async (customerName?: string): Promise<boolean> => {
        if (cart.length === 0) return false;

        // Simulate network delay for "Virtual OS" feel
        await new Promise(resolve => setTimeout(resolve, 1500));

        const subtotal = cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);
        const tax = subtotal * 0.08;
        
        const newOrder: Order = {
            id: `ORD-${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`,
            date: new Date(),
            items: [...cart],
            subtotal,
            tax,
            total: subtotal + tax,
            status: OrderStatus.COMPLETED,
            customerName: customerName || 'Usuario Anónimo'
        };

        setOrders(prev => [newOrder, ...prev]);
        
        // Deduct from inventory
        setInventory(prevInv => {
            let nextInv = [...prevInv];
            cart.forEach(cartItem => {
                const doughIndex = nextInv.findIndex(i => i.id === 'ing_dough_reg');
                if (doughIndex >= 0) nextInv[doughIndex].stock -= cartItem.quantity;
                
                cartItem.customIngredients.forEach(ci => {
                    const idx = nextInv.findIndex(i => i.id === ci.id);
                    if(idx >= 0) nextInv[idx].stock -= cartItem.quantity;
                });
            });
            return nextInv;
        });

        clearCart();
        return true;
    }, [cart, clearCart]);

    const refundOrder = useCallback((orderId: string) => {
        setOrders(prev => prev.map(order => 
            order.id === orderId ? { ...order, status: OrderStatus.REFUNDED } : order
        ));
    }, []);

    const updateInventoryStock = useCallback((ingredientId: string, delta: number) => {
        setInventory(prev => prev.map(ing => 
            ing.id === ingredientId ? { ...ing, stock: Math.max(0, ing.stock + delta) } : ing
        ));
    }, []);

    return (
        <StoreContext.Provider value={{
            view, setView,
            cart, addToCart, updateCartItemQuantity, removeFromCart, clearCart,
            orders, placeOrder, refundOrder,
            inventory, updateInventoryStock,
            isCartOpen, setIsCartOpen
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) throw new Error("useStore must be used within a StoreProvider");
    return context;
};
