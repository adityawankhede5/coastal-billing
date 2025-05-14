import CashInIcon from "@/assets/icons/CashIn.icon";
import QRIcon from "@/assets/icons/QR.icon";
import { Order, ORDER_STATUS, PAYMENT_METHOD } from "@/zustand/types";

export default function PaymentDetailsCard({ order, className = "" }: { order: Order, className?: string }) {
  const split = {
    cash: 0,
    online: 0,
  }

  if (order.status === ORDER_STATUS.COMPLETE) {
    if (order.payment?.method === PAYMENT_METHOD.SPLIT) {
      split.cash = order.payment.splitAmount?.cash || 0;
      split.online = order.payment.splitAmount?.online || 0;
    } else if (order.payment?.method === PAYMENT_METHOD.CASH) {
      split.cash = order.price;
      split.online = 0;
    } else if (order.payment?.method === PAYMENT_METHOD.ONLINE) {
      split.cash = 0;
      split.online = order.price;
    }
  }

  return (
    <div className={`box-border flex items-center text-sm font-medium text-gray-500 ${className}`}>
      {split.cash !== 0 && <div className="flex items-center gap-1">
        <CashInIcon className="w-4 h-4" />
        <span>{split.cash}</span>
      </div>}
      {split.online !== 0 && <div className="flex items-center gap-1">
        <QRIcon className="w-4 h-4" />
        <span>{split.online}</span>
      </div>}
    </div>
  )
}