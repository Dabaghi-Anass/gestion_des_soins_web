"use client"
import api from "@/api/api"
import AppointmentRequestCard from "@/components/appointment-request-card"
import AppointmentsHeader from "@/components/appointments-header"
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
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
export default function UserAppointmentRequestsPage() {
  const { id } = useParams();
  const sortMap: {
    [key: string]: (a: any, b: any) => number;
  } = {
    "date-asc": (a: any, b: any) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime(),
    "date-desc": (a: any, b: any) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime(),
    patient: (a: any, b: any) => a.patient.firstName.localeCompare(b.patient.firstName),
    type: (a: any, b: any) => a.type.localeCompare(b.type),
    status: (a: any, b: any) => a.status?.localeCompare(b.status),
  }
  if (typeof window === 'undefined') return;
  const limit = 6;
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  function paginate(array: any[], page_size: number, page_number: number) {
    const startIndex = page_number * page_size
    return _.slice(array, startIndex, startIndex + page_size);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["appointment-requests", id, 0, 0],
    queryFn: async ({ queryKey }) => {
      const data = await api.getAppointmentRequests(+queryKey[1], +queryKey[2], +queryKey[3]);
      if (data) dispatch(updateAppointments(data.appointments));
      return data;
    }
  });
  const appointmentsFromCtx = useAppSelector((state) => state.AppointmentReducer.appointments);
  const typeList = appointmentsFromCtx
    .map((appointment: any) => appointment.type)
    .filter((value: any, index: any, self: any) => self.indexOf(value) === index)
  const [filterType, setFilterType] = useState<string[]>([]);
  const [sortParam, setSortParam] = useState<string>("date-desc")
  let appointments: any[] = appointmentsFromCtx.toSorted(sortMap[sortParam]);
  const useFilter = (
    array: any[],
    filterType: string[],
  ) => {
    return array.filter((appointment: any) => {
      return filterType.includes(appointment.type);
    })
  }
  function clearAllFilters() {
    setFilterType(typeList)
  }
  useEffect(() => {
    clearAllFilters()
  }, [data])
  appointments = paginate(useSearch(useFilter(appointments, filterType), searchQuery), limit, page);
  if (isLoading) return <Loading />
  return (
    <div className="flex h-full w-full">
      <div className="flex-1 overflow-y-auto">
        <AppointmentsHeader
          onListUpdate={setFilterType}
          onSearch={setSearchQuery}
          onSortParam={setSortParam}
          searchQuery={searchQuery}
          sortParam={sortParam}
          statusList={typeList}
          pickedStatusList={filterType}
        />
        <div className="p-4">
          {appointments?.length === 0 ?
            <div className="flex items-center justify-center h-64">
              <p className="text-lg text-gray-500 dark:text-gray-400">No appointments found</p>
            </div> :
            <div className="grid grid-cols-auto gap-4">
              {appointments?.map((appointment: any) => (<AppointmentRequestCard disableEditing key={appointment.id} appointment={appointment} />))}
            </div>
          }
          <div className="flex w-full mx-auto align-center p-8">
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