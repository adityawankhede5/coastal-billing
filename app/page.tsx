"use client"
import OrdersList from "@/components/OrdersList";
import { useEffect, useState } from "react";
import { Order } from "@/zustand/types";
import { fetchOrders } from "@/lib/utils";
import NewOrderButton from "@/components/NewOrderButton";
import Header from "@/components/Header/Header";
export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  return (
    <>
      <Header title="Orders" />
      <div className="grid grid-cols-1 gap-4">
        <OrdersList orders={orders} />
      </div>
      <NewOrderButton />
    </>
  );
}
