import { Expense } from "@/zustand/types";
import ExpenseCard from "./ExpenseCard";
import { useEffect, useState } from "react";
import { groupBy } from "lodash";
import Input from "./UI/Input";
import CheckBoxIcon from "@/assets/icons/CheckBox.icon";

export default function ExpensesList({ expenses, dateFilters, onEditExpenseClick, onDeleteExpenseClick, onDateFilterClick }: { expenses: Expense[], dateFilters: string[], onEditExpenseClick: (expense: Expense) => void, onDeleteExpenseClick: (expense: Expense) => void, onDateFilterClick: (date: string) => void }) {
  const [groupedExpenses, setGroupedExpenses] = useState<Record<string, Expense[]>>({});
  useEffect(() => {
    const _groupedExpenses = groupBy(expenses, (expense) => {
      return new Date(expense.dateTime).toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' });
    });
    setGroupedExpenses(_groupedExpenses);
  }, [expenses]);
  return Object.keys(groupedExpenses).map((date) => (
    <div key={date} className="flex flex-col gap-2">
      <div className="flex items-center my-2 gap-2 text-gray-500 font-bold text-lg">
        <div className="underline flex-1 underline-offset-4 decoration-emerald-600 decoration-2">{date}</div>
        <span className={`${dateFilters.includes(date) ? "text-emerald-600 bg-emerald-100" : "text-gray-500 bg-gray-100"}`} onClick={() => onDateFilterClick(date)}><CheckBoxIcon className="w-5 h-5" /></span>
      </div>
      <div className={dateFilters.length > 0 && !dateFilters.includes(date) ? "opacity-50 flex flex-col gap-2" : "opacity-100 flex flex-col gap-2"}>
        {groupedExpenses[date].map((expense) => <ExpenseCard key={expense.id} expense={expense} onEditExpenseClick={onEditExpenseClick} onDeleteExpenseClick={onDeleteExpenseClick} />)}
      </div>
    </div>
  ))
}