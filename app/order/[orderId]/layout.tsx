import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import OrderInit from "./Order.init";
import { Order } from "@/zustand/types";
import { serializeOrder } from "@/zustand/helper";
import { ORDERS_COLLECTION } from "@/constants/DB";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default async function OrderLayout({ children, params }: { children: React.ReactNode, params: { orderId: string } }) {
  const { orderId } = await params;
  const orderRef = doc(db, ORDERS_COLLECTION, orderId);
  const orderDoc = await getDoc(orderRef);
  let order: Order | null = null;
  try {
    order = serializeOrder(orderDoc);
  } catch (error) {
    console.error(error);
    redirect(ROUTES.ORDERS);
  }
  return (
    <>
      <OrderInit order={order as Order} />
      {children}
    </>
  )
}