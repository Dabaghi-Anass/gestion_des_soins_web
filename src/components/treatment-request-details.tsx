"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import WithToolTip from "@/components/ui/with-tooltip";
import { useAppSelector } from "@/hooks/redux-hooks";
import { CalendarDays, Mail, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import MedicalInformation from "./medical-information";
// import { User } from "@/types/types"
import api from "@/api/api";
import { getBadgeStyle } from "@/lib/utils/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import TreatmentHistory from "./treatement-history";
import AsyncButton from "./ui/AsyncButton";
import Loading from "./ui/loading";
type Props = {
  data: any | null;
  onEdit: (request: any) => void;
  onOpenModal: (requestId: number) => void;
}
export default function TreatmentRequestDetails({ data, onEdit, onOpenModal }: Props) {
  let currentUser: any = useAppSelector(state => state.UserReducer.user);
  const [request, setRequest] = useState<any>();
  const { data: treatmentHistory, error, isLoading } = useQuery({
    queryKey: ["treatments-history", request?.sentBy?.id],
    queryFn: async ({ queryKey }) => await api.getTreatmentsByUserId(queryKey[1])
  })
  if (request?.sentBy) currentUser = request.sentBy
  useEffect(() => {
    setRequest(data)
  }, [data])
  async function handleDenyRequest() {
    const treatmentRequest = await api.denyTreatmentRequest(request.id);
    if (treatmentRequest?.status === "DENIED") {
      setRequest({ ...request, status: "DENIED" })
      onEdit(treatmentRequest)
      toast("request denied", {
        action: {
          label: "cancel",
          onClick: handleAcceptRequest
        }
      })
      return
    }
  }
  async function handleAcceptRequest() {
    const treatmentRequest = await api.acceptTreatmentRequest(request.id);
    if (treatmentRequest?.status) {
      setRequest({ ...request, status: treatmentRequest.status })
      onEdit(treatmentRequest)
      toast("request re-accepted", {
        action: {
          label: "cancel",
          onClick: handleDenyRequest
        }
      })
      return
    }
  }
  if (!request)
    return <section className="profile bg-primary-foreground rounded-lg with-border flex flex-col gap-8 w-full p-6 items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-400">no request selected</h1>
    </section>
  if (isLoading) return <Loading />
  return <section className="profile bg-primary-foreground rounded-lg with-border flex flex-col gap-8 w-full p-6 overflow-y-scroll">
    <div className="profile-header flex justify-between gap-4 md:items-center w-full">
      <Avatar className="with-border w-16 h-16">
        <AvatarImage src={currentUser?.profile?.imageUrl} />
        <AvatarFallback className='uppercase font-semibold'>{currentUser?.firstName?.charAt(0)}{currentUser?.lastName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex md:items-center gap-4 flex-col md:flex-row justify-between w-full">
        <div className="flex flex-col">
          <span className="text-md text-xl">
            {currentUser?.profile?.gender?.toLowerCase() === "male" ? "(Mr)" : "(Mlle)"} {currentUser?.firstName} {currentUser?.lastName}</span>
          <span className='text-sm flex gap-2 text-light'>
            <CalendarDays size={20} />
            Joined Since : {new Date(currentUser?.creationDate).toLocaleString("en-GB")}
          </span>
        </div>
        <div className="user-profile-actions flex gap-2">
          {request.responded ?
            <>
              <Button className="p-4 lg:w-[170px]" variant="secondary" onClick={() => onOpenModal(request.id)}>modifier la reponse</Button>
              <Button variant="link" asChild>
                <Link href={`/treatments/treatment/${request.id}`}>voir la reponse</Link>
              </Button>
            </>
            : <>
              {request.status !== "DENIED" &&
                <Button className="p-2 bg-green-500 hover:bg-green-600  lg:w-[150px]" onClick={() => onOpenModal(request.id)}>repondre</Button>
              }
              {request.status !== "DENIED" &&
                <AsyncButton variant="destructive" className="p-2 lg:w-[150px]" onClick={handleDenyRequest}>refuser</AsyncButton>
              }
              {request.status === "DENIED" &&
                <AsyncButton className="p-2 lg:w-[150px] bg-indigo-600" onClick={handleAcceptRequest}>re-accept</AsyncButton>
              }
            </>
          }
          <WithToolTip description="send email to patient">
            <Button variant="outline" className="aspect-square p-2" asChild>
              <Link href={`mailto:${currentUser?.username}`}><Mail color="#888" /></Link>
            </Button>
          </WithToolTip>
          <WithToolTip description="message privatly">
            <Button variant="outline" className=" aspect-square p-2"><Send color="#888" /></Button>
          </WithToolTip>
        </div>
      </div>
    </div>
    <div className="w-full">
      <div className="flex gap-2 mb-4 items-center">
        <h1 className="text-xl font-semibold">{request.title}</h1>
        <span className="status-badge lowercase " style={getBadgeStyle(request.status)}>{request.status}</span>
      </div>
      <p className="max-w-prose">{request.description}</p>
    </div>
    <MedicalInformation className='medical-info' patient={request.sentBy} />
    {treatmentHistory?.length > 0 && <TreatmentHistory data={treatmentHistory} />}

  </section>
}