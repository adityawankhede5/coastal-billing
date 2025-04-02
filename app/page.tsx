"use server"
import OrdersList from "@/components/OrdersList";
import { ORDERS_COLLECTION } from "@/constants/DB";
import { db } from "@/lib/firebase";
import { Order } from "@/zustand/types";
import { collection } from "firebase/firestore";
import { query } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
export default async function Home() {
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
  if (orders.length === 0) return <div className="flex justify-center items-center h-screen text-subheading">No orders yet</div>
  return (
    <div className="flex flex-col gap-2">
      <OrdersList orders={orders} />
    </div>
  );
}
