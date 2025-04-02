"use client"
import useOrdersStore from "@/zustand/store";
import { Order } from "@/zustand/types";
import { useEffect } from "react";
import OrderCard from "./OrderCard";
export default function OrdersList({ orders }: { orders: Order[] }) {
  const { init } = useOrdersStore();
  useEffect(() => {
    init(orders);
  }, [orders, init]);
  return (
    <div className="flex flex-col gap-2">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}