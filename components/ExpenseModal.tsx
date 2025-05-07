import CloseIcon from "@/assets/icons/Close.icon";
import { ExpenseModalType } from "@/app/expenses/types";
import Input from "./UI/Input";
import Select from "./UI/Select";
import DateTimeInput from "./UI/DateTimeInput";
import Button from "./UI/Button";
import { FormEvent } from "react";

export default function ExpenseModal({ type = ExpenseModalType.ADD, onClose }: { type: ExpenseModalType, onClose: () => void }) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const expenseData = Object.fromEntries(formData.entries());

    try {
      // Here you would typically send the data to your API
      console.log('Form submitted:', expenseData);

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
            <Input label="Name" name="name" placeholder="Enter expense name" required />
            <Input label="Cost" type="number" name="cost" placeholder="Enter expense cost" prefix="&#8377;" required />
            <Select label="Paid By" name="paidBy" options={["Tejas", "Kuber", "Sangram"]} required />
            <DateTimeInput />
            <Input label="Description" name="description" placeholder="Enter expense description" />
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