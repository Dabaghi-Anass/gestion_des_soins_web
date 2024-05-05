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
import ActivityModal from "../modals/activity-modal"
import { Button } from "./button"
import UserBadge from "./user-badge"
import WithToolTip from "./with-tooltip"
type AppointmentRequestCardProps = {
  appointment: any;
  disableEditing?: boolean;
}
export default function ActivityRequestCard({ appointment, disableEditing }: AppointmentRequestCardProps) {
  const [modalMessage, setModalMessage] = useState<string>("")
  const [modalTitle, setModalTitle] = useState<string>("")
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalConfirmAction, setModalConfirmAction] = useState<() => void>(() => { })
  const dispatch = useAppDispatch();
  async function handleAcceptAppointment() {
    const savedAppointment = await api.acceptActivityRequest(appointment.id);
    dispatch(updateAppointment(savedAppointment));
    setModalOpen(false);
    if (savedAppointment.status === "DENIED") toast.error("Activité annulé par le service de consultation, il a un horodatage qui chevauche l'un de vos activitées");
    else toast("Activité Accepté");
  }
  async function handleRejectAppointment() {
    const savedAppointment = await api.rejectActivityRequest(appointment.id);
    dispatch(updateAppointment(savedAppointment));
    setModalOpen(false);
    toast("Activité Rejeté");
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
        <div className="flex gap-2 font-bold items-center">
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
        <div className="line-clamp-3">
          {appointment.description || "Pas de description"}
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
          <div className="flex gap-2">
            <div className="p-1 text-sm rounded-lg bg-amber-400 text-white">
              {appointment.duration}h
            </div>
            {appointment.status &&
              <div className="text-sm rounded-lg p-2 py-1 lowercase" style={getBadgeStyle(appointment.status)}>{appointment.status}</div>
            }
          </div>
        </div>
        {!disableEditing && <>
          <Separator />
          <ActivityModal appointment={appointment} />
        </>
        }
        {!appointment.status && !disableEditing &&
          <div className="flex flex-col-reverse md:flex-row-reverse w-full items-center gap-2 pb-2">
            <Button className="w-full flex items-center gap-2" onClick={() => {
              setModalMessage("Etes-vous sûr de vouloir accepter ce rendez-vous, tous les Activity en meme temps vont refusez, cette action n'est pas réversible?");
              setModalTitle("Accepter Activity");
              setModalOpen(true);
              setModalConfirmAction(() => handleAcceptAppointment);
            }}>
              <Check size={17} />
              <span>Accepter</span>
            </Button>
            <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => {
              setModalMessage("Etes-vous sûr de vouloir rejeter ce rendez-vous, cette action n'est pas réversible?");
              setModalTitle("Refuser Activity");
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