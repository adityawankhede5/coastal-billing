import CartIcon from "@/assets/icons/CartIcon";
import { Order, ORDER_STATUS } from "@/zustand/types";
import QRCodeCard from "./QRCodeCard";
import OrderStatusCard from "./OrderStatusCard";
import CloseIcon from "@/assets/icons/Close.icon";
import Bill from "./Bill";
import PaymentDetailsCard from "./PaymentDetailsCard";

export default function CartModal({ order, onClose }: { order: Order, onClose: () => void }) {
  return (
    <div className="box-border fixed top-0 left-0 w-screen h-screen bg-black/75 z-50" onClick={onClose}>
      <div className="absolute bottom-0 w-full bg-white rounded-t-2xl p-4" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center gap-2 border-b-0 border-gray-200 pb-2">
          <CartIcon className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Cart</h1>
          <div className="flex-1 flex gap-2">
            <OrderStatusCard status={order.status} />
            {order.status === ORDER_STATUS.COMPLETE && <PaymentDetailsCard order={order} className="flex-col pl-2 border-l border-gray-200" />}
          </div>
          <CloseIcon className="w-6 h-6" onClick={onClose} />
        </header>
        <Bill order={order} />

        <main className="mt-2 flex flex-col gap-2 p-4 border border-solid border-gray-200 rounded-xl">
          <QRCodeCard amount={order.price} />
        </main>
      </div>
    </div>
  )
}