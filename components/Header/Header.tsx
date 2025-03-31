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
export default function Header() {
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
  const title = useMemo(() => {
    if (!orderId) return "Orders";
    if (pathname === getRoute(orderId as string, ROUTES.MENU)) return "Menu";
    if (pathname === getRoute(orderId as string, ROUTES.CART)) return "Cart";
    return "";
  }, [orderId, pathname])
  const order = useOrder(orderId as string);
  return (
    <header className="bg-white flex items-center border-0 border-b border-solid border-gray-200 mb-1 px-2">
      <div className="flex-1 flex gap-2 items-center">
        <Image onClick={() => router.push(ROUTES.ORDERS)} src={Logo} alt="logo" className="w-8 h-8" />
        <div className="text-heading flex justify-center items-center gap-2">
          <div>{title}</div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {order && <div className="text-subheading color-muted">Order #{order.number}</div>}
        {order && <span onClick={handleResetCart}><ResetIcon className="w-8 h-8 rotate-x-1" /></span>}
      </div>
    </header>
  );
}