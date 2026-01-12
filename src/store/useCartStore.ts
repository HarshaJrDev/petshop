
import { create } from 'zustand';
import { Pet } from '../types';

export interface CartItem extends Pet {
    cartId: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (pet: Pet) => void;
    removeItem: (cartId: number) => void;
    getTotal: () => number;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],

    addItem: (pet) => {
        const item: CartItem = {
            ...pet,
            cartId: Date.now(),
        };

        set((state) => ({
            items: [...state.items, item],
        }));

        console.log('[CART] Added:', item);
    },

    removeItem: (cartId) => {
        set((state) => ({
            items: state.items.filter((i) => i.cartId !== cartId),
        }));

        console.log('[CART] Removed:', cartId);
    },

    getTotal: () =>
        get().items.reduce((sum, item) => sum + item.price, 0),

    clearCart: () => {
        set({ items: [] });
        console.log('[CART] Cleared');
    },
}));
