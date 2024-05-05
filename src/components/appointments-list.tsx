import SmallAppointment from "@/components/ui/small-appointment-visualizer";
import { useAppSelector } from "@/hooks/redux-hooks";
import { getStatusHue } from "@/lib/utils/utils";
import Link from "next/link";

export default function ProfileAppointementSchedule({ inModal, isInProfilePage, appointments }: { inModal?: boolean, isInProfilePage?: boolean, appointments: any[] }) {
  const currentUser: any = useAppSelector(state => state.UserReducer.user)
  if (!currentUser) return null
  return <div className={`p-4 with-border flex flex-col gap-4 rounded-lg w-full h-full hide-footer lg:overflow-hidden sm:row-span-1 lg:row-span-full ${inModal ? "lg:col-span-2" : ""}`}>
    <h1 className="font-semibold capitalize mb-4">Appointments Schedule</h1>
    {appointments.length === 0 ? <h2 className={`text-xl h-full place-content-center p-4 text-center ${inModal ? "lg:col-span-3" : "col-span-2"}`}>Aucun Rendez-vous Pris Pour Le Moment 🙌</h2> :
      <>
        <div className="pl-10 flex flex-col gap-4 px-4 pt-4 h-full overflow-scroll">
          {appointments
            .toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((appointment) => <SmallAppointment showDoctorName={appointment.assignedTo.id === currentUser.id} key={appointment.id} color={`hsl(${getStatusHue(appointment.status)}, 100%, 74%)`} appointment={appointment} />)}
        </div>
        <Link href={`/appointments/${isInProfilePage ? "" : appointments[0]?.patient.id}`} className="z-[200] w-full text-center link">see all</Link>
      </>
    }
  </div>
}