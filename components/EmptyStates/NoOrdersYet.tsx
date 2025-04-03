import PackageOpenIcon from "@/assets/icons/PackageOpen.icon";

export default function NoOrdersYet() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-gray-100 z-20 gap-8">
      <PackageOpenIcon className="w-16 h-16" />
      <div className="flex flex-col items-center justify-center text-center text-xl font-bold">
        <span className="text-gray-500 font-medium">No orders yet</span>
        <span className="max-w-3xs text-gray-500">Create a new order by clicking the button below</span>
      </div>
    </div>
  );
}