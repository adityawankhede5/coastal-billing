import { SVGProps } from "react";

export default function PlusIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-plus-icon lucide-plus"
      {...props}
    >
      <path d="M5 12h14m-7-7v14" />
    </svg>
  );
}