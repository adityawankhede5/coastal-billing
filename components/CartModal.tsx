import CartIcon from "@/assets/icons/CartIcon";
import { MENU_CATEGORY_ICONS, MENU_DICTIONARY } from "@/constants/menu";
import { MENU_CATEGORY } from "@/constants/types";
import { Order } from "@/zustand/types";
import { useMemo } from "react";
import QRCodeCard from "./QRCodeCard";
import OrderStatusCard from "./OrderStatusCard";
import CloseIcon from "@/assets/icons/Close.icon";
import { sortBy } from "lodash";

export default function CartModal({ order, onClose }: { order: Order, onClose: () => void }) {
  const cartItems = useMemo(() => {
    return sortBy(Object.keys(order.cart).map((key) => {
      const item = MENU_DICTIONARY[key as MENU_CATEGORY];
      return {
        id: key,
        name: item.name,
        quantity: order.cart[key],
        price: item.price,
        type: item.type,
      }
    }), ['type', 'name'])
  }, [order.cart])
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
        <main className="mt-2 flex flex-col gap-2 p-4 border border-solid border-gray-200 rounded-xl">
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto -mr-4 pr-4">
            {cartItems.map((item) => {
              const Icon = MENU_CATEGORY_ICONS[item.type];
              return (
                <div key={item.id} className="flex items-center gap-1">
                  <Icon key={item.id} className="min-w-1 min-h-1 text-indigo-400" />
                  <span className="text-base font-bold text-gray-700">{item.name}</span>
                  <span className="text-sm text-gray-500">x{item.quantity}</span>
                  <span className="text-base flex-1 text-right font-bold text-gray-500">&#8377;{item.price * item.quantity}</span>
                </div>
              )
            })}
          </div>
          <div className="border-0 border-t-2 border-dashed border-gray-200"></div>
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-700">Total</span>
            <span className="text-base font-bold text-gray-700">&#8377;{order.price}</span>
          </div>
        </main>

        <main className="mt-2 flex flex-col gap-2 p-4 border border-solid border-gray-200 rounded-xl">
          <QRCodeCard amount={order.price} orderId={order.id} />
        </main>
      </div>
    </div>
  )
}