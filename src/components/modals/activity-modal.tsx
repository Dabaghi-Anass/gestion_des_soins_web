"use client"
import api from "@/api/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import Loading from "@/components/ui/loading";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { updateAppointment } from "@/lib/features/appointment-reducer";
import { getBadgeStyle } from "@/lib/utils/utils";
import html2pdf from "html2pdf.js";
import { FileUp, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import AsyncButton from "../ui/AsyncButton";
import { Button } from "../ui/button";
import WithToolTip from "../ui/with-tooltip";
import ConfirmActionModal from "./confirm-action-modal";
type Props = {
  appointment: any;
}
export default function ActivityModal({ appointment }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  function uploadDocument() {
    const element = document.getElementById('printable') as HTMLElement;
    if (!element) return;
    let oldWidth = element.style.width;
    element.style.width = "100%";
    let dark = false;
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.toggle("dark", false);
      dark = true;
    }
    let fileName = `treatment-${appointment.patient.firstName}-${Date.now()}.pdf`;
    const worker = html2pdf()
    let options = {
      margin: 1,
      filename: fileName,
      image: {
        type: "jpeg", quality: 0.98
      },
      html2canvas: {
        dpi: 192, letterRendering: true
      },
      jsPDF: { unit: "in", format: "a3", orientaion: "landscape" },
    }
    worker.set(options).from(element).toPdf().get("pdf").then(async (pdf: any) => {
      const pdfBlob = new Blob([pdf.output('blob')], { type: 'application/pdf' });
      const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });
      if (dark) document.documentElement.classList.toggle("dark", true);
      element.style.width = oldWidth;
      const response = await api.uploadFile(appointment?.patient?.id, pdfFile);
      if (response) toast("document téléchargé avec succès");
      else toast.error("document téléchargé avec succès")
    });
  }
  if (!appointment) return <Loading />
  return <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
    <DialogTrigger>
      <WithToolTip description="send email to patient">
        <div className="w-full mb-2 btn btn-outline" >
          <CalendarIcon className="mr-2 h-4 w-4" />
          Voir Les Détails
        </div>
      </WithToolTip>
    </DialogTrigger>
    <DialogContent className="w-full max-w-[90vw] h-full overflow-y-scroll max-h-[90vh]">
      <DialogHeader className="flex flex-row items-center lg:justify-between gap-4 flex-wrap">
        <div className="flex flex-col items-start">
          <DialogTitle>{appointment.patient.firstName} {appointment.patient.lastName}</DialogTitle>
          <DialogDescription>prévu dans {new Date(appointment.date).toLocaleString("fr-FR", {
            timeStyle: "short",
            dateStyle: "short"
          })}</DialogDescription>
        </div>
        {appointment.accepted &&
          <Button variant="outline" className="w-fit flex items-center gap-2" onClick={uploadDocument}>
            <FileUp />
            <span>placer le fichier Activité dans les document de {appointment.patient.firstName}</span>
          </Button>
        }
      </DialogHeader>
      <ActivityComponent appointment={appointment} />
    </DialogContent>
  </Dialog>
}

