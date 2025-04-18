export default function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      className="lucide lucide-calendar-icon lucide-calendar"
      {...props}
    >
      <path d="M8 2v4m8-4v4" />
      <rect width={18} height={18} x={3} y={4} rx={2} />
      <path d="M3 10h18" />
    </svg>
  );
}