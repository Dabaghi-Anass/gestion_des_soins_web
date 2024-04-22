"use client"
import api from "@/api/api";
import { TreatmentRequestPatients } from "@/components/appointment-request-patients";
import TreatmentRequestDetails from "@/components/treatment-request-details";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useEffect, useState } from "react";
export default function TreatmentsRequestsPage() {
  const [requests, setRequests] = useState([])
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const currentUser: any = useAppSelector(state => state.UserReducer.user)
  async function getRequests() {
    const requests = await api.getRequestTreatments(currentUser?.id)
    if (requests) setRequests(requests);
  }
  function handleSearch(text: string) {
    if (!text) getRequests()
    else setRequests(requests.filter((request: any) => request.title.toLowerCase().includes(text.toLowerCase())))
  }
  function handleEditSelectedRequest(request: any) {
    const target: any = requests.find((r: any) => r.id === request.id)
    if (target) {
      target.status = request.status
    }
    setSelectedRequest(request)
  }
  useEffect(() => {
    getRequests()
  }, [currentUser])

  return <main className="appointments-container flex w-full h-full p-4 gap-2">
    <TreatmentRequestPatients
      onSelect={setSelectedRequest}
      onSearch={handleSearch}
      selected={selectedRequest?.id} requests={requests} />
    <TreatmentRequestDetails data={selectedRequest} onEdit={handleEditSelectedRequest} />
  </main>
}