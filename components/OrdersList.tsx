"use client"
import { Order } from "@/zustand/types";
import OrderCard from "./OrderCard";
import NoOrdersYet from "./EmptyStates/NoOrdersYet";
export default function OrdersList({ orders }: { orders: Order[] }) {

  if (orders.length === 0) return <NoOrdersYet />
  return (
    <div className="flex flex-col gap-2">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}