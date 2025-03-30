"use client";

import Image from "next/image";
import QRCode from "react-qr-code";
import closeIcon from "@/assets/icons/close.svg";
const UPI_ID = "8446778239@jupiteraxis";
const NAME = "ADITYA KAILASRAO WANKHEDE";
export default function QRCodeModal({ amount, onClose }: { amount: number, onClose: () => void }) {
  let value = `upi://pay?pa=${UPI_ID}&pn=${NAME}&cu=INR`;
  if (amount > 0) {
    value += `&am=${amount}`;
  }
  return (
    <div className="fixed w-full h-full  left-0 top-0 bg-black/75 flex justify-center items-center gap-2" onClick={onClose}>
      <div className="bg-white rounded-md p-4 flex flex-col gap-4 relative" onClick={(e) => e.stopPropagation()}>
        <span onClick={onClose} className="absolute right-0 -top-10 rounded-md w-8 h-8 flex justify-center items-center"><Image src={closeIcon} alt="close" /></span>
        <QRCode value={value} size={256} />
        <div className="text-center text-base">Amount: <span className="font-bold">&#8377;{amount}</span></div>
      </div>
    </div>
  )
}