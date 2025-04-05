import CartIcon from "@/assets/icons/CartIcon";
import { Order, PAYMENT_METHOD } from "@/zustand/types";
import QRCodeCard from "./QRCodeCard";
import OrderStatusCard from "./OrderStatusCard";
import CloseIcon from "@/assets/icons/Close.icon";
import Bill from "./Bill";

export default function CartModal({ order, onClose, handlePaymentMethodClick }: { order: Order, onClose: () => void, handlePaymentMethodClick: (method: PAYMENT_METHOD) => void }) {
  return (
    <div className="box-border fixed top-0 left-0 w-screen h-screen bg-black/75 z-50" onClick={onClose}>
      <div className="absolute bottom-0 w-full bg-white rounded-t-2xl p-4" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center gap-2 border-b-0 border-gray-200 pb-2">
          <CartIcon className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Cart</h1>
          <div className="flex-1 flex">
            <OrderStatusCard status={order.status} />
          </div>
          <CloseIcon className="w-6 h-6" onClick={onClose} />
        </header>
        <Bill order={order} />

        <main className="mt-2 flex flex-col gap-2 p-4 border border-solid border-gray-200 rounded-xl">
          <QRCodeCard amount={order.price} handlePaymentMethodClick={handlePaymentMethodClick} />
        </main>
      </div>
    </div>
  )
}