import { addDoc, collection, doc, getDoc, orderBy, query, updateDoc, where } from "firebase/firestore";

import { getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { ORDERS_COLLECTION } from "@/constants/DB";
import { ORDER_STATUS, PAYMENT_METHOD } from "@/zustand/types";
import { serializeOrder } from "@/zustand/helper";
import { CreateOrderResponse } from "./types";

export const fetchAllOrders = async () => {
  const ordersRef = collection(db, ORDERS_COLLECTION);
  const ordersSnapshot = await getDocs(query(ordersRef, orderBy("createdAt", "desc")));
  const orders = ordersSnapshot.docs.map(serializeOrder);
  return orders.filter((order) => !order.deleted);
}

export const fetchOrders = async () => {
  const ordersRef = collection(db, ORDERS_COLLECTION);

  // Get current date and set time to 4am
  const now = new Date();
  const today4am = new Date(now);
  today4am.setHours(4, 0, 0, 0);

  // If current time is before 4am, use yesterday's 4am
  if (now.getHours() < 4) {
    today4am.setDate(today4am.getDate() - 1);
  }

  // Get tomorrow's 4am
  const tomorrow4am = new Date(today4am);
  tomorrow4am.setDate(tomorrow4am.getDate() + 1);

  const q = query(
    ordersRef,
    orderBy("createdAt", "desc"),
    where("createdAt", ">=", today4am.getTime()),
    where("createdAt", "<", tomorrow4am.getTime())
  );

  const ordersSnapshot = await getDocs(q);
  const orders = ordersSnapshot.docs.map(serializeOrder);
  return orders.filter((order) => !order.deleted);
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
    deleted: false,
  }
  try {
    const createdOrder = await addDoc(collection(db, ORDERS_COLLECTION), newOrder);
    return { status: "success", orderId: createdOrder.id };
  } catch (error) {
    return { status: "error", error: error };
  }
};

export const updateOrderPayment = async (orderId: string, method: PAYMENT_METHOD, receivedAt: number, splitAmount: { cash: number, online: number } = { cash: 0, online: 0 }) => {
  const orderRef = doc(db, ORDERS_COLLECTION, orderId);
  await updateDoc(orderRef, {
    status: ORDER_STATUS.COMPLETE,
    payment: {
      method: method,
      receivedAt: receivedAt,
      ...(method === PAYMENT_METHOD.SPLIT && {
        splitAmount: {
          cash: splitAmount.cash,
          online: splitAmount.online,
        },
      }),
    },
  });
}

export const deleteOrder = async (orderId: string) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, {
      deleted: true,
    });
    return { status: "success" };
  } catch (error) {
    return { status: "error", error: error };
  }
}