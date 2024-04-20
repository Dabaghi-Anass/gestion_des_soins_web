import TreatmentHistory from "@/components/treatement-history";
import ProfileAppointementSchedule from "./appointments-list";
import ProfileBasicinformations from "./profile-basic-info";
type Props = {
  user: any
}
export default function ProfileContent({ user }: Props) {
  return <>
    <ProfileBasicinformations user={user} />
    <ProfileAppointementSchedule />
    <TreatmentHistory />
  </>
}
