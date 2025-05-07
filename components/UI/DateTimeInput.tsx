import Input from "./Input";

export default function DateTimeInput() {
  return (
    <div className="flex gap-2">
      <Input label="Date" name="date" type="date" />
      <Input label="Time" name="time" type="time" />
    </div>
  )
}