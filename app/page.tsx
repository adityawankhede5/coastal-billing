"use client"
import useOrdersStore from "@/zustand/store";
import OrdersList from "@/components/OrdersList";
import LoadingSkeleton from "@/components/Skeletons/LoadingSkeleton";
export default function Home() {
  const { orders, loading } = useOrdersStore();
  if (loading) return <LoadingSkeleton />;
  return (
    <div className="grid grid-cols-1 gap-2">
      <OrdersList orders={orders} />
    </div>
  );
}
