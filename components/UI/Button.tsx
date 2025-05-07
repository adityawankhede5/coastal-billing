export default function Button({ children, className, secondary = false, ...props }: { children: React.ReactNode, className?: string, secondary?: boolean, [key: string]: any }) {
  return (
    <button className={` px-4 py-2 rounded-md ${className} ${secondary ? "bg-transparent border border-indigo-600 text-indigo-600" : "text-white bg-indigo-600"}`} {...props}>
      {children}
    </button>
  )
}