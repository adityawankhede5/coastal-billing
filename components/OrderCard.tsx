"use client"
import { getRoute } from "@/constants/routes";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { Order, ORDER_STATUS } from "@/zustand/types";
import { useState } from "react";
import PackageIcon from "@/assets/icons/Package.icon";
import ChevronUpIcon from "@/assets/icons/ChevronUp.icon";
import ChevronDownIcon from "@/assets/icons/ChevronDown.icon";
import HydrationSafeDate from "./HydrationSafeDate";
import OrderPDF from "./OrderPDF";
import ShareIcon from "@/assets/icons/Share.icon";
import { createRoot } from "react-dom/client";
import { isEmpty } from "lodash";
import { MENU_DICTIONARY } from "@/constants/menu";
import OrderStatusCard from "./OrderStatusCard";
import PaymentDetailsCard from "./PaymentDetailsCard";
export default function OrderCard({ order }: { order: Order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleShareClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const container = document.createElement('div');
    container.setAttribute('id', `order-pdf-${order.id}-container`);
    document.body.appendChild(container);

    container.style.position = 'absolute';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    createRoot(container).render(<OrderPDF order={order} />);
  }
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <Link href={getRoute(order.id, ROUTES.MENU)}>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PackageIcon className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-500">Order #</span>
            <span className="font-bold text-gray-900"><HydrationSafeDate milliseconds={order.createdAt} /></span>
          </div>
          <div className="flex items-center gap-2">
            <OrderStatusCard status={order.status} />
            {order.status === ORDER_STATUS.COMPLETE && <PaymentDetailsCard order={order} className="flex-col pl-2 border-l border-gray-200 items-start" />}
          </div>
        </div>
      </Link>
      {/* Total Section with Accordion */}
      <div
        className="border-t border-gray-100 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-4 flex items-center justify-between bg-gray-50">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500">Total Amount</span>
            <span className="ml-2 text-lg font-bold text-indigo-600">
              &#8377;{order.price.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="cursor-pointer" onClick={handleShareClick}>
              <ShareIcon className="w-5 h-5 text-gray-400" />
            </span>
          {isExpanded ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          )}
          </div>
        </div>

        {/* Expandable Items Section */}
        <div
          className={`transition-all duration-300 ease-in-out ${isExpanded ? 'overflow-y-auto max-h-64' : 'overflow-hidden max-h-0'
            }`}
        >
          <div className="p-4 space-y-3 bg-white">
            {!isEmpty(order.cart) ? Object.keys(order.cart).map((itemId, index) => {
              const item = MENU_DICTIONARY[itemId];
              return (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    <span className="text-xs text-gray-500 ml-2">x{order.cart[itemId]}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    &#8377;{(item.price * order.cart[itemId]).toFixed(2)}
                  </span>
                </div>
              )
            })
              :
              <div className="flex justify-center items-center h-full">
                <span className="text-sm font-medium text-gray-500">No items in cart</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}