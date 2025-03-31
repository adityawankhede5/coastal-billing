"use server"
import OrdersList from "@/components/OrdersList";
import { db } from "@/lib/firebase";
import { Order } from "@/zustand/types";
import { collection } from "firebase/firestore";
import { query } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
export default async function Home() {
  const today = new Date().toDateString();
  const querySnapshot = await getDocs(query(collection(db, "orders")));
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
    } as Order;
  });
  if (orders.length === 0) return <div className="flex justify-center items-center h-screen text-subheading">No orders yet</div>
  return (
    <div className="flex flex-col gap-2">
      <div className="card-muted text-subheading">{today}</div>
      <OrdersList orders={orders} />
    </div>
  );
}
