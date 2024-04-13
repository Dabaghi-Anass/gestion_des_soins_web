type Props = {
  appointment: any;
  color: string;
  onClick?: (appointment: any) => void;
}
export default function SmallAppointment({ appointment, color, onClick }: Props) {
  const name = `${appointment.patient.lastName.charAt(0)}.${appointment.patient.firstName}`;
  return <div className="flex flex-col items-start gap-2">
    <div className="text-slate-500 text-xs flex items-center">
      <span className="timeline-ring border-2 border-primary-foreground transform -translate-x-8 p-2 outline outline-1 outline-blue-400 rounded-full bg-blue-400"></span>
      <span>date</span>
    </div>
    <div className="flex flex-col w-full with-border p-4 rounded-lg">
      <span className="font-semibold capitalize text-slate-700 dark:text-slate-300 text-sm flex items-center gap-2">{name} <span className="status-badge lowercase" style={{ color, border: "1px solid " + color }}>{appointment.status}</span></span>
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 appointment-status rounded shadow-md inline-block" style={{ background: color }}></span>
        <span className="text-slate-400">doctor</span>
      </div>
    </div>
  </div>
}