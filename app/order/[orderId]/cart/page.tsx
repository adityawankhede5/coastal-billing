"use client";
import { MENU_DICTIONARY } from "@/constants/menu";
import QRCodeModal from "@/components/QRCodeModal";
import { useState } from "react";
import { useOrder } from "@/zustand/store";
import NotFound from "@/components/NotFound";
import { useParams } from "next/navigation";

export default function Cart() {
  const { orderId } = useParams();
  const order = useOrder(orderId as string);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const handleQRGenerateClick = () => {
    setIsQRCodeModalOpen(true);
  }
  if (!order) return <NotFound message="Order not found" />
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="pb-40">
          {Object.keys(order.cart).map((key) => (
            <div key={key} className="flex justify-center items-center py-2 px-3 border-0 border-b border-solid border-gray-200">
              <div className="flex-1">
                <div className="text-subheading">{MENU_DICTIONARY[key].name}</div>
                <div className="text-tiny">Qty: {order.cart[key]}</div>
              </div>
              <div className="text-subheading">&#8377;{MENU_DICTIONARY[key].price}</div>
            </div>
          ))}
        </div>
        <div className="box-border fixed flex flex-col justify-center gap-2 bottom-12 h-28 left-0 right-0 px-4 bg-gray-100">
          <div className="flex justify-between gap-1 font-bold text-2xl">
            <div>Total:</div>
            <div className="text-subheading">&#8377;{order.price}</div>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={handleQRGenerateClick} className="button-primary w-full">Generate QR</button>
          </div>
        </div>
      </div>
      {isQRCodeModalOpen && <QRCodeModal amount={order.price} onClose={() => setIsQRCodeModalOpen(false)} />}
    </>

  )
}