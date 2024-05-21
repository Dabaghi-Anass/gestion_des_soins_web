"use client"
import api from "@/api/api"
import DataNotFound from "@/components/ui/data-not-found"
import DocumentTable from "@/components/ui/document-table"
import Loading from "@/components/ui/loading"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"
import { useAppSelector } from "@/hooks/redux-hooks"
import { generateNumberArray, paginate } from "@/lib/utils/utils"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
export default function DocumentsPage() {
  const pageSize = 6;
  const { id } = useParams()
  const currentUser: any = useAppSelector(state => state.UserReducer.user);
  const { data, isLoading }: any = useQuery({
    queryKey: ["get-user", id],
    queryFn: async ({ queryKey }) => await api.getAllUserDocuments(+queryKey[1]),
  })
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [documents, setDocuments] = useState<any[]>()
  useEffect(() => {
    setDocuments(data)
  }, [data])
  if (!data || isLoading) return <Loading />
  return <section className="p-4 w-full h-full bg-primary-foreground">
    {documents === null ? <DataNotFound /> :
      <div className="flex flex-col justify-between h-full">
        <DocumentTable
          ownerId={id as string}
          onUpdate={(data: any[]) => setDocuments(data)}
          isCurrentUser={+currentUser?.id === +id}
          data={paginate(documents || [], pageSize, currentPage + 1)} />
        <div className="flex gap-4 p-4 justify-center">
          <Pagination className="cursor-pointer">
            <PaginationContent>
              {currentPage > 0 &&
                <PaginationItem onClick={() => setCurrentPage((prev: number) => prev - 1)}>
                  <PaginationPrevious />
                </PaginationItem>}
              {generateNumberArray(currentPage, 3, Math.ceil(data.length / pageSize)).map((page: number) => (
                <PaginationItem onClick={() => setCurrentPage(page)}>
                  <PaginationLink isActive={page === currentPage}>{page + 1}</PaginationLink>
                </PaginationItem>
              ))}
              {currentPage < Math.floor(data.length / pageSize) &&
                <PaginationItem onClick={() => setCurrentPage((prev: number) => prev + 1)}>
                  <PaginationNext />
                </PaginationItem>
              }
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    }
  </section>
}
