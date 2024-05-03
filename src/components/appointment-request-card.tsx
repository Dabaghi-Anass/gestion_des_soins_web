"use client"
import api from "@/api/api"
import ConfirmActionModal from "@/components/modals/confirm-action-modal"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch } from "@/hooks/redux-hooks"
import { updateAppointment } from "@/lib/features/appointment-reducer"
import { getBadgeStyle, getTypeHue } from "@/lib/utils/utils"
import { Check, CreditCard, SendHorizontal, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import AppointmentModal from "./modals/appointment-request-modal"
import { Button } from "./ui/button"
import UserBadge from "./ui/user-badge"
import WithToolTip from "./ui/with-tooltip"
type AppointmentRequestCardProps = {
  appointment: any;
}
export default function AppointmentRequestCard({ appointment }: AppointmentRequestCardProps) {
  const [modalMessage, setModalMessage] = useState<string>("")
  const [modalTitle, setModalTitle] = useState<string>("")
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalConfirmAction, setModalConfirmAction] = useState<() => void>(() => { })
  const dispatch = useAppDispatch();
  async function handleAcceptAppointment() {
    const savedAppointment = await api.acceptAppointmentRequest(appointment.id);
    dispatch(updateAppointment(savedAppointment));
    setModalOpen(false);
    toast("Appointment Accepted");
  }
  async function handleRejectAppointment() {
    const savedAppointment = await api.rejectAppointmentRequest(appointment.id);
    dispatch(updateAppointment(savedAppointment));
    setModalOpen(false);
    toast("Appointment Rejected");
  }
  return <Card className="bg-primary-foreground hover:shadow-lg transition-all w-full flex flex-col">
    <ConfirmActionModal
      title={modalTitle}
      message={modalMessage}
      open={modalOpen}
      onConfirm={modalConfirmAction}
      onCancel={() => setModalOpen(false)}
    />
    <CardHeader className="flex flex-row justify-between p-4">
      <div className="flex gap-1 items-center">
        <div className="flex gap-2 font-bold text-gray-700 items-center">
          <div className="rounded-full p-2 border aspect-square">
            <CreditCard size={16} />
          </div>
          <CardTitle>#{appointment.id}</CardTitle>
        </div>
        <span className="text-xs text-light">
          <span className="mx-2">crée le</span>
          {new Date(appointment.creationDate).toLocaleString("fr-FR", {
            dateStyle: "long",
            timeStyle: "short"
          })}
        </span>
      </div>
      <div className="flex h-full items-center">
        <Badge className="py-1 border bg-transparent pointer-events-none capitalize"
          style={{
            color: `hsl(${getTypeHue(appointment.type)} , 100%, 50%)`,
            borderColor: `hsl(${getTypeHue(appointment.type)} , 100%, 50%)`,
          }}
        >{appointment.type}</Badge>
      </div>
    </CardHeader>
    <CardContent className="p-4 py-2 h-full">
      <div className="bg-gray-2 h-full flex flex-col gap-4 justify-evenly">
        <Separator className="px-4" />
        <div className="flex gap-2 items-center">
          <UserBadge user={appointment.patient} />
          <WithToolTip description="send email to patient">
            <Button variant="outline" className="aspect-square p-2" asChild>
              <Link href="#"><SendHorizontal color="#888" /></Link>
            </Button>
          </WithToolTip>
        </div>
        <Separator className="px-4" />
        <div className="h-full line-clamp-3">
          {appointment.reason}
        </div>
        {appointment.patient.companion &&
          <>
            <Separator />
            <h3 className="text-sm text-light">compagnon</h3>
            <div className="flex gap-2 items-center">
              <UserBadge user={appointment.patient.companion} />
            </div>
            <Separator />
          </>
        }
        <div className="flex gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">demandé le</div>
            <div className="font-semibold">
              {new Date(appointment.date).toLocaleString("fr-FR", {
                dateStyle: "short",
                timeStyle: "short"
              })}</div>
          </div>
          {appointment.status &&
            <div className="text-sm rounded-lg p-2 py-1 lowercase" style={getBadgeStyle(appointment.status)}>{appointment.status}</div>
          }
        </div>
        <Separator />
        <AppointmentModal appointment={appointment} />
        {!appointment.status &&
          <div className="flex flex-col-reverse md:flex-row-reverse w-full items-center gap-2 pb-2">
            <Button className="w-full flex items-center gap-2" onClick={() => {
              setModalMessage("Are you sure you want to accept this appointment this action is not reversible?");
              setModalTitle("Accept Appointment");
              setModalOpen(true);
              setModalConfirmAction(() => handleAcceptAppointment);
            }}>
              <Check size={17} />
              <span>Accepter</span>
            </Button>
            <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => {
              setModalMessage("Are you sure you want to reject this appointment this action is not reversible?");
              setModalTitle("Reject Appointment");
              setModalOpen(true);
              setModalConfirmAction(() => handleRejectAppointment);
            }}>
              <X size={17} />
              <span>Refuser</span>
            </Button>
          </div>
        }
      </div>
    </CardContent>
  </Card>
}
