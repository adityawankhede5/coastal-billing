import CheckCircleIcon from "@/assets/icons/CheckCirlce.icon";
import ClockIcon from "@/assets/icons/Clock.icon";
import { ORDER_STATUS } from "@/zustand/types";

export default function OrderStatusCard({ status, textOnly = false }: { status: ORDER_STATUS, textOnly?: boolean }) {
  return (
    <>
      {status === 'pending' ? (
        <div className="flex items-center text-amber-600">
          {!textOnly && <ClockIcon className="w-4 h-4 mr-1" />}
          <span className="text-sm font-medium">Pending</span>
        </div>
      ) : (
        <div className="flex items-center text-emerald-600">
            {!textOnly && <CheckCircleIcon className="w-4 h-4 mr-1" />}
          <span className="text-sm font-medium">Complete</span>
        </div>
      )}</>
  )
}