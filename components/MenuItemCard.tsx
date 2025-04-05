import MinusIcon from "@/assets/icons/Minus.icon";
import PlusIcon from "@/assets/icons/Plus.icon";
import { MENU_CATEGORY_ICONS } from "@/constants/menu";
import HighlightText from "./HighlightText";
import { MENU_ITEM } from "@/constants/types";

export default function MenuItemCard({ item, quantity = 0, query, handleUpdateCart }: { item: MENU_ITEM, quantity: number, query: string, handleUpdateCart: (itemId: string, quantity: number) => void }) {
  const Icon = MENU_CATEGORY_ICONS[item.type];
  return (
    <div className="relative bg-white rounded-xl grid grid-rows-[auto_1fr_auto] shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full min-h-56 max-h-56 p-4">
      <Icon className="absolute top-0 right-0 w-24 h-24 text-indigo-200/15" />
      <div>
        <span className="text-lg font-bold text-gray-900"><HighlightText text={item.name} query={query} /></span>
        <span className="text-lg font-bold text-gray-700"> (&#8377;{item.price})</span>
      </div>

      <div className="text-ellipsis overflow-hidden">
        <span className="text-sm text-gray-500">{item.description}</span>
      </div>

      <div className="flex items-center gap-1 h-8">
        <span style={{ opacity: quantity <= 0 ? 0.3 : 1 }} className="bg-gray-900 rounded-full w-8 h-8 text-white flex items-center justify-center" onClick={() => handleUpdateCart(item.id, -1)}><MinusIcon /></span>
        <span className="text-lg font-bold text-indigo-600 text-center w-6">
          {quantity}
        </span>
        <span className="bg-gray-900 rounded-full w-8 h-8 text-white flex items-center justify-center" onClick={() => handleUpdateCart(item.id, 1)}><PlusIcon /></span>
        <span className="text-lg font-bold text-indigo-600 text-right flex-1">
          &#8377;{quantity * item.price}
        </span>
      </div>
    </div>
  )
}