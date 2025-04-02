"use client"
import { Order } from "@/zustand/types";
import OrderCard from "./OrderCard";
export default function OrdersList({ orders }: { orders: Order[] }) {
  return (
    <div className="flex flex-col gap-2">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}