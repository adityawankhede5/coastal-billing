import CheckCircleIcon from "@/assets/icons/CheckCirlce.icon";
import ClockIcon from "@/assets/icons/Clock.icon";
import { ORDER_STATUS } from "@/zustand/types";

export default function OrderStatusCard({ status }: { status: ORDER_STATUS }) {
  return (
    <>
      {status === 'pending' ? (
        <div className="flex items-center text-amber-600">
          <ClockIcon className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">Pending</span>
        </div>
      ) : (
        <div className="flex items-center text-emerald-600">
          <CheckCircleIcon className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">Complete</span>
        </div>
      )}</>
  )
}