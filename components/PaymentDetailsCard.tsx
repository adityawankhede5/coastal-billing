import { Order, ORDER_STATUS, PAYMENT_METHOD } from "@/zustand/types";
import CashOnlinePaymentCard from "./CashOnlinePaymentCard";

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

  return <CashOnlinePaymentCard cash={split.cash} online={split.online} className={className} />
}