"use client"
import TreatmentHistory from "@/components/treatement-history";
import ProfileAppointementSchedule from "./appointments-list";
import ProfileBasicinformations from "./profile-basic-info";
type Props = {
  user: any,
  currentUser?: boolean
}
export default function ProfileContent({ user, currentUser }: Props) {
  return <>
    <ProfileBasicinformations user={user} />
    <ProfileAppointementSchedule />
    <TreatmentHistory profilePage={currentUser} />
  </>
}
