"use client";
import SettingsIcon from "@/assets/icons/Settings.icon";
import DeleteIcon from "@/assets/icons/Delete.icon";
import { useParams, useRouter } from "next/navigation";
import { deleteOrder } from "@/lib/utils";
import { toast } from "./toast";
import { useState } from "react";
export default function OrderSettingsDropdown() {
  const orderId = useParams().orderId;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleDeleteOrder = async () => {
    const response = await deleteOrder(orderId as string);
    if (response.status === "success") {
      toast("Order deleted successfully");
      setTimeout(() => {
        router.back();
      }, 300);
    } else {
      toast("Failed to delete order");
    }
  };
  return (
    <div className="relative">
      <SettingsIcon onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="absolute top-full right-0 bg-white shadow-md rounded-md min-w-40 p-2 mt-2 flex flex-col gap-2 text-xl font-semibold border border-solid border-neutral-300">
          <div className="flex items-center gap-1 text-red-500" onClick={handleDeleteOrder}>
            <DeleteIcon className="w-5 h-5" />
            <div>Delete</div>
          </div>
        </div>
      )}
    </div>
  );
}