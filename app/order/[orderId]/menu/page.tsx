"use client"
import MENU, { CATEGORY, MENU_DICTIONARY } from "@/constants/menu";
import { MENU_CATEGORY, MENU_ITEM } from "@/constants/types";
import { useParams } from "next/navigation";
import NotFound from "@/components/NotFound";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SearchInput from "@/components/SearchInput";
import { useEffect, useRef, useState } from "react";
import MenuItemCard from "@/components/MenuItemCard";
import { ORDERS_COLLECTION } from "@/constants/DB";
import { Order } from "@/zustand/types";
import { fetchOrder } from "@/zustand/helper";
export default function Menu() {
  const [menu, setMenu] = useState<Record<MENU_CATEGORY, MENU_ITEM[]>>(MENU);
  const [order, setOrder] = useState<Order | null>(null); 
  const query = useRef("");
  const { orderId } = useParams();
  useEffect(() => {
    fetchOrder(orderId as string).then((order) => {
      setOrder(order);
    });
  }, [orderId]);
  const handleUpdateCart = (itemId: string, quantity: number = 1) => {
    if (!order) return;
    const item = MENU_DICTIONARY[itemId];
    if (!item) return;
    if (quantity < 0) {
      if (!order.cart[itemId]) return;
      if (order.cart[itemId] === 0) return;
    }
    const newCart = { ...order.cart };
    newCart[itemId] = (newCart[itemId] || 0) + quantity;
    if (newCart[itemId] === 0) {
      delete newCart[itemId];
    }
    const newTotalPrice = order.price + item.price * quantity;
    const newQuantity = order.quantity + quantity;
    const newOrder = { ...order, cart: newCart, price: newTotalPrice, quantity: newQuantity }
    setOrder(newOrder);
  }
  const handleSaveCart = async () => {
    if (!order) return;
    try {
      const orderRef = doc(db, ORDERS_COLLECTION, order.id);
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
    query.current = search;
    const searchLowerCase = search.toLowerCase();
    const filteredMenu = Object.keys(MENU).reduce((acc, key) => {
      const items = MENU[key as MENU_CATEGORY].filter((item) => item.name.toLowerCase().includes(searchLowerCase));
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
              <MenuItemCard key={item.id} item={item} quantity={order.cart[item.id] || 0} orderId={orderId as string} query={query.current} handleUpdateCart={handleUpdateCart} />
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
