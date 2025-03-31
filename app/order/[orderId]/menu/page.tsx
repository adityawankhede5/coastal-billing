"use client"
import MENU, { CATEGORY } from "@/constants/menu";
import { MENU_CATEGORY } from "@/constants/types";
import PlusIcon from "@/assets/icons/plus.svg";
import MinusIcon from "@/assets/icons/minus.svg";
import Image from "next/image";
import useOrdersStore, { useOrder } from "@/zustand/store";
import { useParams } from "next/navigation";
import NotFound from "@/components/NotFound";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
export default function Menu() {
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
  if (!order) return <NotFound message="Order not found" />;
  return (
    <>
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
                  <span className="flex justify-center items-center w-6 h-6 bg-gray-50">{order.cart[item.id] || 0}</span>
                  <span className="flex justify-center items-center w-6 h-6 border-0 bg-gray-200" onClick={() => handleUpdateCart(item.id, 1)}><Image className="w-4 h-4" src={PlusIcon} alt="+" /></span>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-end items-center sticky bottom-0 py-1 px-2">
          <button className="button button-primary" onClick={handleSaveCart}>Save</button>
        </div>
      </div>
    </>
  );
}
