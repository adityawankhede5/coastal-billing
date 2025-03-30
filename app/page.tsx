"use client"
import { ROUTES } from "@/constants/routes";
import { getRoute } from "@/constants/routes";
import useOrdersStore from "@/zustand/store";
import { useRouter } from "next/navigation";
export default function Home() {
  const { orders } = useOrdersStore();
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
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
