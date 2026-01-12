import { create } from 'zustand';
import { Pet, CartItem } from '../types';

interface CartStore {
    items: CartItem[];
    addItem: (pet: Pet) => void;
    removeItem: (cartId: number) => void;
    getTotal: () => number;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],

    addItem: (pet: Pet) => {
        const cartItem: CartItem = {
            ...pet,
            cartId: Date.now()
        };
        set((state) => ({
            items: [...state.items, cartItem]
        }));
    },

    removeItem: (cartId: number) => {
        set((state) => ({
            items: state.items.filter(item => item.cartId !== cartId)
        }));
    },

    getTotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    },

    clearCart: () => {
        set({ items: [] });
    }
}));