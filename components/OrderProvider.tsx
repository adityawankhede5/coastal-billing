"use client"
import useOrdersStore from "@/zustand/store";
import { Order } from "@/zustand/types";
import { useEffect } from "react";

export default function OrderProvider({ orders }: { orders: Order[] }) {
  const { init } = useOrdersStore();
  useEffect(() => {
    console.log("init", orders);
    init(orders);
  }, [orders, init]);
  return null;
}