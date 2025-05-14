import CashInIcon from "@/assets/icons/CashIn.icon";
import QRIcon from "@/assets/icons/QR.icon";
import SplitIcon from "@/assets/icons/Split.icon";
import { PAYMENT_METHOD } from "@/zustand/types";

export default function PaymentMethodCard({ method, iconOnly = false, textOnly = false, detailed = false, className = "", amount = { cash: 0, online: 0 } }: { method: PAYMENT_METHOD, iconOnly?: boolean, textOnly?: boolean, detailed?: boolean, className?: string, amount?: { cash: number, online: number } }) {
  if (iconOnly) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {method === PAYMENT_METHOD.CASH && <CashInIcon className="w-4 h-4" />}
        {method === PAYMENT_METHOD.ONLINE && <QRIcon className="w-4 h-4" />}
        {method === PAYMENT_METHOD.SPLIT && <SplitIcon className="w-4 h-4" />}
      </div>
    )
  }
  if (textOnly) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <span className="text-sm font-medium text-gray-500 capitalize border-l pl-2">{method}</span>
      </div>
    )
  }
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {method === PAYMENT_METHOD.CASH && <CashInIcon className="w-4 h-4" />}
      {method === PAYMENT_METHOD.ONLINE && <QRIcon className="w-4 h-4" />}
      {method === PAYMENT_METHOD.SPLIT && <SplitIcon className="w-4 h-4" />}
      <span className="text-sm font-medium text-gray-500 capitalize">{method}</span>
    </div>
  )
}