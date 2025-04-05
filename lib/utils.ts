import { addDoc, collection, doc, getDoc, orderBy, query, updateDoc } from "firebase/firestore";

import { getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { ORDERS_COLLECTION } from "@/constants/DB";
import { Order, ORDER_STATUS, PAYMENT_METHOD } from "@/zustand/types";
import { serializeOrder } from "@/zustand/helper";
import { CreateOrderResponse } from "./types";
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
      payment: data.payment,
    } as Order;
  });
  return orders;
}

export const fetchOrders = async () => {
  const ordersRef = collection(db, ORDERS_COLLECTION);
  const q = query(ordersRef, orderBy("createdAt", "desc"));
  const ordersSnapshot = await getDocs(q);
  const orders = ordersSnapshot.docs.map(serializeOrder);
  return orders;
}

export const fetchOrder = async (orderId: string) => {
  if (!orderId) return null;
  const orderRef = doc(db, ORDERS_COLLECTION, orderId);
  const orderSnapshot = await getDoc(orderRef);
  return serializeOrder(orderSnapshot);
}

export const createOrder = async (): Promise<CreateOrderResponse> => {
  const newOrder = {
    createdAt: Date.now(),
    name: "",
    cart: {},
    price: 0,
    quantity: 0,
    status: ORDER_STATUS.PENDING,
  }
  try {
    const createdOrder = await addDoc(collection(db, ORDERS_COLLECTION), newOrder);
    return { status: "success", orderId: createdOrder.id };
  } catch (error) {
    return { status: "error", error: error };
  }
};

export const updateOrderPayment = async (orderId: string, method: PAYMENT_METHOD, receivedAt: number) => {
  const orderRef = doc(db, ORDERS_COLLECTION, orderId);
  await updateDoc(orderRef, {
    status: ORDER_STATUS.COMPLETE,
    payment: {
      method: method,
      receivedAt: receivedAt,
    }
  });
}