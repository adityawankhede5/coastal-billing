export default function Input({ label, name, type = "text", placeholder, prefix, required = false, defaultValue }: { label: string, name: string, type?: string, placeholder?: string, prefix?: React.ReactNode, required?: boolean, defaultValue?: string }) {
  return (
    <div className="flex flex-col">
      <label className="text-md font-medium">{label} {required && <span className="text-red-500">*</span>}</label>
      <div className="box-border flex items-center gap-1">
        {prefix && <div className="box-border rounded-md bg-gray-100 min-w-10 py-1 h-10 flex items-center justify-center">{prefix}</div>}
        <input className="box-border flex-1 px-2 py-1 h-10 rounded-md border-2 border-gray-300 outline-indigo-600" type={type} name={name} placeholder={placeholder} required={required} defaultValue={defaultValue} />
      </div>
    </div>
  )
}