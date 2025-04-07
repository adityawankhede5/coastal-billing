import * as React from "react";
const HamburgerMenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    className="lucide lucide-menu-icon lucide-menu"
    {...props}
  >
    <path d="M4 12h16M4 6h16M4 18h16" />
  </svg>
);
export default HamburgerMenuIcon;
