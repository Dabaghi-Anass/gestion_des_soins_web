import TreatmentHistory from "@/components/treatement-history";
import ProfileAppointementSchedule from "./appointments-list";
import ProfileBasicinformations from "./profile-basic-info";
export default function ProfileContent() {
  return <>
    <ProfileBasicinformations />
    <ProfileAppointementSchedule />
    <TreatmentHistory />
  </>
}
