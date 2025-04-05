"use client";
import CartIcon from "@/assets/icons/CartIcon";
import MenuIcon from "@/assets/icons/MenuIcon";
import { getRoute, ROUTES } from "@/constants/routes";
import { useRouter, usePathname, useParams } from "next/navigation";
import useOrdersStore from "@/zustand/store";
import { db } from "@/lib/firebase";
import { addDoc, collection, getCountFromServer } from "firebase/firestore";
import { Order, ORDER_STATUS } from "@/zustand/types";
import PlusIcon from "@/assets/icons/Plus.icon";
import { ORDERS_COLLECTION } from "@/constants/DB";
import { useEffect } from "react";
import { useState } from "react";
import { fetchOrder } from "@/lib/utils";
export default function Footer() {
  const { orderId } = useParams();
  const { appendOrder } = useOrdersStore();
  const router = useRouter();
  const pathname = usePathname();
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => {
    fetchOrder(orderId as string).then((order) => {
      setOrder(order);
    });
  }, [orderId]);
  const handleNewOrder = async () => {
    const countSnapshot = await getCountFromServer(collection(db, ORDERS_COLLECTION));
    const newOrder = {
      createdAt: Date.now(),
      number: countSnapshot.data().count + 1,
      name: "",
      cart: {},
      price: 0,
      quantity: 0,
      status: ORDER_STATUS.PENDING,
    }
    try {
      const createdOrder = await addDoc(collection(db, ORDERS_COLLECTION), newOrder);
      appendOrder({ ...newOrder, id: createdOrder.id });
      router.push(getRoute(createdOrder.id, ROUTES.MENU));
    } catch (error) {
      console.error(error);
    }
  }
  if (pathname === ROUTES.ORDERS) return (
    <footer className="fixed bottom-0 left-0 right-0 flex">
      <div className="flex justify-center items-center w-full" onClick={handleNewOrder}>
        <div className="button button-primary w-full flex justify-center items-center gap-1 m-1 mx-4">
          <PlusIcon />
          <span>New Order</span>
        </div>
      </div>
    </footer>
  );
  return (
    <footer className="fixed h-[40px] bottom-0 left-0 right-0 flex bg-white shadow-lg border-t border-solid border-gray-300">
      {
        order ?
          <>
            <button className={`flex justify-center items-center flex-1 ${pathname === getRoute(orderId as string, ROUTES.MENU) ? "text-[#007AFF]" : ""}`} onClick={() => router.push(getRoute(orderId as string, ROUTES.MENU))}>
              <MenuIcon className="w-6 h-6" />
            </button>
            <button className={`flex justify-center items-center flex-1 ${pathname === getRoute(orderId as string, ROUTES.CART) ? "text-[#007AFF]" : ""}`} onClick={() => router.push(getRoute(orderId as string, ROUTES.CART))}>
              <div className="flex justify-center items-center w-6 h-6 relative">
                <CartIcon className="w-6 h-6" />
        {order && order.quantity > 0 && <span className="absolute box-border scale-75 left-2.5 -top-3 bg-blue-500 text-xs px-2 py-1 text-white rounded-3xl">{order.quantity}</span>}
      </div></button>
          </> :
          <>
          </>
      }
    </footer>
  );
}

