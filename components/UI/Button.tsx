export default function Button({ children, className, secondary = false, type = "button", onClick }: { children: React.ReactNode, className?: string, secondary?: boolean, type?: "button" | "submit" | "reset", onClick?: () => void }) {
  return (
    <button type={type} className={` px-4 py-2 rounded-md ${className} ${secondary ? "bg-transparent border border-indigo-600 text-indigo-600" : "text-white bg-indigo-600"}`} onClick={onClick}>
      {children}
    </button>
  )
}