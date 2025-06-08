import CashInIcon from "@/assets/icons/CashIn.icon";
import QRIcon from "@/assets/icons/QR.icon";

export default function CashOnlinePaymentCard({ cash, online, className = "" }: { cash: number, online: number, className?: string }) {
  return (
    <div className={`box-border flex items-center text-sm font-medium text-gray-500 ${className}`}>
      {cash !== 0 && <div className="flex items-center gap-1">
        <CashInIcon className="w-4 h-4" />
        <span>&#8377;{cash}</span>
      </div>}
      {online !== 0 && <div className="flex items-center gap-1">
        <QRIcon className="w-4 h-4" />
        <span>&#8377;{online}</span>
      </div>}
    </div>
  )
}