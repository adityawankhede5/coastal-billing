import { create } from "zustand";
import { Order, OrdersStore } from "./types";
import { MENU_DICTIONARY } from "@/constants/menu";

const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: [],
  init: (incomingOrders: Order[]) => {
    set({ orders: incomingOrders });
  },
  getOrder: (orderId: string) => get().orders.find((order) => order.id === orderId),
  appendOrder: (order: Order) => set((state) => {
    return { orders: [order, ...state.orders] }
  }),
  updateCart: (orderId: string, itemId: string, quantity: number) => set((state) => {
    const order = state.getOrder(orderId);
    if (!order) return state;
    const item = MENU_DICTIONARY[itemId];
    if (!item) return state;
    if (quantity < 0) {
      if (!order.cart[itemId]) return state;
      if (order.cart[itemId] === 0) return state;
    }
    const newCart = { ...order.cart };
    newCart[itemId] = (newCart[itemId] || 0) + quantity;
    if (newCart[itemId] === 0) {
      delete newCart[itemId];
    }
    const newTotalPrice = order.price + item.price * quantity;
    const newQuantity = order.quantity + quantity;
    const newOrder = { ...order, cart: newCart, price: newTotalPrice, quantity: newQuantity }
    return { orders: state.orders.map((order) => order.id === orderId ? { ...order, cart: newCart, price: newTotalPrice, quantity: newQuantity } : order) }
  }),
  clearCart: (orderId: string) => set((state) => {
    const order = state.getOrder(orderId);
    if (!order) return state;
    const newOrder = { ...order, cart: {}, price: 0, quantity: 0 }
    return { orders: state.orders.map((order) => order.id === orderId ? newOrder : order) }
  })
}));

export const useOrder = (orderId: string) => {
  return useOrdersStore((state) => state.getOrder(orderId));
}

export const useOrdersSorted = () => {
  return useOrdersStore((state) => state.orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
}

export default useOrdersStore;