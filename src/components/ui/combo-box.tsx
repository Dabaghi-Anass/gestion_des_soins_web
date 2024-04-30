"use client"
import { Input } from "@/components/ui/input"
type ComboBoxProps = {
  data: string[]
  onChange: (value: string) => void
  placeholder: string
  value: string
}
export function ComboBox({ value, data = [], onChange, placeholder }: ComboBoxProps) {
  const listTagKey = "data-elements";
  return <>
    <Input
      value={value}
      placeholder={placeholder}
      list={listTagKey}
      onInput={(e: any) => onChange(e.target.value)} />
    <datalist id={listTagKey}>
      {data.map((item) => (
        <option key={item} value={item} onClick={() => onChange(item)}>
          {item}
        </option>
      ))}
    </datalist>
  </>
}
