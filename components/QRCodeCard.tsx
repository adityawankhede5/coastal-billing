import { PAYMENT_METHOD } from "@/zustand/types";
import QRCode from "react-qr-code";

const UPI_ID = "Q156327102@ybl";
const NAME = "PhonePeMerchant";
const DISPLAY_NAME = "MR KUBER NITIN PATIL";
export default function QRCodeCard({ amount, handlePaymentMethodClick }: { amount: number, handlePaymentMethodClick: (method: PAYMENT_METHOD) => void }) {
  let value = `upi://pay?pa=${UPI_ID}&pn=${NAME}&mc=0000&mode=02&purpose=00&cu=INR&tn=Coastal%20Cafe`;
  if (amount > 0) {
    value += `&am=${amount}`;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex-1 font-bold text-lg">{DISPLAY_NAME}</div>

      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <QRCode value={value} size={128} />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-sm text-gray-400 font-bold">Received via</div>
        <div className="flex gap-2 w-full">
          <div className="w-full flex-1 button-ghost text-sm text-gray-500 text-center" onClick={() => handlePaymentMethodClick(PAYMENT_METHOD.CASH)}>Cash</div>
          <div className="w-full flex-1 button-primary text-sm text-gray-500 text-center" onClick={() => handlePaymentMethodClick(PAYMENT_METHOD.ONLINE)}>Online</div>
        </div>
      </div>
    </>
  )
}