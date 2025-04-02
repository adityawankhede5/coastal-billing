"use client"
export default function OrderCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-pulse">
      <div className="p-4 flex items-center justify-between h-14">
        <div className="flex items-center space-x-2 w-40 h-2 bg-gray-200 rounded-full">
        </div>
        <div className="flex items-center w-20 h-2 bg-gray-200 rounded-full">
        </div>
      </div>
      <div
        className="border-t border-gray-100 h-14 flex items-center"
      >
        <div className="p-4 flex flex-1 items-center justify-between bg-gray-50">
          <div className="flex items-center w-full h-2 bg-gray-200 rounded-full">
          </div>
        </div>
      </div>
    </div>
  );
}