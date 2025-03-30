"use client";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import ResetIcon from "@/assets/icons/ResetIcon";
import useOrdersStore from "@/zustand/store";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
export default function Header() {
  const pathname = usePathname();
  const { clearCart } = useOrdersStore();
  const handleResetCart = () => {
    clearCart("7uhkl6ds5ud");
  }
  return (
    <header className="bg-white flex items-center border-0 border-b border-solid border-gray-200 mb-1 px-2">
      <div className="flex-1 flex gap-2 items-center">
        <Image src={Logo} alt="logo" className="w-8 h-8" />
        <div className="text-heading">{pathname === ROUTES.MENU ? "Menu" : "Cart"}</div>
      </div>
      <span onClick={handleResetCart}><ResetIcon className="w-8 h-8 rotate-x-1" /></span>
    </header>
  );
}