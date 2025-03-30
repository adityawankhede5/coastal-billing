import { create } from "zustand";
import { CartStore } from "./types";
import { MENU_DICTIONARY } from "@/constants/menu";

const useCartStore = create<CartStore>((set) => ({
  items: {},
  totalPrice: 0,
  quantity: 0,
  updateCart: (itemId: string, quantity: number = 1) => set((state) => {
    const item = MENU_DICTIONARY[itemId];
    if (!item) return state;
    if (quantity < 0) {
      if (!state.items[itemId]) return state;
      if (state.items[itemId] === 0) return state;
    }
    const newCart = { ...state.items };
    newCart[itemId] = (newCart[itemId] || 0) + quantity;
    if (newCart[itemId] === 0) {
      delete newCart[itemId];
    }
    const newTotalPrice = state.totalPrice + item.price * quantity;
    const newQuantity = state.quantity + quantity;
    return {
      items: newCart,
      totalPrice: newTotalPrice,
      quantity: newQuantity,
    }
  }),
  clearCart: () => set({ items: {}, totalPrice: 0, quantity: 0 }),
}));

export default useCartStore;