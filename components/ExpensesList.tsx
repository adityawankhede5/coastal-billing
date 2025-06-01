import { Expense } from "@/zustand/types";
import ExpenseCard from "./ExpenseCard";

export default function ExpensesList({ expenses, onEditExpenseClick, onDeleteExpenseClick }: { expenses: Expense[], onEditExpenseClick: (expense: Expense) => void, onDeleteExpenseClick: (expense: Expense) => void }) {
  return expenses.map((expense) => <ExpenseCard key={expense.id} expense={expense} onEditExpenseClick={onEditExpenseClick} onDeleteExpenseClick={onDeleteExpenseClick} />)
}