"use client";
import { MENU_DICTIONARY } from "@/constants/menu";
import QRCodeModal from "@/components/QRCodeModal";
import { useEffect, useState } from "react";
import { useOrder } from "@/zustand/store";
import NotFound from "@/components/NotFound";
import { useParams } from "next/navigation";
import MenuItemCard from "@/components/MenuItemCard";

export default function Cart() {
  const { orderId } = useParams();
  const order = useOrder(orderId as string);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const handleQRGenerateClick = () => {
    setIsQRCodeModalOpen(true);
  }
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  if (!isHydrated) return <></>;
  if (!order) return <NotFound message="Order not found" />
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="pb-40 flex flex-col gap-2">
          {Object.keys(order.cart).map((key) => (
            <MenuItemCard key={key} item={MENU_DICTIONARY[key]} quantity={order.cart[key]} orderId={orderId as string} query={""} />
          ))}
        </div>
        <div className="box-border fixed flex flex-col justify-center gap-2 bottom-10 h-28 left-0 right-0 px-4 bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 border-t-2 border-solid border-gray-200">
          <div className="flex justify-between gap-1 font-bold text-2xl">
            <div>Total:</div>
            <div className="text-subheading">&#8377;{order.price}</div>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={handleQRGenerateClick} className="button-primary w-full">Generate QR</button>
          </div>
        </div>
      </div>
      {isQRCodeModalOpen && <QRCodeModal orderId={orderId as string} amount={order.price} onClose={() => setIsQRCodeModalOpen(false)} />}
    </>

  )
}