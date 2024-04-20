"use client"
import api from "@/api/api"
import Loading from "@/components/ui/loading"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
export default function UserTreatmentsPage() {
  const { id: userId } = useParams()
  const [loading, setLoading] = useState<boolean>(false)
  const [treatments, setTreatments] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  async function getTreatments() {
    setLoading(true)
    const data = await api.getTreatmentsByUserId(+userId)
    if (data) setTreatments(data)
    setLoading(false)
  }
  async function getUser() {
    setLoading(true)
    const data = await api.getUserById(+userId)
    if (data) setUser(data)
    setLoading(false)
  }
  useEffect(() => {
    getTreatments()
    getUser()
  }, [])
  return <section className="p-4 w-full h-full">
    {loading && <Loading />}
    {treatments.length === 0 ? <div className="w-full h-full flex items-center justify-center text-2xl">no treatments found</div> :
      <ul>
        {treatments.map(treatment => <li key={treatment.id}>{treatment.title}</li>)}
      </ul>
    }
  </section>
}