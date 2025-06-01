import { Expense, ExpensePaidBy } from "@/zustand/types";
import { useEffect, useState } from "react";

export default function ExpensesOverview({ expenses }: { expenses: Expense[] }) {
  const [total, setTotal] = useState({ count: 0, amount: 0 });
  const [paidBy, setPaidBy] = useState<{ name: ExpensePaidBy, count: number, amount: number }[]>([]);
  useEffect(() => {
    let totalAmount = 0;
    const totalCount = expenses.length;
    let paidBy: Record<ExpensePaidBy, { count: number, amount: number }> = {
      [ExpensePaidBy.Tejas]: { count: 0, amount: 0 },
      [ExpensePaidBy.Kuber]: { count: 0, amount: 0 },
      [ExpensePaidBy.Sangram]: { count: 0, amount: 0 },
      [ExpensePaidBy.Aditya]: { count: 0, amount: 0 },
      [ExpensePaidBy.Rohan]: { count: 0, amount: 0 },
      [ExpensePaidBy.Sangharsh]: { count: 0, amount: 0 },
      [ExpensePaidBy.Other]: { count: 0, amount: 0 },
    };
    expenses.forEach((expense) => {
      totalAmount += expense.cost;
      expense.paidBy.forEach((payee) => {
        paidBy[payee.name].count++;
        paidBy[payee.name].amount += payee.amount;
      });
    });
    setTotal({ count: totalCount, amount: totalAmount });
    setPaidBy(Object.entries(paidBy).filter(([_, value]) => value.count > 0).map(([name, value]) => ({ name: name as ExpensePaidBy, count: value.count, amount: value.amount })));
  }, [expenses]);
  return (
    <main className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-1 grid grid-cols-1 gap-2">
        <div className="bg-gray-100 rounded-xl p-2 grid grid-cols-3 gap-1">
          <div className="bg-white rounded-xl p-4 col-span-2">
            <div className="text-left text-sm font-bold">Total Expenses</div>
            <div className="flex items-center gap-1 mt-2">
              <div className="text-sm text-gray-500 border-r border-gray-300 pr-2">{total.count}</div>
              <div className="text-sm font-bold text-indigo-600">&#8377;{total.amount}</div>
            </div>
          </div>
          {paidBy.map((payee) => (
            <div key={payee.name} className="bg-white rounded-xl p-4">
              <div className="text-left text-sm font-bold">{payee.name}</div>
              <div className="flex items-center gap-1 mt-2">
                <div className="text-sm text-gray-500 border-r border-gray-300 pr-2">{payee.count}</div>
                <div className="text-sm font-bold text-indigo-600">&#8377;{payee.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}