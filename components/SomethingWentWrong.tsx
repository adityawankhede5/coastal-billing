"use client";
export default function SomethingWentWrong({ message }: { message: string }) {
  return (
    <div className="flex flex-col justify-center items-center h-full text-center max-w-96 gap-4 mx-auto">
      <div className="text-heading">Error</div>
      <div className="text-subheading">{message}</div>
    </div>
  );
}
