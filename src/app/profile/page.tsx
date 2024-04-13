// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import WithToolTip from "@/components/ui/with-tooltip"
// import { CalendarDays, Mail, Send, UserCog } from "lucide-react"
// const profileSvg = "https://firebasestorage.googleapis.com/v0/b/todowi-1cde9.appspot.com/o/images%2Fapp-logo.jpg?alt=media&token=e30e4cc9-26d1-4b99-9d43-3b621dfb9418"
import ProfileAnnouncement from "@/components/profile-announcement";
import ProfileContent from "@/components/profile-content";
import ProfileHeader from "@/components/profile-header";

export default function ProfilePage() {
  return <section className="profile-container flex flex-col gap-8 w-full h-full bg-primary-foreground p-6">
    <ProfileHeader />
    <div className="w-full h-full px-1 overflow-y-scroll gap-4 grid lg:grid-cols-3 grid-flow-row">
      <ProfileContent />
      <ProfileAnnouncement />
    </div>
  </section>
}