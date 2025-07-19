import QRCode from "react-qr-code";
import PaymentMethodInput from "./UI/PaymentMethodInput";
import { PAYMENT_METHOD } from "@/zustand/types";
import { useParams, useRouter } from "next/navigation";
import { toast } from "./toast";
import { ROUTES } from "@/constants/routes";
import { updateOrderPayment } from "@/lib/utils";

const UPI_ID = "paytm.s1c9yxw@pty";
const NAME = "Paytm";
const DISPLAY_NAME = "TEJAS MARUTI AGAVANE";
export default function QRCodeCard({ amount }: { amount: number }) {
  const { orderId } = useParams();
  const router = useRouter();
  let value = `upi://pay?pa=${UPI_ID}&pn=${NAME}&mc=0000&mode=02&purpose=00&cu=INR&tn=Coastal%20Cafe`;
  if (amount > 0) {
    value += `&am=${amount}`;
  }

  const handleSubmit = async (method: PAYMENT_METHOD, splitAmount: { cash: string, online: string } = { cash: "", online: "" }) => {
    if (!orderId) return;
    try {
      const receivedAt = Date.now();
      const split = {
        cash: Number(splitAmount.cash),
        online: Number(splitAmount.online),
      }
      await updateOrderPayment(orderId as string, method, receivedAt, split);
      toast("Order complete", "success");
      setTimeout(() => {
        router.push(ROUTES.ORDERS);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex-1 font-bold text-lg">{DISPLAY_NAME}</div>

      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <QRCode value={value} size={128} />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-sm text-gray-400 font-bold">Received via</div>
        <PaymentMethodInput amount={amount} onSubmit={handleSubmit} />
      </div>
    </>
  )
}