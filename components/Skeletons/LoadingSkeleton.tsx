import OrderCardSkeleton from "./OrderCardSkeleton";

const skeletons = Array.from({ length: 5 }, (_, index) => (
  <OrderCardSkeleton key={index} />
));
export default function LoadingSkeleton() {
  return <div className="flex flex-col gap-2">{skeletons}</div>
}