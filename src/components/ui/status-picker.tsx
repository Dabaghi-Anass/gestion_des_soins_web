"use client"
import { GalleryVerticalEnd, Timer } from "lucide-react";

type Props = {
  onFilterStatus: (status: string[]) => void;
  filterStatus: string[];
}
export default function StatusPicker({ onFilterStatus, filterStatus }: Props) {
  return <nav className="space-y-1 px-4">
    <div onClick={() => onFilterStatus(["SCHEDULED"])} className={`flex items-center rounded-md px-3 py-2 text-sm font-medium dark:text-gray-50 cursor-pointer ${filterStatus.length === 1 && filterStatus.includes("SCHEDULED") ? "bg-blue-500 hover:bg-blue-400 text-white" : "dark:hover:bg-gray-800 hover:bg-gray-100 text-gray-900"}`}>
      <CalendarIcon className="mr-3 h-5 w-5" />
      Programmé
    </div>
    <div onClick={() => onFilterStatus(["DONE"])}
      className={`flex items-center rounded-md px-3 py-2 text-sm font-medium dark:text-gray-50 cursor-pointer ${filterStatus.length === 1 && filterStatus.includes("DONE") ? "bg-blue-500 hover:bg-blue-400 text-white" : "dark:hover:bg-gray-800 hover:bg-gray-100 text-gray-900"}`}
    >
      <CheckIcon className="mr-3 h-5 w-5" />
      Completé
    </div>
    <div onClick={() => onFilterStatus(["N/A"])}
      className={`flex items-center rounded-md px-3 py-2 text-sm font-medium dark:text-gray-50 cursor-pointer ${filterStatus.length === 1 && filterStatus.includes("N/A") ? "bg-blue-500 hover:bg-blue-400 text-white" : "dark:hover:bg-gray-800 hover:bg-gray-100 text-gray-900"}`}
    >
      <Timer className="mr-3 h-5 w-5" />
      En Attente
    </div>
    <div
      onClick={() => onFilterStatus(["DENIED", "CANCELLED"])}
      className={`flex items-center rounded-md px-3 py-2 text-sm font-medium dark:text-gray-50 cursor-pointer ${filterStatus.length === 2 && filterStatus.includes("DENIED") ? "bg-blue-500 hover:bg-blue-400 text-white" : "dark:hover:bg-gray-800 hover:bg-gray-100 text-gray-900"}`}>
      <XIcon className="mr-3 h-5 w-5" />
      Non Accepté / Annulé
    </div>
    <div
      onClick={() => onFilterStatus(["DENIED", "N/A", "DONE", "SCHEDULED", "CANCELLED"])}
      className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors dark:text-gray-50 cursor-pointer ${filterStatus.length > 2 ? "bg-blue-500 hover:bg-blue-400 text-white" : "dark:hover:bg-gray-800 hover:bg-gray-100 text-gray-900"}`}>
      <GalleryVerticalEnd className="mr-3 h-5 w-5" />
      Tous
    </div>
  </nav>
}


type IconProps = {
  [key: string]: any;

}

function CalendarIcon(props: IconProps) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}


function CheckIcon(props: IconProps) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}


function XIcon(props: IconProps) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}