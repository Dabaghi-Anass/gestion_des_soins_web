"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import WithToolTip from "@/components/ui/with-tooltip";
import { useAppSelector } from "@/hooks/redux-hooks";
import { CalendarDays, Mail, Send } from "lucide-react";
import MedicalInformation from "./medical-information";
// import { User } from "@/types/types"
import Link from "next/link";
import AsyncButton from "./ui/AsyncButton";
type Props = {
  request: any | null;
}
export default function TreatmentRequestDetails({ request }: Props) {
  let currentUser: any = useAppSelector(state => state.UserReducer.user);
  console.log(request)
  if (request?.sentBy) currentUser = request.sentBy
  if (!request)
    return <section className="profile bg-primary-foreground rounded-lg with-border flex flex-col gap-8 w-full p-6 items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-400">no request selected</h1>
    </section>
  return <section className="profile bg-primary-foreground rounded-lg with-border flex flex-col gap-8 w-full p-6">
    <div className="profile-header flex justify-between gap-4 md:items-center w-full">
      <Avatar className="with-border w-16 h-16">
        <AvatarImage src={currentUser?.profile?.imageUrl} />
        <AvatarFallback>AN</AvatarFallback>
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
          <Button className="p-2 w-[150px] bg-green-500 hover:bg-green-600">repondre</Button>
          <AsyncButton variant="destructive" className="p-2 w-[150px]">refuser</AsyncButton>
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
        <span className="status-badge lowercase" style={{
          border: `1px solid ${request.status === "DONE" ? "#34eb86" : "orange"}`,
          color: request.status === "DONE" ? "#34eb86" : "orange"
        }}>{request.status}</span>
      </div>
      <p className="max-w-prose">{request.description}</p>
    </div>
    <MedicalInformation className='medical-info' patient={request.sentBy} />
  </section>
}