import CloseIcon from "@/assets/icons/Close.icon";
import { ExpenseModalType } from "@/app/expenses/types";
import Input from "./UI/Input";
import Select from "./UI/Select";
import DateTimeInput from "./UI/DateTimeInput";
import Button from "./UI/Button";
import { FormEvent, useRef } from "react";
import { Expense, ExpensePaidBy } from "@/zustand/types";
import { createExpense, updateExpense } from "@/lib/expenses.api";
import { toast } from "./toast";
import { getLocalDateTimeString } from "@/app/expenses/helper";

const paidByOptions = Object.values(ExpensePaidBy);

export default function ExpenseModal({ type = ExpenseModalType.ADD, onClose, onExpenseAdded, onExpenseUpdated, expense }: { type: ExpenseModalType, onClose: () => void, onExpenseAdded: (expense: Expense) => void, onExpenseUpdated: (expense: Expense) => void, expense?: Expense }) {
  const formDefaults = useRef({
    name: type === ExpenseModalType.EDIT ? expense?.name : "",
    cost: type === ExpenseModalType.EDIT ? expense?.cost.toString() : "",
    paidBy: type === ExpenseModalType.EDIT ? expense?.paidBy : [{ name: ExpensePaidBy.Tejas, amount: 0 }],
    dateTime: type === ExpenseModalType.EDIT ? getLocalDateTimeString(expense?.dateTime) : getLocalDateTimeString(),
    description: type === ExpenseModalType.EDIT ? expense?.description : "",
  });

  const handleCreateExpense = async (expenseObject: Omit<Expense, "id">) => {
    const response = await createExpense(expenseObject);
    if (response.status === "success" && response.expense) {
      onExpenseAdded(response.expense);
      toast("Expense created successfully");
    } else {
      toast("Failed to create expense");
      console.error('Error creating expense:', response.error);
    }
  }

  const handleUpdateExpense = async (expenseObject: Omit<Expense, "createdAt">) => {
    const response = await updateExpense(expenseObject);
    if (response.status === "success" && response.expense) {
      if (expense?.createdAt) {
        onExpenseUpdated({ ...expenseObject, createdAt: expense.createdAt });
      } else {
        onExpenseAdded({ ...expenseObject, createdAt: Date.now() });
      }
      toast("Expense updated successfully");
    } else {
      toast("Failed to update expense");
      console.error('Error updating expense:', response.error);
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const expenseData = Object.fromEntries(formData.entries());

    try {
      // Here you would typically send the data to your API
      const expenseObject = {
        name: expenseData.name as string,
        cost: Number(expenseData.cost),
        paidBy: [{ name: expenseData.paidBy as ExpensePaidBy, amount: Number(expenseData.cost) }],
        dateTime: new Date(expenseData.dateTime as string).getTime(),
        description: expenseData.description as string,
        deleted: false,
        createdAt: Date.now(),
      }
      if (type === ExpenseModalType.ADD) {
        await handleCreateExpense(expenseObject);
      } else if (type === ExpenseModalType.EDIT && expense?.id) {
        await handleUpdateExpense({ id: expense.id, ...expenseObject });
      }

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="box-border fixed top-0 left-0 w-screen h-screen bg-black/75 z-50" onClick={onClose}>
      <div className="absolute bottom-0 w-full bg-white rounded-t-2xl p-4" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center gap-2 border-b-0 border-gray-200 pb-2">
          <div className="flex-1 flex">
            <h1 className="text-2xl font-bold capitalize">{type} Expense</h1>
          </div>
          <CloseIcon className="w-6 h-6" onClick={onClose} />
        </header>

        <main className="mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input label="Name" name="name" placeholder="Enter expense name" required defaultValue={formDefaults.current.name} />
            <Input label="Cost" type="number" name="cost" placeholder="Enter expense cost" prefix="&#8377;" required defaultValue={formDefaults.current.cost} />
            <Select label="Paid By" name="paidBy" options={paidByOptions} required defaultValue={formDefaults.current.paidBy?.[0]?.name} />
            <DateTimeInput required defaultValue={formDefaults.current.dateTime} />
            <Input label="Description" name="description" placeholder="Enter expense description" defaultValue={formDefaults.current.description} />
            <div className="flex justify-end gap-2">
              <Button className="capitalize" secondary type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button className="capitalize" type="submit">
                {type} Expense
              </Button>
            </div>
          </form>
        </main>

      </div>
    </div>
  )
}