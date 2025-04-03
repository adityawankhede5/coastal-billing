import MinusIcon from "@/assets/icons/Minus.icon";
import PlusIcon from "@/assets/icons/Plus.icon";
import { MENU_CATEGORY_ICONS } from "@/constants/menu";
import HighlightText from "./HighlightText";
import { MENU_ITEM } from "@/constants/types";

export default function MenuItemCard({ item, quantity = 0, query, handleUpdateCart }: { item: MENU_ITEM, quantity: number, query: string, handleUpdateCart: (itemId: string, quantity: number) => void }) {
  const Icon = MENU_CATEGORY_ICONS[item.type];
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="min-w-12 min-h-12">
            <Icon className="w-full h-full text-indigo-400" />
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900"><HighlightText text={item.name} query={query} /></span>
            <span className="text-sm text-gray-500">{item.description}</span>
          </div>

        </div>
      </div>

      <div className="p-4 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-indigo-600">
            &#8377;{item.price}
          </span>
          <span className="-ml-2 text-sm font-medium text-gray-500 border-0 pr-2 border-r border-solid border-gray-400">/piece</span>
          <span className="text-sm font-medium text-gray-500">Total</span>
          <span className="text-lg font-bold text-indigo-600">
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