"use client"
import api from "@/api/api";
import TreatmentHistory from "@/components/treatement-history";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useEffect, useState } from "react";
import ProfileAppointementSchedule from "./appointments-list";
import ProfileBasicinformations from "./profile-basic-info";
type Props = {
  user: any,
  currentUser?: boolean
  inModal?: boolean
}
export default function ProfileContent({ user, currentUser, inModal }: Props) {
  const currentUserFromDb: any = useAppSelector(state => state.UserReducer.user)
  const [treatments, setTreatments] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  async function getTreatments() {
    let data;
    if (currentUser && currentUserFromDb) {
      data = await api.getTreatmentsByUserId(currentUserFromDb.id)
    } else if (user?.id) {
      data = await api.getTreatmentsByUserId(user?.id)
    }
    if (data) setTreatments(data)
  }
  async function getAppointments() {
    let data;
    if (currentUser && currentUserFromDb) {
      data = await api.getAppointmentRequests(currentUserFromDb.id, 0, 5)
    } else if (user?.id) {
      data = await api.getAppointmentRequests(user.id, 0, 5)
    }
    if (data) setAppointments(data.appointments)
  }
  useEffect(() => {
    Promise.all([getTreatments(), getAppointments()])
  }, [])

  return <>
    <ProfileBasicinformations user={user} />
    <ProfileAppointementSchedule appointments={appointments} inModal={inModal} />
    {treatments.length === 0 ? <h2 className={`text-xl text-gray-600 place-content-center p-4 text-center bg-indigo-100 ${inModal ? "lg:col-span-3" : "col-span-2"}`}>Aucune Traitement Crée Pour Le Moment 🙌</h2> :
      <TreatmentHistory inModal={inModal} profilePage={currentUser} data={treatments} />
    }
  </>
}
