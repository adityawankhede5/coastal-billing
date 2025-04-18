import { fetchOrder } from "@/lib/utils";
import Menu from "./Menu";
import { PageProps } from "@/.next/types/app/page";

export default async function Page({
  params,
}: {
  params: PageProps["params"];
}) {
  const { orderId } = await params;
  const order = await fetchOrder(orderId);
  return <Menu _order={order} />;
}
