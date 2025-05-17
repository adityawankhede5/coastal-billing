"use client";
import ExpenseButton from "@/components/ExpenseButton";
import ExpenseModal from "@/components/ExpenseModal";
import Header from "@/components/Header/Header";
import { ExpenseModalType } from "@/app/expenses/types";
import { useState } from "react";

export default function Expenses() {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  return <>
    <Header title="Expenses" titleSmall="Expenses" />
    <ExpenseButton onClick={() => { setIsExpenseModalOpen(true) }} />
    {isExpenseModalOpen && <ExpenseModal type={ExpenseModalType.ADD} onClose={() => { setIsExpenseModalOpen(false) }} />}
  </>
}
