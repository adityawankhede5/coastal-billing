"use client";
import { MENU_DICTIONARY } from "@/constants/menu";
import QRCodeModal from "@/components/QRCodeModal";
import { useEffect, useState } from "react";
import NotFound from "@/components/NotFound";
import { useParams } from "next/navigation";
import MenuItemCard from "@/components/MenuItemCard";
import ClockIcon from "@/assets/icons/Clock.icon";
import CheckCircleIcon from "@/assets/icons/CheckCirlce.icon";
import useOrdersStore from "@/zustand/store";
import { Order } from "@/zustand/types";
export default function Cart() {
  const [order, setOrder] = useState<Order | null>(null);
  const { orderId } = useParams();
  const { getOrder, loading } = useOrdersStore();
  useEffect(() => {
    const _order = getOrder(orderId as string);
    if (_order) {
      setOrder(_order);
    }
  }, [getOrder, orderId]);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const handleQRGenerateClick = () => {
    setIsQRCodeModalOpen(true);
  }
  if (!order) return <NotFound message="Order not found" />
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="pb-40 flex flex-col gap-2">
          {Object.keys(order.cart).map((key) => (
            <MenuItemCard key={key} item={MENU_DICTIONARY[key]} quantity={order.cart[key]} orderId={orderId as string} query={""} />
          ))}
        </div>
        <div className="box-border fixed flex flex-col justify-center gap-2 bottom-10 h-28 left-0 right-0 px-4 bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 border-t-2 border-solid border-gray-200">
          <div className="flex items-center mt-2 -mb-1">
            {order.status === 'pending' ? (
              <div className="flex items-center text-amber-600">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Pending</span>
              </div>
            ) : (
              <div className="flex items-center text-emerald-600">
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Complete</span>
              </div>
            )}
          </div>
          <div className="flex justify-between gap-1 font-bold text-2xl">
            <div>Total:</div>
            <div className="text-subheading">&#8377;{order.price}</div>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={handleQRGenerateClick} className="button-primary w-full">Generate QR</button>
          </div>
        </div>
      </div>
      {isQRCodeModalOpen && <QRCodeModal orderId={orderId as string} amount={order.price} onClose={() => setIsQRCodeModalOpen(false)} />}
    </>

  )
}