function ActivityComponent({ appointment }: { appointment: any }) {
  const [modalMessage, setModalMessage] = useState<string>("")
  const [modalTitle, setModalTitle] = useState<string>("")
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalConfirmAction, setModalConfirmAction] = useState<() => void>(() => { })
  const dispatch = useAppDispatch();
  function printDocument() {
    const element = document.getElementById('printable') as HTMLElement;
    if (!element) return;
    let oldWidth = element.style.width;
    element.style.width = "100%";
    let dark = false;
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.toggle("dark", false);
      dark = true;
    }
    let fileName = `rendez_vouz-${Date.now()}.pdf`;
    const worker = html2pdf()
    let options = {
      margin: 1,
      filename: fileName,
      image: {
        type: "jpeg", quality: 0.98
      },
      html2canvas: {
        dpi: 192, letterRendering: true
      },
      jsPDF: { unit: "in", format: "a4", orientaion: "landscape" },
    }
    worker.set(options).from(element).save(fileName).then(() => {
      if (dark) document.documentElement.classList.toggle("dark", true);
      element.style.width = oldWidth;
    });
  }

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
  async function handleCompleteAppointment() {
    const savedAppointment = await api.markActivityAsDone(appointment.id);
    dispatch(updateAppointment(savedAppointment));
  }
  async function handleUnCompleteAppointment() {
    const savedAppointment = await api.markActivityAsNotDone(appointment.id);
    dispatch(updateAppointment(savedAppointment));
  }
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row gap-8">
      <ConfirmActionModal
        title={modalTitle}
        message={modalMessage}
        open={modalOpen}
        onConfirm={modalConfirmAction}
        onCancel={() => setModalOpen(false)}
      />
      <div className="w-full" id="printable">
        <div className="my-4 w-full flex items-center justify-between  gap-4">
          <h1 className="text-2xl font-bold w-full">Detailes De Activité</h1>
          <div className="flex gap-2"><div className="p-1 rounded-lg bg-amber-400 text-white">
            {appointment.duration}h
          </div>
            <Badge variant="secondary">{appointment.type}</Badge>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <Image src={api.getUrlFromPath(appointment?.patient?.profile?.imageUrl) || "/user-m.svg"} alt={appointment.patient.firstName} width={50} height={50} />
            <AvatarFallback>{appointment.patient.firstName.charAt(0) + appointment.patient.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-gray-900 dark:text-gray-50 font-medium">
              {appointment.patient.firstName + " " + appointment.patient.lastName}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Patient ID: {appointment.patient.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <CalendarIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          <div>
            <p className="text-gray-900 dark:text-gray-50 font-medium">{new Date(appointment.date).toLocaleDateString("fr-FR", {
              dateStyle: "long",
            })}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{new Date(appointment.date).toLocaleTimeString("fr-FR", {
              timeStyle: "short"
            })}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          <div>
            <p className="text-gray-900 dark:text-gray-50 font-medium">{appointment.caregiver.firstName + " " + appointment.caregiver.lastName}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm capitalize">{appointment.caregiver.role.toLowerCase()}</p>
          </div>
        </div>
        <h1 className="text-xl my-4">
          Reason Pour L'Activité
        </h1>
        <div className="py-4 max-w-[50ch] w-full">{appointment.description}
        </div>
      </div>
      <div className="w-full flex flex-col ">
        <div className="flex items-center space-x-4 justify-end p-4">
          <Button variant="outline" onClick={printDocument}>
            <PrinterIcon className="h-5 w-5 mr-2" />
            Imprimer
          </Button>
        </div>
        <h2 className="text-lg font-medium mb-4 w-full text-start">Les Actions</h2>
        {!appointment.status ?
          <>
            <p className="text-light text-sm max-w-prose my-4">
              attention à l'annulation du activity, cette action est irréversible et peut affecter la confiance du patient dans la clinique.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <AsyncButton variant="success" onClick={() => {
                setModalMessage("Etes-vous sûr de vouloir accepter ce activity, tous les Activité en meme temps vont refusez, cette action n'est pas réversible ?");
                setModalTitle("Accepter activity");
                setModalOpen(true);
                setModalConfirmAction(() => handleAcceptAppointment);
              }}>
                <CheckIcon className="h-5 w-5" />
                Accepter Activité
              </AsyncButton>
              <AsyncButton variant="destructive" onClick={() => {
                setModalMessage("Etes-vous sûr de vouloir rejeter ce activity, cette action n'est pas réversible?");
                setModalTitle("Rejeter le activity");
                setModalOpen(true);
                setModalConfirmAction(() => handleRejectAppointment);
              }}>
                <XIcon className="h-5 w-5" />
                Refuser Activité
              </AsyncButton>
            </div>
          </> : <>
            <p className="text-light text-sm max-w-prose my-4">
              méfiez-vous de manquer le activity, vous pourriez affecter la confiance du patient dans la clinique.
            </p>
            <div className="flex w-full items-center gap-4 justify-between mb-4">
              <span>Status de Activité </span>
              <Badge className="p-2 rounded-lg" style={getBadgeStyle(appointment.status)}>{appointment.status}</Badge>
            </div>
            {appointment.status !== "DENIED" ?
              appointment.status !== "DONE" ?
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full flex gap-2" onClick={handleCompleteAppointment}>
                    <CheckIcon className="h-5 w-5" />
                    Marquer Comme Réalisé
                  </Button>
                </div> :
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full flex gap-2" onClick={handleUnCompleteAppointment}>
                    <X className="h-5 w-5" />
                    Marquer Comme Pas Réalisé
                  </Button>
                </div> : null
            }
          </>
        }
      </div>
    </div>
  )
}
type IconProps = {
  className?: string;
  [key: string]: any;
}

function CalendarIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function CheckIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function NotebookIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 6h4" />
      <path d="M2 10h4" />
      <path d="M2 14h4" />
      <path d="M2 18h4" />
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M16 2v20" />
    </svg>
  )
}


function PrinterIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
      <rect x="6" y="14" width="12" height="8" rx="1" />
    </svg>
  )
}


function ShareIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}


function UserIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function XIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}