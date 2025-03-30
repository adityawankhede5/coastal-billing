export default function NotFound({ message }: { message: string }) {
  return <div className="flex flex-col justify-center items-center h-full">
    <div className="text-heading">404</div>
    <div className="text-subheading">{message}</div>
  </div>;
}