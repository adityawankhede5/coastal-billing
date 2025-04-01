import MinusIcon from "@/assets/icons/Minus.icon";
import PlusIcon from "@/assets/icons/Plus.icon";
import RupeeIcon from "@/assets/icons/Rupee.icon";
import { MENU_ITEM } from "@/constants/types";
import useOrdersStore from "@/zustand/store";
import HighlightText from "./HighlightText";

export default function MenuItemCard({ item, quantity = 0, orderId, query }: { item: MENU_ITEM, quantity: number, orderId: string, query: string }) {
  const { updateCart } = useOrdersStore();
  const handleUpdateCart = (itemId: string, quantity: number = 1) => {
    if (!orderId) return;
    updateCart(orderId, itemId, quantity);
  }
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-gray-900"><HighlightText text={item.name} query={query} /></span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center text-gray-900">
            <RupeeIcon className="w-4 h-4 " />
            <span className="text-lg font-medium">{item.price}</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between bg-gray-50">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-500"><RupeeIcon className="w-4 h-4 " /></span>
          <span className="text-lg font-bold text-indigo-600">
            {quantity * item.price}
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