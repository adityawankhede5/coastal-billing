import { CATEGORY, MENU_CATEGORY_ICONS, MENU_DICTIONARY } from "@/constants/menu";
import { Order } from "@/zustand/types";
import { MENU_CATEGORY } from "@/constants/types";
import { groupBy, sortBy } from "lodash";
import { useMemo } from "react";

export default function Bill({ order, detailed = false }: { order: Order, detailed?: boolean }) {
  const cartItems = useMemo(() => {
    return groupBy(sortBy(Object.keys(order.cart).map((key) => {
      const item = MENU_DICTIONARY[key as MENU_CATEGORY];
      return {
        id: key,
        name: item.name,
        quantity: order.cart[key],
        price: item.price,
        type: item.type,
      }
    }), ['type', 'name']), 'type')
  }, [order.cart])
  return (
    <main className="mt-2 flex flex-col gap-2 p-4 border border-solid border-gray-200 rounded-xl">
      <div className={`flex flex-col gap-2 ${detailed ? '' : 'max-h-48 overflow-y-auto -mr-4 pr-4'}`}>
        {Object.keys(cartItems).map((type) => {
          if (cartItems[type].length === 0) return null;
          return (
            <div key={type}>
              <div className="flex items-center my-2 gap-2 text-gray-500 font-bold text-sm">
                <div className="underline underline-offset-4 decoration-emerald-600 decoration-2">{CATEGORY[type as MENU_CATEGORY]}</div>
              </div>
              {cartItems[type].map((item) => {
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
          )
        })}
      </div>
      <div className="border-0 border-t-2 border-dashed border-gray-200"></div>
      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-gray-700">Total</span>
        <span className="text-base font-bold text-gray-700">&#8377;{order.price}</span>
      </div>
    </main>
  );
}