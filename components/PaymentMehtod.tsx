import CashInIcon from "@/assets/icons/CashIn.icon";
import CheckCircleIcon from "@/assets/icons/CheckCirlce.icon";
import CloseIcon from "@/assets/icons/Close.icon";
import QRIcon from "@/assets/icons/QR.icon";
import SplitIcon from "@/assets/icons/Split.icon";
import { PAYMENT_METHOD } from "@/zustand/types";
import { useState } from "react";
export default function PaymentMethod({ handleSubmit, amount }: { handleSubmit: (method: PAYMENT_METHOD) => void, amount: number }) {
  const [showSplit, setShowSplit] = useState(false);
  const [splitAmount, setSplitAmount] = useState({
    cash: "",
    online: "",
  });

  const handleOnlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!value) {
      setSplitAmount({ cash: "", online: "" });
      return;
    }
    const cash = amount - value;
    setSplitAmount({ cash: cash.toString(), online: value.toString() });
  }

  const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!value) {
      setSplitAmount({ cash: "", online: "" });
      return;
    }
    const online = amount - value;
    setSplitAmount({ cash: value.toString(), online: online.toString() });
  }

  const handleClick = (method: PAYMENT_METHOD) => {
    if (method !== PAYMENT_METHOD.SPLIT) {
      handleSubmit(method);
      return;
    }
    setShowSplit(true);
  }

  if (showSplit) {
    return (
      <div className="grid grid-cols-2 gap-2 w-full">
        <input autoFocus type="number" placeholder="Cash" value={splitAmount.cash} onChange={handleCashChange} className="w-full flex justify-center items-center gap-2 flex-1 button border-2 border-emerald-600 outline-none text-md text-center" />
        <input type="number" placeholder="Online" value={splitAmount.online} onChange={handleOnlineChange} className="w-full flex justify-center items-center gap-2 flex-1 button border-2 border-purple-600 outline-none text-md text-center" />
        <div className="w-full flex gap-2 col-span-2">
          <div className="w-full flex justify-center items-center gap-2 button border border-blue-600 bg-blue-600 text-white text-sm text-center col-span-3" onClick={() => handleClick(PAYMENT_METHOD.SPLIT)}><CheckCircleIcon className="w-5 h-5" /> Done</div>
          <div className="flex justify-center items-center gap-2 button border border-blue-600 text-blue-600 text-sm text-center" onClick={() => setShowSplit(false)}><CloseIcon className="w-5 h-5" /></div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <div className="w-full flex justify-center items-center gap-2 flex-1 button border border-emerald-600 bg-emerald-600 text-white text-sm text-center" onClick={() => handleSubmit(PAYMENT_METHOD.CASH)}><CashInIcon className="w-5 h-5" /> Cash</div>
      <div className="w-full flex justify-center items-center gap-2 flex-1 button border border-purple-600 bg-purple-600 text-white text-sm text-center" onClick={() => handleSubmit(PAYMENT_METHOD.ONLINE)}><QRIcon className="w-5 h-5" /> Online</div>
      <div className="w-full flex justify-center items-center gap-2 flex-1 button border border-blue-600 bg-blue-600 text-white text-sm text-center col-span-2" onClick={() => handleClick(PAYMENT_METHOD.SPLIT)}><SplitIcon className="w-5 h-5" /> Split</div>
    </div>
  )
}