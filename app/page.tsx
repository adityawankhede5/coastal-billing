"use client"
import OrdersList from "@/components/OrdersList";
import { useEffect, useState } from "react";
import { Order } from "@/zustand/types";
import { fetchOrders } from "@/lib/utils";
import NewOrderButton from "@/components/NewOrderButton";
import Header from "@/components/Header/Header";
import PackageIcon from "@/assets/icons/Package.icon";
import LoadingSkeleton from "@/components/Skeletons/LoadingSkeleton";
function Title() {
  return (
    <>
      <PackageIcon className="w-7 h-7" />
      <span className="ml-2">Orders</span>
    </>
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
        <OrdersList orders={orders} />
      </div>
      <NewOrderButton />
    </>
  );
}
