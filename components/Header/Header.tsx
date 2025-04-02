"use client";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import ResetIcon from "@/assets/icons/ResetIcon";
import useOrdersStore from "@/zustand/store";
import { useParams, usePathname, useRouter } from "next/navigation";
import { getRoute, ROUTES } from "@/constants/routes";
import { useMemo } from "react";
import { updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { doc } from "firebase/firestore";
import CalendarIcon from "@/assets/icons/Calendar.icon";
import ClockIcon from "@/assets/icons/Clock.icon";
import CheckCircleIcon from "@/assets/icons/CheckCirlce.icon";
import { ORDERS_COLLECTION } from "@/constants/DB";
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
      const orderRef = doc(db, ORDERS_COLLECTION, orderId as string);
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
  const { getOrder } = useOrdersStore();
  const order = getOrder(orderId as string);
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
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-gray-500">#</span>
              <span className="font-bold text-gray-900">{order.createdAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
              {order.status === 'pending' ? (
                <div className="flex items-center text-amber-600">
                  <ClockIcon className="w-4 h-4 mr-1" />
                </div>
              ) : (
                <div className="flex items-center text-emerald-600">
                  <CheckCircleIcon className="w-4 h-4 mr-1" />
                </div>
              )}
            </div>
            {order && <span onClick={handleResetCart}><ResetIcon className="w-8 h-8 rotate-x-1" /></span>}
          </div>
        )
      }
    </header>
  );
}