import { DocumentData } from "firebase/firestore";
import { Order } from "./types";
import { DocumentSnapshot } from "firebase/firestore";

export const serializeOrder = (orderDoc: DocumentSnapshot<DocumentData>) => {
  const data = orderDoc.data();
  if (!data) throw new Error("Order not found");
  return {
    id: orderDoc.id,
    createdAt: data.createdAt,
    name: data.name,
    number: data.number,
    cart: data.cart,
    price: data.price,
    quantity: data.quantity,
    status: data.status,
  } as Order;
}
