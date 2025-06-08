import CloseIcon from "@/assets/icons/Close.icon";
import { ExpenseModalType } from "@/app/expenses/types";
import Input from "./UI/Input";
import Select from "./UI/Select";
import DateTimeInput from "./UI/DateTimeInput";
import Button from "./UI/Button";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Expense, ExpensePaidBy, PAYMENT_METHOD } from "@/zustand/types";
import { createExpense, updateExpense } from "@/lib/expenses.api";
import { toast } from "./toast";
import { getLocalDateTimeString } from "@/app/expenses/helper";
import PaymentMethodInput from "./UI/PaymentMethodInput";

const paidByOptions = Object.values(ExpensePaidBy);

export default function ExpenseModal({ type = ExpenseModalType.ADD, onClose, onExpenseAdded, onExpenseUpdated, expense }: { type: ExpenseModalType, onClose: () => void, onExpenseAdded: (expense: Expense) => void, onExpenseUpdated: (expense: Expense) => void, expense?: Expense }) {
  const [costInput, setCostInput] = useState(expense?.cost || 0);
  const [payment, setPayment] = useState<{ method: PAYMENT_METHOD, splitAmount: { cash: number, online: number } }>({
    method: type === ExpenseModalType.EDIT ? expense?.payment?.method || PAYMENT_METHOD.CASH : PAYMENT_METHOD.CASH,
    splitAmount: type === ExpenseModalType.EDIT ? expense?.payment?.splitAmount || { cash: 0, online: 0 } : { cash: 0, online: 0 },
  });
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
      const expenseObject = {
        name: expenseData.name as string,
        cost: Number(expenseData.cost),
        paidBy: [{ name: expenseData.paidBy as ExpensePaidBy, amount: Number(expenseData.cost) }],
        payment: {
          method: payment.method,
          splitAmount: payment.splitAmount,
        },
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

  const handleCostChange = (e: ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const expenseData = Object.fromEntries(formData.entries());
    const _cost = Number(expenseData.cost);
    if (costInput !== _cost) {
      setCostInput(_cost);
      setPayment((prev) => {
        if (prev.method === PAYMENT_METHOD.SPLIT || prev.method === PAYMENT_METHOD.CASH) {
          return { method: PAYMENT_METHOD.CASH, splitAmount: { cash: _cost, online: 0 } };
        } else {
          return { method: PAYMENT_METHOD.ONLINE, splitAmount: { cash: 0, online: _cost } };
        }
      });
    }

  }

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
          <form onSubmit={handleSubmit} onChange={handleCostChange} className="flex flex-col gap-3">
            <Input label="Name" name="name" placeholder="Enter expense name" required defaultValue={formDefaults.current.name} />
            <Input label="Cost" type="number" name="cost" placeholder="Enter expense cost" prefix="&#8377;" required defaultValue={formDefaults.current.cost} />
            <Select label="Paid By" name="paidBy" options={paidByOptions} required defaultValue={formDefaults.current.paidBy?.[0]?.name} />
            <PaymentMethodInput label="Payment Method" method={payment.method} splitAmount={{ cash: payment.splitAmount.cash.toString(), online: payment.splitAmount.online.toString() }} required amount={costInput} onSubmit={(method, splitAmount) => {
              setPayment({ method, splitAmount: { cash: Number(splitAmount.cash), online: Number(splitAmount.online) } });
            }} />
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