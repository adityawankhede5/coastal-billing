import { Order, ORDER_STATUS, PAYMENT_METHOD } from "@/zustand/types";
import { useEffect } from "react";
import { useState } from "react";

type ORDERS_OVERVIEW = {
  count: number;
  totalPrice: number;
  cash?: {
    count: number;
    totalPrice: number;
  },
  online?: {
    count: number;
    totalPrice: number;
  }
}

export default function OrdersOverview({ orders, dateFilters }: { orders: Order[], dateFilters: string[] }) {
  const [completeOrders, setCompleteOrders] = useState<ORDERS_OVERVIEW>({ count: 0, totalPrice: 0 });
  const [pendingOrders, setPendingOrders] = useState<ORDERS_OVERVIEW>({ count: 0, totalPrice: 0 });
  const [totalOrders, setTotalOrders] = useState<ORDERS_OVERVIEW>({ count: 0, totalPrice: 0 });
  useEffect(() => {
    const completeOverview = {
      count: 0,
      totalPrice: 0,
      cash: {
        count: 0,
        totalPrice: 0
      },
      online: {
        count: 0,
        totalPrice: 0
      },
      split: {
        count: 0,
        totalPrice: 0
      }
    }
    const pendingOverview = {
      count: 0,
      totalPrice: 0
    }
    const totalOverview = {
      count: 0,
      totalPrice: 0
    }
    if (dateFilters.length > 0) {
      orders = orders.filter((order) => {
        const date = new Date(order.createdAt);
        const adjusted = new Date(order.createdAt);

        // If time is before 4am, subtract a day to group it with the previous day
        if (date.getHours() < 4) {
          adjusted.setDate(date.getDate() - 1);
        }

        // Set to 4am of that day for consistent grouping
        adjusted.setHours(4, 0, 0, 0);
        return dateFilters.includes(adjusted.toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }));
      });
    }
    orders.forEach((order) => {
      if (order.status === ORDER_STATUS.COMPLETE) {
        completeOverview.count++;
        completeOverview.totalPrice += order.price;
        if (order.payment?.method === PAYMENT_METHOD.CASH) {
          completeOverview.cash.count++;
          completeOverview.cash.totalPrice += order.price;
        } else if (order.payment?.method === PAYMENT_METHOD.ONLINE) {
          completeOverview.online.count++;
          completeOverview.online.totalPrice += order.price;
        } else if (order.payment?.method === PAYMENT_METHOD.SPLIT) {
          completeOverview.split.count++;
          completeOverview.split.totalPrice += order.price;
          completeOverview.cash.totalPrice += order.payment.splitAmount?.cash || 0;
          completeOverview.online.totalPrice += order.payment.splitAmount?.online || 0;
        }
      } else if (order.status === ORDER_STATUS.PENDING) {
        pendingOverview.count++;
        pendingOverview.totalPrice += order.price;
      }
      totalOverview.count++;
      totalOverview.totalPrice += order.price;
    });
    setCompleteOrders(completeOverview);
    setPendingOrders(pendingOverview);
    setTotalOrders(totalOverview);
  }, [orders, dateFilters]);
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-3 grid grid-cols-2 gap-3">
        <div className="bg-gray-100 rounded-xl p-4">
          <h2 className="text-sm font-bold">Pending</h2>
          <p className="text-lg text-amber-600">{pendingOrders.count}</p>
          <p className="text-sm text-gray-500">&#8377;{pendingOrders.totalPrice}</p>
        </div>

        <div className="bg-gray-100 rounded-xl p-4">
          <h2 className="text-sm font-bold">Complete</h2>
          <p className="text-lg text-emerald-600">{completeOrders.count}</p>
          <p className="text-sm text-gray-500">&#8377;{completeOrders.totalPrice}</p>
        </div>

        <div className="bg-gray-100 rounded-xl p-4 col-span-2 flex gap-4">
          <div className="border-r border-gray-300 flex-2">
            <h2 className="text-sm font-bold">Total</h2>
            <p className="text-lg text-indigo-600">{totalOrders.count}</p>
            <p className="text-sm text-gray-500">&#8377;{totalOrders.totalPrice}</p>
          </div>
          <div className="flex flex-col gap-1 flex-3">
            <div className="flex  gap-2">
              <p className="text-sm text-gray-500 flex-1">Cash</p>
              <p className="text-sm text-emerald-600 border-r border-gray-200 pr-2">&#8377;{completeOrders.cash?.totalPrice}</p>
              <p className="text-sm text-gray-600">{completeOrders.cash?.count}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm text-gray-500 flex-1">Online</p>
              <p className="text-sm text-emerald-600 border-r border-gray-200 pr-2">&#8377;{completeOrders.online?.totalPrice}</p>
              <p className="text-sm text-gray-600">{completeOrders.online?.count}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-sm text-gray-500 flex-1">Pending</p>
              <p className="text-sm text-amber-600 border-r border-gray-200 pr-2">&#8377;{pendingOrders.totalPrice}</p>
              <p className="text-sm text-gray-600">{pendingOrders.count}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}