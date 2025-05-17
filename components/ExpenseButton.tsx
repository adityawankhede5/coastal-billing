import PlusIcon from "@/assets/icons/Plus.icon";

export default function ExpenseButton({ onClick }: { onClick: () => void }) {
  return (
    <span onClick={onClick} className="fixed bottom-6 right-4 w-12 h-12 bg-blue-600 rounded-full flex justify-center items-center">
      <PlusIcon className="w-7 h-7 text-white" />
    </span>
  );
}