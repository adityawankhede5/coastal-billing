import OrderCardSkeleton from "./OrderCardSkeleton";

const skeletons = Array.from({ length: 5 }, (_, index) => (
  <OrderCardSkeleton key={index} />
));
export default function LoadingSkeleton() {
  return (
    <>
      <>
        <div className="h-24"></div>
        <div className="sticky top-0 h-12 -mx-4 flex items-center justify-center text-2xl font-bold bg-gray-100 transition-[left,transform] duration-300 z-10">
          <div style={{
            left: '50%',
            transform: 'translateX(-50%)'
          }} className="absolute h-full flex items-center px-4">
            <div className="w-40 h-12 bg-gray-200 rounded-lg"></div>
          </div>

        </div>
        <div className="h-24"></div>
      </>
      <div className="flex flex-col gap-2">{skeletons}</div>
    </>
  )
}