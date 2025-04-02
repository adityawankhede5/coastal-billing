import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import OrderInit from "./Order.init";
import { Order } from "@/zustand/types";
import { serializeOrder } from "@/zustand/helper";

export default async function OrderLayout({ children, params }: { children: React.ReactNode, params: { orderId: string } }) {
  const { orderId } = await params;
  const orderRef = doc(db, "orders", orderId);
  const orderDoc = await getDoc(orderRef);
  const order = serializeOrder(orderDoc);
  return (
    <>
      <OrderInit order={order as Order} />
      {children}
    </>
  )
}