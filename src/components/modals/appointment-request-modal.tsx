"use client"
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
import html2pdf from "html2pdf.js";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import WithToolTip from "../ui/with-tooltip";
type Props = {
  appointment: any;
}
export default function AppointmentModal({ appointment }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  if (!appointment) return <Loading />
  return <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
    <DialogTrigger>
      <WithToolTip description="send email to patient">
        <Button className="w-full" size="sm" variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </WithToolTip>
    </DialogTrigger>
    <DialogContent className="w-full max-w-[90vw] h-full overflow-y-scroll max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>{appointment.patient.firstName} {appointment.patient.lastName}</DialogTitle>
        <DialogDescription>prévu dans {new Date(appointment.date).toLocaleString("fr-FR", {
          timeStyle: "short",
          dateStyle: "short"
        })}</DialogDescription>
      </DialogHeader>
      <AppointmentComponent appointment={appointment} />
    </DialogContent>
  </Dialog>
}

function AppointmentComponent({ appointment }: { appointment: any }) {
  function printDocument() {
    const element = document.getElementById('printable') as HTMLElement;
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
    });
  }
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row gap-8 justify-between">
      <div className="w-1/2" id="printable">
        <div className="my-4 w-full flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold w-full">Detailes De Rendez Vous</h1>
          <Badge variant="secondary">{appointment.type}</Badge>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <Image src={appointment.patient.profile.imageUrl} alt={appointment.patient.firstName} width={50} height={50} />
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
      <div className="w-full lg:w-fit">
        <div className="flex items-center space-x-4 justify-end p-4">
          <Button variant="outline" onClick={printDocument}>
            <PrinterIcon className="h-5 w-5 mr-2" />
            Imprimer
          </Button>
          <Button variant="outline">
            <ShareIcon className="h-5 w-5 mr-2" />
            Partager
          </Button>
        </div>
        <h2 className="text-lg font-medium mb-4">Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline">
            <CheckIcon className="h-5 w-5 mr-2" />
            Confirm Appointment
          </Button>
          <Button variant="outline">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Reschedule Appointment
          </Button>
          <Button variant="outline">
            <XIcon className="h-5 w-5 mr-2" />
            Cancel Appointment
          </Button>
          <Button variant="outline">
            <NotebookIcon className="h-5 w-5 mr-2" />
            Add Notes
          </Button>
        </div>
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