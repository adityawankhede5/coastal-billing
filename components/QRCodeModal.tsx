"use client";

import Image from "next/image";
import QRCode from "react-qr-code";
import closeIcon from "@/assets/icons/close.svg";
import RupeeIcon from "@/assets/icons/Rupee.icon";
import { ORDER_STATUS, PAYMENT_METHOD } from "@/zustand/types";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ORDERS_COLLECTION } from "@/constants/DB";
const UPI_ID = "Q156327102@ybl";
const NAME = "PhonePeMerchant";
const DISPLAY_NAME = "MR KUBER NITIN PATIL";
export default function QRCodeModal({ amount, orderId, onClose }: { amount: number, orderId: string, onClose: () => void }) {
  let value = `upi://pay?pa=${UPI_ID}&pn=${NAME}&mc=0000&mode=02&purpose=00&cu=INR&tn=Coastal%20Cafe`;
  if (amount > 0) {
    value += `&am=${amount}`;
  }
  const handlePaymentMethodClick = async (method: PAYMENT_METHOD) => {
    if (!orderId) return;
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, {
      status: ORDER_STATUS.COMPLETE,
      payment: {
        method: method,
        receivedAt: new Date(),
      }

    });
    onClose();
  }
  return (
    <div className="fixed w-full h-full  left-0 top-0 bg-black/75 flex justify-center items-center gap-2 z-50" onClick={onClose}>
      <div className="bg-white rounded-md p-4 flex flex-col gap-4 relative" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col items-center justify-center">
          <div className="flex-1 font-bold text-lg">{DISPLAY_NAME}</div>
          <div className="flex items-center justify-center">
            <div className="text-lg font-bold text-gray-400">Total:</div>
            <div className="flex items-center text-gray-900">
              <RupeeIcon className="w-4 h-4 " />
              <span className="text-lg font-medium">{amount}</span>
            </div>

          </div>
        </div>

        <span onClick={onClose} className="absolute right-0 -top-10 rounded-md w-8 h-8 flex justify-center items-center"><Image src={closeIcon} alt="close" /></span>
        <QRCode value={value} size={256} />
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-sm text-gray-400 font-bold">Received via</div>
          <div className="w-full button-ghost text-sm text-gray-500 text-center" onClick={() => handlePaymentMethodClick(PAYMENT_METHOD.CASH)}>Cash</div>
          <div className="w-full button-primary text-sm text-gray-500 text-center" onClick={() => handlePaymentMethodClick(PAYMENT_METHOD.ONLINE)}>Online</div>
        </div>
      </div>
    </div>
  )
}