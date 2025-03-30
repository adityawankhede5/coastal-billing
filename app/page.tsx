"use client"
import { ROUTES } from "@/constants/routes";
import { getRoute } from "@/constants/routes";
import { useOrdersSorted } from "@/zustand/store";
import { useRouter } from "next/navigation";
export default function Home() {
  const orders = useOrdersSorted();
  const router = useRouter();
  const today = new Date().toDateString();
  if (orders.length === 0) return <div className="flex justify-center items-center h-screen text-subheading">No orders yet</div>
  return (
    <div className="flex flex-col gap-2">
      <div className="card-muted text-subheading">{today}</div>
      {orders.map((order) => (
        <div key={order.id} className="card" onClick={() => router.push(getRoute(order.id, ROUTES.MENU))}>
          <div className="flex justify-between items-center">
            <div className="text-subheading">Order #{order.number}</div>
            <div className="text-subheading color-muted">&#8377;{order.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
