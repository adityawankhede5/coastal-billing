import { collection, query } from "firebase/firestore";

import { getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { ORDERS_COLLECTION } from "@/constants/DB";
import { Order } from "@/zustand/types";

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