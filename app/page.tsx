"use client"
import OrdersList from "@/components/OrdersList";
import { useEffect, useState } from "react";
import { Order } from "@/zustand/types";
import { fetchOrders } from "@/lib/utils";
import NewOrderButton from "@/components/NewOrderButton";
import Header from "@/components/Header/Header";
import PackageIcon from "@/assets/icons/Package.icon";
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
    <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
      <PackageIcon className="w-7 h-7" />
      <div className="">Orders</div>
      <div className="text-2xl font-bold text-gray-400"><HydrationSafeDate milliseconds={createdAt} includeSeconds={true} /></div>
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
      <Header title={<Title />} />
      <div className="grid grid-cols-1 gap-4">
        <OrdersOverview orders={orders} />
        <OrdersList orders={orders} />
      </div>
      <NewOrderButton />
    </>
  );
}
