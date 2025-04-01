"use client";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import ResetIcon from "@/assets/icons/ResetIcon";
import useOrdersStore, { useOrder } from "@/zustand/store";
import { useParams, usePathname, useRouter } from "next/navigation";
import { getRoute, ROUTES } from "@/constants/routes";
import { useMemo } from "react";
import { updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { doc } from "firebase/firestore";
import CalendarIcon from "@/assets/icons/Calendar.icon";
enum PAGE {
  ORDERS = "orders",
  MENU = "menu",
  CART = "cart",
  EMPTY = "",
}
export default function Header() {
  const today = new Date().toDateString();
  const router = useRouter();
  const { orderId } = useParams();
  const pathname = usePathname();
  const { clearCart } = useOrdersStore();
  const handleResetCart = async () => {
    if (!orderId) return;
    try {
      const orderRef = doc(db, "orders", orderId as string);
      await updateDoc(orderRef, {
        cart: {},
        price: 0,
        quantity: 0,
      })
    } catch (error) {
      console.error(error);
    }
    clearCart(orderId as string);
  }
  const currentPage: PAGE = useMemo(() => {
    if (!orderId) return PAGE.ORDERS;
    if (pathname === getRoute(orderId as string, ROUTES.MENU)) return PAGE.MENU;
    if (pathname === getRoute(orderId as string, ROUTES.CART)) return PAGE.CART;
    return PAGE.EMPTY;
  }, [orderId, pathname])
  const order = useOrder(orderId as string);
  return (
    <header className="bg-white flex items-center border-0 border-b border-solid border-gray-200 mb-1 px-2">
      <div className="flex-1 flex gap-2 items-center">
        <Image onClick={() => router.push(ROUTES.ORDERS)} src={Logo} alt="logo" className="w-8 h-8" />
        <div className="text-heading flex justify-center items-center gap-2">
          <div className="capitalize">{currentPage}</div>
        </div>
      </div>
      {
        currentPage === PAGE.ORDERS && (
          <div className="flex items-center text-gray-500">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span className="text-sm">{today}</span>
          </div>
        )
      }
      {
        currentPage === PAGE.CART || currentPage === PAGE.MENU && order && (
          <div className="flex gap-2 items-center">
            {order && <div className="text-sm text-gray-500">Order @{order.createdAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>}
            {order && <span onClick={handleResetCart}><ResetIcon className="w-8 h-8 rotate-x-1" /></span>}
          </div>
        )
      }
    </header>
  );
}