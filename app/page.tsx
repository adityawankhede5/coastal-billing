"use client"
import MENU, { CATEGORY } from "@/constants/menu";
import { MENU_CATEGORY } from "@/constants/types";
import PlusIcon from "@/assets/icons/plus.svg";
import MinusIcon from "@/assets/icons/minus.svg";
import Image from "next/image";
import useCartStore from "@/zustand/store";
export default function Home() {
  const { cart, updateCart } = useCartStore();
  const handleUpdateCart = (itemId: string, quantity: number = 1) => {
    updateCart(itemId, quantity);
  }
  return (
    <div className="flex flex-col gap-2">
      {Object.keys(MENU).map((key) => (
        <div key={key}>
          <h2 className="text-small px-2">{CATEGORY[key as MENU_CATEGORY]}</h2>
          {MENU[key as MENU_CATEGORY].map((item) => (
            <div key={item.id} className="flex justify-center items-center py-2 px-3 border-0 border-b border-solid border-gray-200">
              <div className="flex-1">
                <div className="text-subheading">{item.name}</div>
                {/* <div>{item.description}</div> */}
                <div className="text-tiny">&#8377;{item.price}</div>
              </div>
              <div className="flex bg-gray-200 rounded-sm overflow-hidden">
                <span className="flex justify-center items-center w-6 h-6 border-0 bg-gray-200" onClick={() => handleUpdateCart(item.id, -1)}><Image className="w-4 h-4" src={MinusIcon} alt="-" /></span>
                <span className="flex justify-center items-center w-6 h-6 bg-gray-50">{cart[item.id] || 0}</span>
                <span className="flex justify-center items-center w-6 h-6 border-0 bg-gray-200" onClick={() => handleUpdateCart(item.id, 1)}><Image className="w-4 h-4" src={PlusIcon} alt="+" /></span>
              </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
