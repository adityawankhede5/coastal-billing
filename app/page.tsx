"use client"
import useOrdersStore from "@/zustand/store";
import OrdersList from "@/components/OrdersList";
export default function Home() {
  const { orders } = useOrdersStore();
  return (
    <div className="grid grid-cols-1 gap-2">
      <OrdersList orders={orders} />
    </div>
  );
}
