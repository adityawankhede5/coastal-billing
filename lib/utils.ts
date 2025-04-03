import { collection, doc, getDoc, query } from "firebase/firestore";

import { getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { ORDERS_COLLECTION } from "@/constants/DB";
import { Order } from "@/zustand/types";
import { serializeOrder } from "@/zustand/helper";

export const getOrders = async () => {
  const querySnapshot = await getDocs(query(collection(db, ORDERS_COLLECTION)));
  const orders = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      createdAt: data.createdAt.toDate(),
      name: data.name,
      number: data.number,
      cart: data.cart,
      price: data.price,
      quantity: data.quantity,
      status: data.status,
    } as Order;
  });
  return orders;
}

export const fetchOrders = async () => {
  const ordersRef = collection(db, ORDERS_COLLECTION);
  const ordersSnapshot = await getDocs(ordersRef);
  const orders = ordersSnapshot.docs.map(serializeOrder);
  return orders;
}

export const fetchOrder = async (orderId: string) => {
  if (!orderId) return null;
  const orderRef = doc(db, ORDERS_COLLECTION, orderId);
  const orderSnapshot = await getDoc(orderRef);
  return serializeOrder(orderSnapshot);
}