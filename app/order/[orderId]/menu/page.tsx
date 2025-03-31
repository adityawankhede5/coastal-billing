"use client"
import MENU, { CATEGORY } from "@/constants/menu";
import { MENU_CATEGORY, MENU_ITEM } from "@/constants/types";
import PlusIcon from "@/assets/icons/plus.svg";
import MinusIcon from "@/assets/icons/minus.svg";
import Image from "next/image";
import useOrdersStore, { useOrder } from "@/zustand/store";
import { useParams } from "next/navigation";
import NotFound from "@/components/NotFound";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";
export default function Menu() {
  const [menu, setMenu] = useState<Record<MENU_CATEGORY, MENU_ITEM[]>>(MENU);
  const { orderId } = useParams();
  const order = useOrder(orderId as string);
  const { updateCart } = useOrdersStore();
  const handleUpdateCart = (itemId: string, quantity: number = 1) => {
    if (!order) return;
    updateCart(order.id, itemId, quantity);
  }
  const handleSaveCart = async () => {
    if (!order) return;
    try {
      const orderRef = doc(db, "orders", order.id);
      await updateDoc(orderRef, {
        cart: order.cart,
        price: order.price,
        quantity: order.quantity,
      })
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = (search: string) => {
    const searchLowerCase = search.toLowerCase();
    const filteredMenu = Object.keys(MENU).reduce((acc, key) => {
      const items = MENU[key as MENU_CATEGORY].filter((item) => item.name.toLowerCase().includes(searchLowerCase) || item.description.toLowerCase().includes(searchLowerCase));
      if (items.length > 0) {
        acc[key as MENU_CATEGORY] = items;
      }
      return acc;
    }, {} as Record<MENU_CATEGORY, MENU_ITEM[]>);
    setMenu(filteredMenu);
  }

  if (!order) return <NotFound message="Order not found" />;
  return (
    <>
      <div className="flex flex-col gap-2 pb-10">
        {Object.keys(menu).map((key) => (
          <div key={key}>
            <h2 className="text-small px-2">{CATEGORY[key as MENU_CATEGORY]}</h2>
            {menu[key as MENU_CATEGORY].map((item) => (
              <div key={item.id} className="flex justify-center items-center py-2 px-3 border-0 border-b border-solid border-gray-200">
                <div className="flex-1">
                  <div className="text-subheading">{item.name}</div>
                  {/* <div>{item.description}</div> */}
                  <div className="text-tiny">&#8377;{item.price}</div>
                </div>
                <div className="flex bg-gray-200 rounded-sm overflow-hidden">
                  <span className="flex justify-center items-center w-6 h-6 border-0 bg-gray-200" onClick={() => handleUpdateCart(item.id, -1)}><Image className="w-4 h-4" src={MinusIcon} alt="-" /></span>
                  <span className="flex justify-center items-center w-6 h-6 bg-gray-50">{order.cart[item.id] || 0}</span>
                  <span className="flex justify-center items-center w-6 h-6 border-0 bg-gray-200" onClick={() => handleUpdateCart(item.id, 1)}><Image className="w-4 h-4" src={PlusIcon} alt="+" /></span>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-end items-center gap-2 absolute left-0 right-0 bottom-10 py-1 px-2">
          <SearchInput onSearch={handleSearch} />
          <button className="button button-primary" onClick={handleSaveCart}>Save</button>
        </div>
      </div>
    </>
  );
}
