"use client";
import CartIcon from "@/assets/icons/CartIcon";
import MenuIcon from "@/assets/icons/MenuIcon";
import { ROUTES } from "@/constants/routes";
import { useRouter, usePathname } from "next/navigation";
import { useOrder } from "@/zustand/store";
export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const order = useOrder("7uhkl6ds5ud");
  return (
    <footer className="fixed h-[40px] bottom-0 left-0 right-0 flex bg-white shadow-lg border-t border-solid border-gray-300">
      <button className={`flex justify-center items-center flex-1 ${pathname === ROUTES.MENU ? "text-[#007AFF]" : ""}`} onClick={() => router.push(ROUTES.MENU)}><MenuIcon className="w-6 h-6" /></button>
      <button className={`flex justify-center items-center flex-1 ${pathname === ROUTES.CART ? "text-[#007AFF]" : ""}`} onClick={() => router.push(ROUTES.CART)}><div className="flex justify-center items-center w-6 h-6 relative"><CartIcon className="w-6 h-6" />
        {order && order.quantity > 0 && <span className="absolute box-border scale-75 left-2.5 -top-3 bg-blue-500 text-xs px-2 py-1 text-white rounded-3xl">{order.quantity}</span>}
      </div></button>
    </footer>
  );
}

