import { Order, ORDER_STATUS } from "@/zustand/types";
import { useEffect } from "react";
import { useState } from "react";

type ORDERS_OVERVIEW = {
  count: number;
  totalPrice: number;
}

export default function OrdersOverview({ orders }: { orders: Order[] }) {
  const [completeOrders, setCompleteOrders] = useState<ORDERS_OVERVIEW>({ count: 0, totalPrice: 0 });
  const [pendingOrders, setPendingOrders] = useState<ORDERS_OVERVIEW>({ count: 0, totalPrice: 0 });
  const [totalOrders, setTotalOrders] = useState<ORDERS_OVERVIEW>({ count: 0, totalPrice: 0 });
  useEffect(() => {
    const completeOverview = {
      count: 0,
      totalPrice: 0
    }
    const pendingOverview = {
      count: 0,
      totalPrice: 0
    }
    const totalOverview = {
      count: 0,
      totalPrice: 0
    }
    orders.forEach((order) => {
      if (order.status === ORDER_STATUS.COMPLETE) {
        completeOverview.count++;
        completeOverview.totalPrice += order.price;
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
  }, [orders]);
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-4 grid grid-cols-3 gap-4">
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
        <div className="bg-gray-100 rounded-xl p-4">
          <h2 className="text-sm font-bold">Total</h2>
          <p className="text-lg text-indigo-600">{totalOrders.count}</p>
          <p className="text-sm text-gray-500">&#8377;{totalOrders.totalPrice}</p>
        </div>
      </div>
    </div>

  )
}