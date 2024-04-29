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
}
export default function ProfileContent({ user, currentUser }: Props) {
  const currentUserFromDb: any = useAppSelector(state => state.UserReducer.user)
  const [treatments, setTreatments] = useState<any[]>([]);
  async function getTreatments() {
    let data;
    if (currentUser && currentUserFromDb) {
      data = await api.getTreatmentsByUserId(currentUserFromDb.id)
    } else if (user?.id) {
      data = await api.getTreatmentsByUserId(user?.id)
    }
    if (data) setTreatments(data)
  }
  useEffect(() => {
    getTreatments()
  }, [])
  return <>
    <ProfileBasicinformations user={user} />
    <ProfileAppointementSchedule />
    {treatments.length === 0 ? <h2 className="text-xl text-gray-600 col-span-2 place-content-center p-4 text-center bg-indigo-100">Aucune Traitement Crée Pour Le Moment 🙌</h2> :
      <TreatmentHistory profilePage={currentUser} data={treatments} />
    }
  </>
}
