import MinusIcon from "@/assets/icons/Minus.icon";
import PlusIcon from "@/assets/icons/Plus.icon";
import RupeeIcon from "@/assets/icons/Rupee.icon";
import { MENU_CATEGORY_ICONS } from "@/constants/menu";
import useOrdersStore from "@/zustand/store";
import HighlightText from "./HighlightText";
import { MENU_ITEM } from "@/constants/types";

export default function MenuItemCard({ item, quantity = 0, orderId, query, handleUpdateCart }: { item: MENU_ITEM, quantity: number, orderId: string, query: string, handleUpdateCart: (itemId: string, quantity: number) => void }) {
  const Icon = MENU_CATEGORY_ICONS[item.type];
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-5 h-5">
            <Icon className="w-full h-full text-indigo-400" />
          </span>
          <span className="font-bold text-gray-900"><HighlightText text={item.name} query={query} /></span>

        </div>
        <div className="flex items-center">
          <div className="flex items-center text-gray-900">
            <RupeeIcon className="w-4 h-4 " />
            <span className="text-lg font-semibold">{item.price}</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between bg-gray-50">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-500">Amount</span>
          <span className="ml-2 text-lg font-bold text-indigo-600">
            &#8377;{quantity * item.price}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span style={{ opacity: quantity <= 0 ? 0.3 : 1 }} className="bg-gray-900 rounded-full w-8 h-8 text-white flex items-center justify-center" onClick={() => handleUpdateCart(item.id, -1)}><MinusIcon /></span>
          <span className="text-lg font-bold text-indigo-600 text-center w-6">
            {quantity}
          </span>
          <span className="bg-gray-900 rounded-full w-8 h-8 text-white flex items-center justify-center" onClick={() => handleUpdateCart(item.id, 1)}><PlusIcon /></span>
        </div>
      </div>
    </div>
  )
}