"use client"
import api from "@/api/api"
import ConfirmActionModal from "@/components/modals/confirm-action-modal"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch } from "@/hooks/redux-hooks"
import { updateAppointment } from "@/lib/features/appointment-reducer"
import { getBadgeStyle, getTypeHue } from "@/lib/utils/utils"
import { Check, CreditCard, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import AppointmentModal from "./modals/appointment-request-modal"
import { Button } from "./ui/button"
import { Dialog, DialogContent } from "./ui/dialog"
import { Input } from "./ui/input"
import UserBadge from "./ui/user-badge"
type AppointmentRequestCardProps = {
  appointment: any;
  disableEditing?: boolean;
}
export default function AppointmentRequestCard({ appointment, disableEditing }: AppointmentRequestCardProps) {
  const [modalMessage, setModalMessage] = useState<string>("")
  const [modalTitle, setModalTitle] = useState<string>("")
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [durationModalOpen, setDurationModalOpen] = useState<boolean>(false)
  const [modalConfirmAction, setModalConfirmAction] = useState<() => void>(() => { })
  const dispatch = useAppDispatch();
  async function handleAcceptAppointment() {
    const savedAppointment = await api.acceptAppointmentRequest(appointment.id);
    dispatch(updateAppointment(savedAppointment));
    setModalOpen(false);
    if (savedAppointment.status === "DENIED") toast.error("Rendez vous annulé par le service de consultation, il a un horodatage qui chevauche l'un de vos rendez-vous");
    else toast("Rendez Vous Accepté");
  }
  const [duration, setDuration] = useState<number>();
  async function handleRejectAppointment() {
    const savedAppointment = await api.rejectAppointmentRequest(appointment.id);
    dispatch(updateAppointment(savedAppointment));
    setModalOpen(false);
    toast("Appointment Rejected");
  }
  async function handleUpdateAppointmentDuration() {
    const newAppointment = { ...appointment, duration };
    const savedAppointment = await api.updateAppointment(appointment.id, newAppointment);
    if (savedAppointment) {
      dispatch(updateAppointment(savedAppointment));
      setDurationModalOpen(false);
      toast("rendez-vous mis à jour avec succès");
    }
  }
  return <Card className="bg-primary-foreground hover:shadow-lg transition-all w-full flex flex-col">
    <ConfirmActionModal
      title={modalTitle}
      message={modalMessage}
      open={modalOpen}
      onConfirm={modalConfirmAction}
      onCancel={() => setModalOpen(false)}
    />
    <Dialog open={durationModalOpen} onOpenChange={(state) => setDurationModalOpen(state)}>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-light">combien de temps pensez-vous être suffisant pour completer ce rendez-vous?</p>
          <Input value={duration} onChange={(e: any) => setDuration(+e.target?.value)} type="number" placeholder="Durée en heures" />
          <Button onClick={handleUpdateAppointmentDuration}>envoyer</Button>
        </div>
      </DialogContent>
    </Dialog>
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
          <span></span>
        </div>
        <Separator className="px-4" />
        <div className="line-clamp-3">
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
          <div className="flex gap-2">
            {appointment?.duration !== 0 ?
              <div className="p-1 text-sm rounded-lg bg-amber-400 text-white">
                {appointment.duration}h
              </div> :
              appointment.accepted ?
                <Button variant="outline" size="sm" onClick={() => setDurationModalOpen(true)}>specifier durée</Button> : null
            }
            {appointment.status &&
              <div className="text-sm rounded-lg p-2 py-1 lowercase" style={getBadgeStyle(appointment.status)}>{appointment.status}</div>
            }
          </div>
        </div>
        {!disableEditing && <>
          <Separator />
          <AppointmentModal appointment={appointment} />
        </>
        }
        {!appointment.status && !disableEditing &&
          <div className="flex flex-col-reverse md:flex-row-reverse w-full items-center gap-2 pb-2">
            <Button className="w-full flex items-center gap-2" onClick={() => {
              setModalMessage("Etes-vous sûr de vouloir accepter ce rendez-vous, tous les rendez vous en meme temps vont refusez, cette action n'est pas réversible?");
              setModalTitle("Accepter Rendez Vous");
              setModalOpen(true);
              setModalConfirmAction(() => handleAcceptAppointment);
            }}>
              <Check size={17} />
              <span>Accepter</span>
            </Button>
            <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => {
              setModalMessage("Etes-vous sûr de vouloir rejeter ce rendez-vous, cette action n'est pas réversible?");
              setModalTitle("Refuser Rendez Vous");
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
