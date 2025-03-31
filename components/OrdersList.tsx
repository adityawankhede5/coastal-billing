"use client"
import { getRoute } from "@/constants/routes";
import { ROUTES } from "@/constants/routes";
import useOrdersStore from "@/zustand/store";
import { Order } from "@/zustand/types";
import Link from "next/link";
import { useEffect } from "react";
export default function OrdersList({ orders }: { orders: Order[] }) {
  const { init } = useOrdersStore();
  useEffect(() => {
    init(orders);
  }, [orders]);
  return (
    <div className="flex flex-col gap-2">
      {orders.map((order) => (
        <Link href={getRoute(order.id, ROUTES.MENU)} key={order.id} className="card">
          <div className="flex justify-between items-center">
            <div className="text-subheading">Order #{order.number}</div>
            <div className="text-subheading color-muted">&#8377;{order.price}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}