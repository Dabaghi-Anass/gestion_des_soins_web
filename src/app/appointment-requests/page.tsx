"use client"
import api from "@/api/api"
import AppointmentRequestCard from "@/components/appointment-request-card"
import AppointmentsHeader from "@/components/appointments-header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import Loading from "@/components/ui/loading"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks"
import { useSearch } from "@/hooks/use-search"
import { updateAppointments } from "@/lib/features/appointment-reducer"
import { useQuery } from "@tanstack/react-query"
import _ from "lodash"
import Link from "next/link"
import { useState } from "react"
export default function AppointmentRequestsPage() {
  const sortMap: {
    [key: string]: (a: any, b: any) => number;
  } = {
    "date-asc": (a: any, b: any) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime(),
    "date-desc": (a: any, b: any) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime(),
    patient: (a: any, b: any) => a.patient.firstName.localeCompare(b.patient.firstName),
    type: (a: any, b: any) => a.type.localeCompare(b.type),
    status: (a: any, b: any) => a.status?.localeCompare(b.status),
  }
  const currentUser: any = useAppSelector((state) => state.UserReducer.user);
  const dispatch = useAppDispatch();
  const limit = 6;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  function paginate(array: any[], page_size: number, page_number: number) {
    const startIndex = page_number * page_size
    return _.slice(array, startIndex, startIndex + page_size);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["appointment-requests", currentUser?.id, 0, 0],
    queryFn: async ({ queryKey }) => {
      const data = await api.getAppointmentRequests(queryKey[1], queryKey[2], queryKey[3]);
      if (data) dispatch(updateAppointments(data.appointments));
      return data;
    }
  });
  const appointmentsFromCtx = useAppSelector((state) => state.AppointmentReducer.appointments);
  // _.orderBy(appointments, ["date"], ["desc"]);
  const [sortParam, setSortParam] = useState<string>("date-desc")
  let appointments: any[] = appointmentsFromCtx.toSorted(sortMap[sortParam]);
  appointments = paginate(useSearch(appointments, searchQuery), limit, page);
  const statusList = appointmentsFromCtx.
    filter((a: any) => a.type !== null)
    .map((appointment: any) => appointment.type)
    .filter((value: any, index: any, self: any) => self.indexOf(value) === index)
  const userIdList = appointmentsFromCtx
    .map((appointment: any) => appointment.patient.id)
    .filter((value: any, index: any, self: any) => self.indexOf(value) === index)
  const [filterStatusList, setFilterStatusList] = useState<string[]>(statusList)
  const [filterUserList, setFilterUserList] = useState<number[]>(userIdList)

  if (isLoading) return <Loading />
  return (
    <div className="flex h-full w-full">
      <div className="hidden w-64 border-r h-full bg-gray-50 dark:border-gray-800 dark:bg-gray-900 lg:block">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Rendez Vous</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gérez et suivez toutes vos demandes de rendez-vous
          </p>
        </div>
        <nav className="space-y-1 px-4">
          <Link
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"
            href="#"
          >
            <CalendarIcon className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
            Programmé
          </Link>
          <Link
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"
            href="#"
          >
            <CheckIcon className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
            Completé
          </Link>
          <Link
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"
            href="#">
            <XIcon className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
            Non Accepté / Annulé
          </Link>
        </nav>
        <div className="border-t px-4 py-6 dark:border-gray-800">
          <h4 className="text-sm font-semibold">Filtres</h4>
          <div className="mt-4 space-y-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full justify-between" size="sm" variant="outline">
                  <span>Filtrer Par Status</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 space-y-1">
                <DropdownMenuCheckboxItem>
                  <div className="flex items-center justify-between">
                    <span>Programmé</span>
                    <Checkbox defaultChecked id="filter-scheduled" />
                  </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  <div className="flex items-center justify-between">
                    <span>Completé</span>
                    <Checkbox defaultChecked id="filter-completed" />
                  </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  <div className="flex items-center justify-between">
                    <span>Annulé</span>
                    <Checkbox defaultChecked id="filter-cancelled" />
                  </div>
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full justify-between" size="sm" variant="outline">
                  <span>Filter by Date</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 space-y-1">
                <DropdownMenuLabel>Select a date range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex w-full items-center gap-2 py-2 px-4">
                    <Label className="text-sm w-[70px]" htmlFor="start-date">
                      Start
                    </Label>
                    <input id="start-date" className="w-full" type="date" />
                  </div>
                  <div className="flex w-full items-center gap-2 py-2 px-4">
                    <Label className="text-sm w-[70px]" htmlFor="end-date">
                      End
                    </Label>
                    <input id="end-date" type="date" />
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Apply</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full justify-between" size="sm" variant="outline">
                  <span>Filter by User</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 space-y-1">
                <DropdownMenuCheckboxItem>
                  <div className="flex items-center justify-between">
                    <span>John Doe</span>
                    <Checkbox defaultChecked id="filter-user-john" />
                  </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  <div className="flex items-center justify-between">
                    <span>Jane Doe</span>
                    <Checkbox defaultChecked id="filter-user-jane" />
                  </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  <div className="flex items-center justify-between">
                    <span>Bob Johnson</span>
                    <Checkbox defaultChecked id="filter-user-bob" />
                  </div>
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="border-t px-4 py-6 dark:border-gray-800">
          <h4 className="text-sm font-semibold">Quick Actions</h4>
          <div className="mt-4 space-y-2">
            <Button className="w-full" size="sm" variant="outline">
              <CalendarCheckIcon className="mr-2 h-4 w-4" />
              View Calendar
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <AppointmentsHeader
          onListUpdate={setFilterStatusList}
          onSearch={setSearchQuery}
          onSortParam={setSortParam}
          searchQuery={searchQuery}
          sortParam={sortParam}
          statusList={statusList}
        />
        <div className="p-4">
          {appointments?.length === 0 ?
            <div className="flex items-center justify-center h-64">
              <p className="text-lg text-gray-500 dark:text-gray-400">No appointments found</p>
            </div> :
            <div className="grid grid-cols-auto gap-4">
              {appointments?.map((appointment: any) => (<AppointmentRequestCard key={appointment.id} appointment={appointment} />))}
            </div>
          }
          <div className="flex w-full mx-auto align-center p-4">
            <Pagination className="cursor-pointer">
              <PaginationContent>
                {page > 0 &&
                  <PaginationItem onClick={() => setPage((prev: number) => prev - 1)}>
                    <PaginationPrevious />
                  </PaginationItem>}
                <PaginationItem>
                  <PaginationLink>{page + 1}</PaginationLink>
                </PaginationItem>
                {appointments.length === limit &&
                  <PaginationItem onClick={() => setPage((prev: number) => prev + 1)}>
                    <PaginationNext />
                  </PaginationItem>
                }
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}
type IconProps = {
  [key: string]: any;
}

function CalendarCheckIcon(props: IconProps) {
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
      <path d="m9 16 2 2 4-4" />
    </svg>
  )
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


function PlusIcon(props: IconProps) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function UserIcon(props: IconProps) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
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