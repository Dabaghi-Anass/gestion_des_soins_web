"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
type Props = {
  sortParam: string;
  searchQuery: string;
  statusList: string[];
  pickedStatusList: string[];
  onSearch: (query: string) => void;
  onListUpdate: (statusList: string[]) => void;
  onSortParam: (param: string) => void;
}
export default function ActivityHeader({ searchQuery, sortParam, pickedStatusList, statusList, onSearch, onListUpdate, onSortParam }: Props) {
  return <header className="border-b bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
      <h1 className="text-xl font-semibold">Requetes D'Activité</h1>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <FilterIcon className="mr-2 h-4 w-4" />
              Filtrer
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 space-y-1">
            <DropdownMenuLabel>Type D'Activité</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statusList?.map((statusName) => (
              <DropdownMenuCheckboxItem onClick={(e) => e.preventDefault()} key={`filter-${statusName}`}>
                <div className="flex items-center justify-between gap-4 lowercase">
                  <span>{statusName}</span>
                  <Checkbox
                    checked={pickedStatusList.includes(statusName)}
                    onCheckedChange={(checked) => {
                      let data = [...pickedStatusList];
                      if (checked) data = [...data, statusName]
                      else data = data.filter(statusItem => statusItem !== statusName)
                      onListUpdate(data)
                    }}
                    id={`filter-${statusName}`}
                  />
                </div>
              </DropdownMenuCheckboxItem>)
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <ListOrderedIcon className="mr-2 h-4 w-4" />
              Trier
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 space-y-1">
            <DropdownMenuLabel>Trier par</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sortParam?.toLowerCase()}>
              <DropdownMenuRadioItem value="date-asc" onClick={() => onSortParam("date-asc")}>Date | Plus Ancienne</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="date-desc" onClick={() => onSortParam("date-desc")}>Date | Plus Recent</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="patient" onClick={() => onSortParam("patient")}>Patient</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="type" onClick={() => onSortParam("type")}>Type</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="status" onClick={() => onSortParam("status")}>Status</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          value={searchQuery}
          onChange={(e: any) => onSearch(e.target.value)}
          className="max-w-xs"
          placeholder="Rechercher Activité..."
          type="search"
        />
      </div>
    </div>
  </header>
};
type IconProps = {
  [key: string]: any;
}

function FilterIcon(props: IconProps) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}



function ListOrderedIcon(props: IconProps) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}