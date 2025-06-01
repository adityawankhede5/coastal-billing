"use client";
import ExpenseButton from "@/components/ExpenseButton";
import ExpenseModal from "@/components/ExpenseModal";
import Header from "@/components/Header/Header";
import { ExpenseModalType } from "@/app/expenses/types";
import { useEffect, useState } from "react";
import { Expense } from "@/zustand/types";
import { fetchAllExpenses, updateExpense } from "@/lib/expenses.api";
import LoadingSkeleton from "@/components/Skeletons/LoadingSkeleton";
import ExpensesOverview from "@/components/ExpensesOverview";
import ExpensesList from "@/components/ExpensesList";
import { toast } from "@/components/toast";

export default function Expenses() {
  const [expenseModal, setExpenseModal] = useState<{ type: ExpenseModalType, isOpen: boolean, expense?: Expense }>({
    type: ExpenseModalType.ADD,
    isOpen: false,
    expense: undefined,
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateFilters, setDateFilters] = useState<string[]>([]);
  useEffect(() => {
    fetchAllExpenses().then((expenses) => {
      setExpenses(expenses);
    }).finally(() => {
      setIsLoading(false);
    })
  }, []);
  const onExpenseAdded = (expense: Expense) => {
    setExpenses([expense, ...expenses]);
  }
  const onEditExpenseClick = (expense: Expense) => {
    setExpenseModal({ type: ExpenseModalType.EDIT, isOpen: true, expense });
  }
  const onExpenseUpdated = (expense: Expense) => {
    setExpenses(expenses.map((e) => e.id === expense.id ? expense : e));
  }
  const onDeleteExpenseClick = async (expense: Expense) => {
    const response = await updateExpense({ ...expense, deleted: true });
    if (response.status === "success") {
      onExpenseUpdated({ ...expense, deleted: true });
      setExpenses(expenses.filter((e) => e.id !== expense.id));
      toast("Expense deleted successfully");
    } else {
      toast("Failed to delete expense");
    }
  }
  const onDateFilterClick = (date: string) => {
    setDateFilters(dateFilters.includes(date) ? dateFilters.filter((d) => d !== date) : [...dateFilters, date]);
  }

  if (isLoading) return <LoadingSkeleton />
  return <>
    <Header title="Expenses" titleSmall="Expenses" />
    <div className="grid grid-cols-1 gap-4">
      <ExpensesOverview expenses={expenses} dateFilters={dateFilters} />
      <ExpensesList expenses={expenses} dateFilters={dateFilters} onEditExpenseClick={onEditExpenseClick} onDeleteExpenseClick={onDeleteExpenseClick} onDateFilterClick={onDateFilterClick} />
    </div>
    <ExpenseButton onClick={() => { setExpenseModal({ type: ExpenseModalType.ADD, isOpen: true, expense: undefined }) }} />
    {expenseModal.isOpen && <ExpenseModal type={expenseModal.type} onClose={() => { setExpenseModal({ ...expenseModal, isOpen: false }) }} onExpenseAdded={onExpenseAdded} onExpenseUpdated={onExpenseUpdated} expense={expenseModal.expense} />}
  </>
}
