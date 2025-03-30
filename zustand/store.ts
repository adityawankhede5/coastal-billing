import { create } from "zustand";
import { OrdersStore } from "./types";
import { MENU_DICTIONARY } from "@/constants/menu";
import { OrdersDB } from "@/indexedDB/Orders.db";

const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: [],
  init: async () => {
    const orders = await OrdersDB.getAllOrders();
    set({ orders });
  },
  getOrder: (orderId: string) => get().orders.find((order) => order.id === orderId),
  createOrder: (orderId: string, name?: string) => set((state) => {
    const newOrder = {
      id: orderId,
      createdAt: new Date(),
      name: name || "",
      number: state.orders.length + 1,
      cart: {},
      price: 0,
      quantity: 0,
    }
    OrdersDB.upsertOrder(orderId, newOrder).catch((error) => {
      console.error("Error creating order in IndexedDB:", error);
    })
    return { orders: [...state.orders, newOrder] }
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
    OrdersDB.upsertOrder(orderId, newOrder).catch((error) => {
      console.error("Error updating order in IndexedDB:", error);
    })
    return { orders: state.orders.map((order) => order.id === orderId ? { ...order, cart: newCart, price: newTotalPrice, quantity: newQuantity } : order) }
  }),
  clearCart: (orderId: string) => set((state) => {
    const order = state.getOrder(orderId);
    if (!order) return state;
    const newOrder = { ...order, cart: {}, price: 0, quantity: 0 }
    OrdersDB.upsertOrder(orderId, newOrder).catch((error) => {
      console.error("Error updating order in IndexedDB:", error);
    })
    return { orders: state.orders.map((order) => order.id === orderId ? newOrder : order) }
  })
}));

export const useOrder = (orderId: string) => {
  return useOrdersStore((state) => state.getOrder(orderId));
}

export const useOrdersSorted = () => {
  return useOrdersStore((state) => state.orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
}

useOrdersStore.getState().init();

export default useOrdersStore;