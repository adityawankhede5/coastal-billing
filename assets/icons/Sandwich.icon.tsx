import { SVGProps } from "react";

const SandwichIcon = (props: SVGProps<SVGSVGElement>) => (
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
    className="lucide lucide-sandwich-icon lucide-sandwich"
    {...props}
  >
    <path d="m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9" />
    <path d="m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" />
    <rect width={20} height={4} x={2} y={11} rx={1} />
  </svg>
);
export default SandwichIcon;
