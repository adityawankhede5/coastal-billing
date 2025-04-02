'use client'

import useOrdersStore from "@/zustand/store";
import { Order } from "@/zustand/types";
import { useEffect } from "react";

export default function OrderInit({ order }: { order: Order }) {
  const { setOrder } = useOrdersStore();
  useEffect(() => {
    setOrder(order.id, order);
  }, [])
  return null;
}