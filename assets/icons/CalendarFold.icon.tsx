import * as React from "react";
const CalendarFoldIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    className="lucide lucide-calendar-fold-icon lucide-calendar-fold"
    {...props}
  >
    <path d="M8 2v4m8-4v4m5 11V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11ZM3 10h18" />
    <path d="M15 22v-4a2 2 0 0 1 2-2h4" />
  </svg>
);
export default CalendarFoldIcon;
