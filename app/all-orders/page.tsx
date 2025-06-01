'use client'
import CheckBoxIcon from "@/assets/icons/CheckBox.icon";
import NoOrdersYet from "@/components/EmptyStates/NoOrdersYet";
import Header from "@/components/Header/Header";
import OrdersList from "@/components/OrdersList";
import OrdersOverview from "@/components/OrdersOverview";
import LoadingSkeleton from "@/components/Skeletons/LoadingSkeleton";
import { fetchAllOrders } from "@/lib/utils";
import { Order } from "@/zustand/types";
import { groupBy, isEmpty } from "lodash";
import { useEffect, useState } from "react";

function Title() {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <div className="text-4xl font-bold">All Orders</div>
    </div>
  )
}

export default function AllOrders() {
  const [isLoading, setIsLoading] = useState(true);
  const [groupedOrders, setGroupedOrders] = useState<Record<string, Order[]>>({});
  const [orders, setOrders] = useState<Order[]>([]);
  const [dateFilters, setDateFilters] = useState<string[]>([]);
  useEffect(() => {
    fetchAllOrders().then((orders) => {
      setOrders(orders);
      const groupedOrders = groupBy(orders, (order) => {
        const date = new Date(order.createdAt);
        const adjusted = new Date(order.createdAt);

        // If time is before 4am, subtract a day to group it with the previous day
        if (date.getHours() < 4) {
          adjusted.setDate(date.getDate() - 1);
        }

        // Set to 4am of that day for consistent grouping
        adjusted.setHours(4, 0, 0, 0);
        return adjusted.toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' });
      })
      setGroupedOrders(groupedOrders);
    }).finally(() => {
      setIsLoading(false);
    })
  }, []);
  const onDateFilterClick = (date: string) => {
    setDateFilters(dateFilters.includes(date) ? dateFilters.filter((d) => d !== date) : [...dateFilters, date]);
  }
  if (isLoading) return <LoadingSkeleton />
  if (isEmpty(groupedOrders)) return <NoOrdersYet message="No orders found" />
  return (
    <>
      <Header title={<Title />} titleSmall="All Orders" />
      <OrdersOverview orders={orders} dateFilters={dateFilters} />
      {Object.keys(groupedOrders).map((date) => (
        <div key={date} className="flex flex-col gap-2">
          <div className="flex items-center my-2 gap-2 text-gray-500 font-bold text-lg">
            <div className="underline flex-1 underline-offset-4 decoration-emerald-600 decoration-2">{date}</div>
            <span className={`${dateFilters.includes(date) ? "text-emerald-600 bg-emerald-100" : "text-gray-500 bg-gray-100"}`} onClick={() => onDateFilterClick(date)}><CheckBoxIcon className="w-5 h-5" /></span>
          </div>
          <div className={dateFilters.length > 0 && !dateFilters.includes(date) ? "opacity-50" : "opacity-100"}>
            <OrdersList orders={groupedOrders[date]} />
          </div>
        </div>
      ))}
    </>
  )
}