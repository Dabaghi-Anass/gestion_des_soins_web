"use client"
import api from "@/api/api"
import TreatmentHistory from "@/components/treatement-history"
import DataNotFound from "@/components/ui/data-not-found"
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
import { useEffect, useState } from "react"
export default function TreatmentsPage() {
  const currentUser: any = useAppSelector(state => state.UserReducer.user)
  const [loading, setLoading] = useState<boolean>(false)
  const [treatments, setTreatments] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const pageSize = 6;
  async function getTreatments() {
    if (currentUser) {
      setLoading(true)
      const data = await api.getAllTreatmentsByUserId(currentUser.id)
      if (data) setTreatments(data)
      setLoading(false)
    }
  }
  useEffect(() => {
    getTreatments()
  }, [])
  return <section className="p-4 w-full h-full bg-primary-foreground">
    {loading && <Loading />}
    {treatments?.length === 0 ?
      <DataNotFound /> :
      <div>
        <TreatmentHistory data={paginate(treatments, pageSize, currentPage + 1)} hideLink />
        <div className="flex gap-4 p-4 justify-center">
          <Pagination className="cursor-pointer">
            <PaginationContent>
              {currentPage > 0 &&
                <PaginationItem onClick={() => setCurrentPage((prev: number) => prev - 1)}>
                  <PaginationPrevious />
                </PaginationItem>}
              {generateNumberArray(currentPage, 3, Math.ceil(treatments.length / pageSize)).map((page: number) => (
                <PaginationItem onClick={() => setCurrentPage(page)}>
                  <PaginationLink isActive={page === currentPage}>{page + 1}</PaginationLink>
                </PaginationItem>
              ))}
              {currentPage < Math.floor(treatments.length / pageSize) &&
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
