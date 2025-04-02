import LoadingSkeleton from "@/components/Skeletons/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center my-2 gap-2 text-gray-500 h-4 font-bold text-lg w-16 bg-gray-200 rounded-full"></div>
      <LoadingSkeleton />
    </div>
  )
}