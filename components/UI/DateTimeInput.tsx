import Input from "./Input";

export default function DateTimeInput({ required = false, defaultValue }: { required?: boolean, defaultValue?: string }) {
  return (
    <div className="flex gap-2">
      <Input label="Date Time" name="dateTime" type="datetime-local" defaultValue={defaultValue} required={required} />
    </div>
  )
}