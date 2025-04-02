"use client"
import OrdersList from "@/components/OrdersList";
import { useEffect, useState } from "react";
import { Order } from "@/zustand/types";
import { fetchOrders } from "@/zustand/helper";
export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-2">
      <OrdersList orders={orders} />
    </div>
  );
}
