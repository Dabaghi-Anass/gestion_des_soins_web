"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"

type DateRangePickerProps = {
  onStartPick: (date: string) => void;
  onEndPick: (date: string) => void;
}
export default function DateRangePicker({ onStartPick, onEndPick }: DateRangePickerProps) {
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="w-full justify-between" size="sm" variant="outline">
        <span>Filter by Date</span>
        <ChevronDownIcon className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-72 space-y-1">
      <DropdownMenuLabel>Select a date range</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full items-center gap-2 py-2 px-4">
          <Label className="text-sm w-[70px]" htmlFor="start-date">
            Start
          </Label>
          <input id="start-date" onChange={(e) => onStartPick(e.target.value)} className="w-full" type="date" />
        </div>
        <div className="flex w-full items-center gap-2 py-2 px-4">
          <Label className="text-sm w-[70px]" htmlFor="start-date">
            End
          </Label>
          <input id="start-date" onChange={(e) => onEndPick(e.target.value)} className="w-full" type="date" />
        </div>

      </div>
    </DropdownMenuContent>
  </DropdownMenu>
}

type IconProps = {
  [key: string]: any;

}

function ChevronDownIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}