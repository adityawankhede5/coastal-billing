import { Expense } from "@/zustand/types";
import HydrationSafeDate from "./HydrationSafeDate";
import CalendarIcon from "@/assets/icons/Calendar.icon";
import UserIcon from "@/assets/icons/User.icon";
import { useState } from "react";
import DeleteIcon from "@/assets/icons/Delete.icon";
import PencilIcon from "@/assets/icons/Pencil.icon";

export default function ExpenseCard({ expense, onEditExpenseClick, onDeleteExpenseClick }: { expense: Expense, onEditExpenseClick: (expense: Expense) => void, onDeleteExpenseClick: (expense: Expense) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <main className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <section className="flex justify-between px-3 py-3 text-lg" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="font-bold">
          <div className="flex-1">{expense.name}</div>
          <div className="flex items-center gap-1 text-sm text-gray-500"><CalendarIcon className="min-w-4 min-h-4 max-w-4 max-h-4 text-indigo-600" /> <HydrationSafeDate milliseconds={expense.dateTime} timeOnly /></div>
        </div>
        <div>
          <div className="flex-1 text-right text-indigo-600">₹{expense.cost}</div>
          <div className="flex items-center gap-1 text-sm text-gray-500 font-semibold"><UserIcon className="min-w-4 min-h-4 max-w-4 max-h-4 text-indigo-600" />{expense.paidBy[0].name}</div>
        </div>
      </section>
      {
        isExpanded && (
          <section className="px-3 py-3 border-t border-gray-200 bg-gray-50 flex justify-between">
            <div className="flex-1 text-sm text-gray-500">{expense.description}</div>
            <div className="flex justify-end gap-2">
              <span className="p-2 rounded-md border border-indigo-600 h-fit" onClick={() => onEditExpenseClick(expense)}>
                <PencilIcon className="w-4 h-4 text-indigo-600" />
              </span>
              <span className="p-2 rounded-md border border-red-500 h-fit" onClick={() => onDeleteExpenseClick(expense)}>
                <DeleteIcon className="w-4 h-4 text-red-500" />
              </span>
            </div>
          </section>
        )
      }
    </main>
  )

}