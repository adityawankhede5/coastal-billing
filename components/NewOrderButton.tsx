import PlusIcon from "@/assets/icons/Plus.icon";
import { createOrder } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { getRoute } from "@/constants/routes";
import { useRouter } from "next/navigation";
export default function NewOrderButton() {
  const router = useRouter();
  const handleNewOrder = async () => {
    const response = await createOrder();
    if (response.status === "success" && response.orderId) {
      router.push(getRoute(response.orderId, ROUTES.MENU));
    }
  }
  return (
    <span onClick={handleNewOrder} className="fixed bottom-6 right-4 w-12 h-12 bg-blue-600 rounded-full flex justify-center items-center z-30">
      <PlusIcon className="w-7 h-7 text-white" />
    </span>
  );
}