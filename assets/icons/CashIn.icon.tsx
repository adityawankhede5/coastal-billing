import * as React from "react";
const CashInIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    className="lucide lucide-banknote-arrow-down-icon lucide-banknote-arrow-down"
    {...props}
  >
    <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5m-6 6 3 3 3-3m-4-7h.01m.99 4v6M6 12h.01" />
    <circle cx={12} cy={12} r={2} />
  </svg>
);
export default CashInIcon;
