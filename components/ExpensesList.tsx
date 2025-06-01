import { Expense } from "@/zustand/types";
import ExpenseCard from "./ExpenseCard";
import { useEffect, useState } from "react";
import { groupBy } from "lodash";

export default function ExpensesList({ expenses, onEditExpenseClick, onDeleteExpenseClick }: { expenses: Expense[], onEditExpenseClick: (expense: Expense) => void, onDeleteExpenseClick: (expense: Expense) => void }) {
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
        <div className="underline underline-offset-4 decoration-emerald-600 decoration-2">{date}</div>
      </div>
      {groupedExpenses[date].map((expense) => <ExpenseCard key={expense.id} expense={expense} onEditExpenseClick={onEditExpenseClick} onDeleteExpenseClick={onDeleteExpenseClick} />)}
    </div>
  ))
}