import { collection, doc, DocumentData, getDoc, getDocs } from "firebase/firestore";
import { Order } from "./types";
import { DocumentSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ORDERS_COLLECTION } from "@/constants/DB";

export const serializeOrder = (orderDoc: DocumentSnapshot<DocumentData>) => {
  const data = orderDoc.data();
  if (!data) throw new Error("Order not found");
  return {
    id: orderDoc.id,
    createdAt: data.createdAt.toDate(),
    name: data.name,
    number: data.number,
    cart: data.cart,
    price: data.price,
    quantity: data.quantity,
    status: data.status,
  } as Order;
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
