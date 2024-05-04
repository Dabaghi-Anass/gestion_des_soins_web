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
  startDate: number;
  endDate: number;
  onStartPick: (date: string) => void;
  onEndPick: (date: string) => void;
}
export default function DateRangePicker({ startDate, endDate, onStartPick, onEndPick }: DateRangePickerProps) {
  const startDateParam = !isNaN(startDate) ? new Date(startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
  const endDateParam = !isNaN(endDate) ? new Date(endDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="w-full justify-between" size="sm" variant="outline">
        <span>Filtrer par Date Planifié</span>
        <ChevronDownIcon className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-72 space-y-1">
      <DropdownMenuLabel>Sélectionnez un intervalle</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full items-center gap-2 py-2 px-4">
          <Label className="text-sm w-[70px]" htmlFor="start-date">
            Début
          </Label>
          <input id="start-date"
            value={startDateParam}
            onChange={(e) => onStartPick(e.target.value)} className="w-full" type="date" />
        </div>
        <div className="flex w-full items-center gap-2 py-2 px-4">
          <Label className="text-sm w-[70px]" htmlFor="start-date">
            Fin
          </Label>
          <input id="end-date"
            value={endDateParam}
            onChange={(e) => onEndPick(e.target.value)} className="w-full" type="date" />
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