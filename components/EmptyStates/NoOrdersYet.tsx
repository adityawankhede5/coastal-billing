import HamburgerMenuIcon from "@/assets/icons/HamburgerMenu.icon";
import PackageOpenIcon from "@/assets/icons/PackageOpen.icon";
import { useSideNavStore } from "@/zustand/store";
export default function NoOrdersYet({ message }: { message?: string }) {
  const { setIsOpen } = useSideNavStore();
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-gray-100 z-20 gap-8">
      <HamburgerMenuIcon className="w-8 h-8 fixed top-0 left-0 m-4" onClick={() => setIsOpen(true)} />
      <PackageOpenIcon className="w-16 h-16" />
      <div className="flex flex-col items-center justify-center text-center text-xl font-bold gap-2">
        <span className="text-gray-500 font-medium">{message || "No orders for today yet"}</span>
        <span className="max-w-3xs text-gray-500">Create a new order by clicking the button below</span>
        <span className="text-gray-500 max-w-3xs">Click on the <HamburgerMenuIcon onClick={() => setIsOpen(true)} className="w-8 h-8 text-indigo-500 inline-block border border-indigo-500 rounded-md p-1" /> button in the top left corner to check out all orders</span>
      </div>
    </div>
  );
}