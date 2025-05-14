import CartIcon from "@/assets/icons/CartIcon";

export default function CartButton({ onClick }: { onClick: () => void }) {
  return (
    <span onClick={onClick} className="fixed bottom-6 right-4 w-15 h-15 bg-blue-600 rounded-full flex justify-center items-center">
      <CartIcon className="w-8 h-8 text-white" />
    </span>
  );
}