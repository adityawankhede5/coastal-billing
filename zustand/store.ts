import { create } from "zustand";
import { CartStore } from "./types";
import { MENU_DICTIONARY } from "@/constants/menu";

const useCartStore = create<CartStore>((set) => ({
  cart: {},
  totalPrice: 0,
  quantity: 0,
  updateCart: (itemId: string, quantity: number = 1) => set((state) => {
    const item = MENU_DICTIONARY[itemId];
    if (!item) return state;
    if (quantity < 0) {
      if (!state.cart[itemId]) return state;
      if (state.cart[itemId] === 0) return state;
    }
    const newCart = { ...state.cart };
    newCart[itemId] = (newCart[itemId] || 0) + quantity;
    if (newCart[itemId] === 0) {
      delete newCart[itemId];
    }
    const newTotalPrice = state.totalPrice + item.price * quantity;
    const newQuantity = state.quantity + quantity;
    return {
      cart: newCart,
      totalPrice: newTotalPrice,
      quantity: newQuantity,
    }
  }),
  clearCart: () => set({ cart: {}, totalPrice: 0, quantity: 0 }),
}));

export default useCartStore;