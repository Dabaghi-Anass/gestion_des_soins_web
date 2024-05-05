import Link from "next/link";
import { Badge } from "./badge";

type Props = {
  appointment: any;
  color: string;
  onClick?: (appointment: any) => void;
  showDoctorName?: boolean;
  showCaregiverName?: boolean;
}
export default function SmallAppointment({ appointment, showDoctorName, showCaregiverName, color, onClick }: Props) {
  let name;
  if (appointment.assignedTo) {
    name = showDoctorName ? `${appointment.assignedTo.lastName.charAt(0)}.${appointment.assignedTo.firstName}` : `${appointment.patient.lastName.charAt(0)}.${appointment.patient.firstName}`;
  } else if (appointment.caregiver) {
    name = showCaregiverName ? `${appointment.caregiver.lastName.charAt(0)}.${appointment.caregiver.firstName}` : `${appointment.patient.lastName.charAt(0)}.${appointment.patient.firstName}`;
  }
  let role = appointment.assignedTo?.role || appointment.caregiver?.role;
  return <Link href={`${appointment.description ? "/activities/activity" : "/appointments/appointment"}/${appointment.id}`}>
    <div className="flex flex-col items-start gap-2 hover:opacity-55">
      <div className="text-slate-500 text-xs flex items-center ">
        <span className="timeline-ring border-2 border-primary-foreground transform -translate-x-8 p-2 outline outline-1 outline-blue-400 rounded-full bg-blue-400"></span>
        <span> {new Date(appointment.date).toLocaleString("fr-FR", {
          dateStyle: "long",
          timeStyle: "short"
        })}</span>
      </div>

      <div className="flex flex-col w-full with-border p-4 rounded-lg">
        <span className="font-semibold capitalize text-slate-700 dark:text-slate-300 text-sm flex items-center gap-2 w-full justify-between"><div className="span flex gap-2">{name} <Badge className="rounded-lg">{role}</Badge></div>
          <span className="status-badge lowercase" style={{ color, border: "1px solid " + color }}>{appointment.status || "en attente"}</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 appointment-status rounded shadow-md inline-block" style={{ background: color }}></span>
          <span className="text-slate-400">{appointment.type}</span>
        </div>
      </div>
    </div>
  </Link>
}