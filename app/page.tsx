"use client"
import OrdersList from "@/components/OrdersList";
import { useEffect, useState } from "react";
import { Order } from "@/zustand/types";
import { fetchOrders } from "@/lib/utils";
import NewOrderButton from "@/components/NewOrderButton";
import Header from "@/components/Header/Header";
import LoadingSkeleton from "@/components/Skeletons/LoadingSkeleton";
import HydrationSafeDate from "@/components/HydrationSafeDate";
import OrdersOverview from "@/components/OrdersOverview";
function Title() {
  const [createdAt, setCreatedAt] = useState<number>(0);
  useEffect(() => {
    setCreatedAt(Date.now());
    const interval = setInterval(() => {
      setCreatedAt(Date.now());
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-2 flex-wrap">
      <div className="text-4xl font-bold">Orders</div>
      <div className="text-xl font-bold text-gray-400"><HydrationSafeDate milliseconds={createdAt} includeSeconds={true} /></div>
    </div>
  )
}
export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders);
    }).finally(() => {
      setIsLoading(false);
    })
  }, []);
  if (isLoading) return <LoadingSkeleton />
  return (
    <>
      <Header title={<Title />} titleSmall="Orders" />
      <div className="grid grid-cols-1 gap-4">
        <OrdersOverview orders={orders} />
        <OrdersList orders={orders} />
      </div>
      <NewOrderButton />
    </>
  );
}
