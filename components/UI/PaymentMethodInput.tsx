import CashInIcon from "@/assets/icons/CashIn.icon";
import CheckCircleIcon from "@/assets/icons/CheckCirlce.icon";
import CloseIcon from "@/assets/icons/Close.icon";
import QRIcon from "@/assets/icons/QR.icon";
import SplitIcon from "@/assets/icons/Split.icon";
import { PAYMENT_METHOD } from "@/zustand/types";
import { useState } from "react";

export default function PaymentMethodInput({ amount, onSubmit }: { amount: number, onSubmit: (method: PAYMENT_METHOD, splitAmount: { cash: string, online: string }) => void }) {
  const [showSplit, setShowSplit] = useState(false);
  const [splitInput, setSplitInput] = useState({
    cash: "",
    online: "",
  });
  const handleSplitInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: "cash" | "online") => {
    let cash = "";
    let online = "";
    if (e.target.value) {
      if (type === "cash") {
        cash = e.target.value;
        online = (amount - Number(cash)).toString();
      } else {
        online = e.target.value;
        cash = (amount - Number(online)).toString();
      }
    }
    setSplitInput({ cash, online });
  }
  const handleSplitSubmit = () => {
    setShowSplit(false);
    handleSubmit(PAYMENT_METHOD.SPLIT, splitInput);
  }
  const handleSubmit = (method: PAYMENT_METHOD, splitAmount: { cash: string, online: string } = { cash: "", online: "" }) => {
    const _splitAmount = { cash: splitAmount.cash, online: splitAmount.online };
    if (method === PAYMENT_METHOD.CASH) {
      _splitAmount.online = "0";
      _splitAmount.cash = amount.toString();
    } else if (method === PAYMENT_METHOD.ONLINE) {
      _splitAmount.cash = "0";
      _splitAmount.online = amount.toString();
    }
    onSubmit(method, _splitAmount);
  }
  if (showSplit) {
    return (
      <div className="grid grid-cols-2 gap-2 w-full">
        <input autoFocus type="number" placeholder="Cash" value={splitInput.cash} onChange={(e) => handleSplitInputChange(e, "cash")} className="w-full flex justify-center items-center gap-2 flex-1 button border-2 border-emerald-600 outline-none text-md text-center" />
        <input type="number" placeholder="Online" value={splitInput.online} onChange={(e) => handleSplitInputChange(e, "online")} className="w-full flex justify-center items-center gap-2 flex-1 button border-2 border-purple-600 outline-none text-md text-center" />
        <div className="w-full flex gap-2 col-span-2">
          <div className="w-full flex justify-center items-center gap-2 button border border-blue-600 bg-blue-600 text-white text-sm text-center col-span-3" onClick={handleSplitSubmit}><CheckCircleIcon className="w-5 h-5" /> Done</div>
          <div className="flex justify-center items-center gap-2 button border border-blue-600 text-blue-600 text-sm text-center" onClick={() => setShowSplit(false)}><CloseIcon className="w-5 h-5" /></div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <div className="w-full flex justify-center items-center gap-2 flex-1 button border border-emerald-600 bg-emerald-600 text-white text-sm text-center" onClick={() => handleSubmit(PAYMENT_METHOD.CASH)}><CashInIcon className="w-5 h-5" /> Cash</div>
      <div className="w-full flex justify-center items-center gap-2 flex-1 button border border-purple-600 bg-purple-600 text-white text-sm text-center" onClick={() => handleSubmit(PAYMENT_METHOD.ONLINE)}><QRIcon className="w-5 h-5" /> Online</div>
      <div className="w-full flex justify-center items-center gap-2 flex-1 button border border-blue-600 bg-blue-600 text-white text-sm text-center col-span-2" onClick={() => setShowSplit(true)}><SplitIcon className="w-5 h-5" /> Split</div>
    </div>
  )
}