"use client"
"use client"
import api from "@/api/api";
import ConfirmActionModal from "@/components/modals/confirm-action-modal";
import AsyncButton from "@/components/ui/AsyncButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { updateAppointment } from "@/lib/features/appointment-reducer";
import { getBadgeStyle } from "@/lib/utils/utils";
import { useQuery } from "@tanstack/react-query";
import html2pdf from "html2pdf.js";
import { FileUp, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
export default function AppointmentPage() {
  const { id } = useParams();
  const currentUser: any = useAppSelector(state => state.UserReducer.user);
  const dispatch = useAppDispatch();
  const { data: appointment, isLoading } = useQuery({
    queryKey: ["appointment", id],
    queryFn: async ({ queryKey }) => {
      const savedAppointment = await api.getAppointmentById(+queryKey[1]);
      dispatch(updateAppointment(savedAppointment));
      return savedAppointment;
    }
  })
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
  if (isLoading || !currentUser || !appointment) return <Loading />
  const isOwner: boolean = appointment.assignedTo.id === currentUser.id;
  return <section className="w-full p-4 h-full overflow-y-scroll bg-primary-foreground">
    <header className="flex flex-row items-center lg:justify-between gap-4 px-8 flex-wrap">
      <div className="flex flex-col items-start">
        <h1>{appointment.patient.firstName} {appointment.patient.lastName}</h1>
        <div className="text-light text-sm">prévu dans {new Date(appointment.date).toLocaleString("fr-FR", {
          timeStyle: "short",
          dateStyle: "short"
        })}</div>
      </div>
      {appointment.accepted && isOwner &&
        <Button variant="outline" className="w-fit flex items-center gap-2" onClick={uploadDocument}>
          <FileUp />
          <span>placer le fichier Rendez Vous dans les document de {appointment.patient.firstName}</span>
        </Button>
      }
    </header>
    <AppointmentComponent isOwner={isOwner} />
  </section>
}

function AppointmentComponent({ isOwner }: { isOwner: boolean }) {
  const [modalMessage, setModalMessage] = useState<string>("")
  const [modalTitle, setModalTitle] = useState<string>("")
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalConfirmAction, setModalConfirmAction] = useState<() => void>(() => { })
  const dispatch = useAppDispatch();
  const appointment: any = useAppSelector(state => state.AppointmentReducer.appointment);
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
  async function handleCompleteAppointment() {
    const savedAppointment = await api.markAppointmentAsDone(appointment.id);
    dispatch(updateAppointment(savedAppointment));
  }
  async function handleUnCompleteAppointment() {
    const savedAppointment = await api.markAppointmentAsNotDone(appointment.id);
    dispatch(updateAppointment(savedAppointment));
  }
  if (!appointment) return;
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
          <h1 className="text-2xl font-bold w-full">Detailes De Rendez Vous</h1>
          <Badge variant="secondary">{appointment.type}</Badge>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <Image src={api.getUrlFromPath(appointment.patient.profile.imageUrl) || "/user-m.svg"} alt={appointment.patient.firstName} width={50} height={50} />
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
            <p className="text-gray-900 dark:text-gray-50 font-medium">Dr.{appointment.assignedTo.firstName + " " + appointment.assignedTo.lastName}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm capitalize">{appointment.assignedTo.role.toLowerCase()}</p>
          </div>
        </div>
        <h1 className="text-xl my-4">
          Reason Pour Le Rendez Vous
        </h1>
        <div className="py-4 max-w-[50ch] w-full">{appointment.reason}
        </div>
      </div>
      {isOwner &&
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
                attention à l'annulation du rendez-vous, cette action est irréversible et peut affecter la confiance du patient dans la clinique.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <AsyncButton variant="success" onClick={() => {
                  setModalMessage("Etes-vous sûr de vouloir accepter ce rendez-vous, cette action n'est pas réversible?");
                  setModalTitle("Accepter rendez-vous");
                  setModalOpen(true);
                  setModalConfirmAction(() => handleAcceptAppointment);
                }}>
                  <CheckIcon className="h-5 w-5" />
                  Accepter Rendez vous
                </AsyncButton>
                <AsyncButton variant="destructive" onClick={() => {
                  setModalMessage("Etes-vous sûr de vouloir rejeter ce rendez-vous, cette action n'est pas réversible?");
                  setModalTitle("Rejeter le rendez-vous");
                  setModalOpen(true);
                  setModalConfirmAction(() => handleRejectAppointment);
                }}>
                  <XIcon className="h-5 w-5" />
                  Refuser Rendez Vous
                </AsyncButton>
              </div>
            </> : <>
              <p className="text-light text-sm max-w-prose my-4">
                méfiez-vous de manquer le rendez-vous, vous pourriez affecter la confiance du patient dans la clinique.
              </p>
              <div className="flex w-full items-center gap-4 justify-between mb-4">
                <span>Status de Rendez Vous </span>
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
      }
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