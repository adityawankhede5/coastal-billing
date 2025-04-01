"use client"
import MENU, { CATEGORY } from "@/constants/menu";
import { MENU_CATEGORY, MENU_ITEM } from "@/constants/types";
import { useOrder } from "@/zustand/store";
import { useParams } from "next/navigation";
import NotFound from "@/components/NotFound";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import MenuItemCard from "@/components/MenuItemCard";
export default function Menu() {
  const [menu, setMenu] = useState<Record<MENU_CATEGORY, MENU_ITEM[]>>(MENU);
  const { orderId } = useParams();
  const order = useOrder(orderId as string);
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
      <div className="flex flex-col gap-2 pb-12">
        {Object.keys(menu).map((key) => (
          <div key={key}>
            <div className="flex items-center my-2 gap-2 text-gray-500 font-bold text-lg">
              <div>{CATEGORY[key as MENU_CATEGORY]}</div>
            </div>
            <div className="flex flex-col gap-2">
            {menu[key as MENU_CATEGORY].map((item) => (
              <MenuItemCard key={item.id} item={item} quantity={order.cart[item.id] || 0} orderId={orderId as string} />
            ))}
            </div>
          </div>
        ))}
        <div className="text-md font-bold p-2 text-center text-neutral-400 ">End of list</div>
        <div className="flex justify-end items-center gap-2 absolute left-0 right-0 bottom-10 py-1 px-2">
          <SearchInput onSearch={handleSearch} />
          <button className="button button-primary" onClick={handleSaveCart}>Save</button>
        </div>
      </div>
    </>
  );
}
