import logo from "@/assets/images/logo.png";
import Image from "next/image";

export default function AppLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full">
      <div className="relative">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gray-700 animate-spin"></div>
        <Image src={logo} alt="logo" className="relative rounded-full animate-pulse" />
      </div>
      <div className="text-gray-500 text-xl">Coastal</div>
    </div>
  )
}