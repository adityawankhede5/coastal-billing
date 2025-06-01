export default function Select({ label, name, options, required = false, defaultValue }: { label: string, name: string, options: string[], required?: boolean, defaultValue?: string }) {
  return (
    <div className="flex flex-col">
      <label className="text-md font-medium">{label} {required && <span className="text-red-500">*</span>}</label>
      <select className="box-border flex-1 px-2 py-1 h-10 rounded-md border-2 border-gray-300 outline-indigo-600" name={name} defaultValue={defaultValue}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}