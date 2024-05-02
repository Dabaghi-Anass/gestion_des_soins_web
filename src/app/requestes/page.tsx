"use client"
import api from "@/api/api";
import TreatmentResponseEditor from "@/components/modals/treatment-response-editor";
import TreatmentRequestDetails from "@/components/treatment-request-details";
import { TreatmentRequestPatients } from "@/components/treatment-request-patients";
import Loading from "@/components/ui/loading";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useSearch } from "@/hooks/use-search";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function TreatmentsRequestsPage() {
  const currentUser: any = useAppSelector(state => state.UserReducer.user)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const { data, error, isLoading } = useQuery({
    queryKey: ["treatments-requests", currentUser?.id],
    queryFn: async ({ queryKey }) => await api.getRequestTreatments(queryKey[1])
  })
  let requests = useSearch(data, searchQuery);

  function handleEditSelectedRequest(request: any) {
    const target: any = data?.find((r: any) => r.id === request.id)
    if (target) {
      target.status = request.status
      target.lastModifiedDate = request.lastModifiedDate;
      target.description = request.description;
      target.title = request.title;
      target.responded = request.responded;
    }
    setSelectedRequest(request)
  }
  function openResponseModal(requestId: number) {
    setModalOpen(true)
  }
  function setRequests(data: any) {
    requests = data;
  }
  useEffect(() => {
    if (error)
      toast.error("Failed to fetch treatment requests server responded with this error : " + error.message)
  }, [error])
  if (isLoading) return <Loading />
  return <main className="appointments-container flex w-full h-full p-4 gap-2">
    <TreatmentRequestPatients
      onDeleteRequest={(id) => {
        setRequests(requests.filter((request: any) => request.id !== id))
        setSelectedRequest(null)
      }}
      onReply={(req) => {
        setSelectedRequest(req)
        openResponseModal(req.id)
      }}
      onSelect={setSelectedRequest}
      onSearch={setSearchQuery}
      selected={selectedRequest?.id} requests={requests} />
    <TreatmentResponseEditor
      request={selectedRequest}
      onCloseModal={(state) => setModalOpen(state)}
      onUpdateRequest={handleEditSelectedRequest}
      open={modalOpen} />
    <TreatmentRequestDetails data={selectedRequest} onEdit={handleEditSelectedRequest} onOpenModal={openResponseModal} />
  </main>
}