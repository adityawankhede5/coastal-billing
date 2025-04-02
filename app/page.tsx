"use client"
import useOrdersStore from "@/zustand/store";
import OrdersList from "@/components/OrdersList";
import { useEffect, useState } from "react";
import { Order } from "@/zustand/types";
import LoadingSkeleton from "@/components/Skeletons/LoadingSkeleton";
export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { getOrders, loading } = useOrdersStore();
  useEffect(() => {
    const orders = getOrders();
    setOrders(orders);
  }, [getOrders]);

  if (loading) return <LoadingSkeleton />;
  return (
    <div className="grid grid-cols-1 gap-2">
      <OrdersList orders={orders} />
    </div>
  );
}
