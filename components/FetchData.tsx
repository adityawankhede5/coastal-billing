import { getOrders } from "@/lib/utils";
import OrderProvider from "./OrderProvider";
export default async function FetchData() {
  const orders = await getOrders();
  return <OrderProvider orders={orders} />
}