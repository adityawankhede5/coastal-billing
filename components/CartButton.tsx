import CartIcon from "@/assets/icons/CartIcon";

export default function CartButton({ onClick }: { onClick: () => void }) {
  return (
    <span onClick={onClick} className="fixed bottom-6 right-4 w-12 h-12 bg-blue-600 rounded-full flex justify-center items-center">
      <CartIcon className="w-7 h-7 text-white" />
    </span>
  );
}