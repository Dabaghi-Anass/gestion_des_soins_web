import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import WithToolTip from "@/components/ui/with-tooltip"
import { CalendarDays, Mail, Send, UserCog } from "lucide-react"
const profileSvg = "https://firebasestorage.googleapis.com/v0/b/todowi-1cde9.appspot.com/o/images%2Fapp-logo.jpg?alt=media&token=e30e4cc9-26d1-4b99-9d43-3b621dfb9418"
export default function ProfileHeader() {
  return <div className="profile-header flex justify-between gap-4 md:items-center w-full">
    <Avatar className="with-border w-16 h-16">
      <AvatarImage src={profileSvg} />
      <AvatarFallback>AN</AvatarFallback>
    </Avatar>
    <div className="flex md:items-center gap-4 flex-col md:flex-row justify-between w-full">
      <div className="flex flex-col">
        <span className="text-md text-xl">hello world</span>
        <span className='text-sm flex gap-2 text-light'>
          <CalendarDays size={20} />
          Joined Since : {new Date().toLocaleDateString()}
        </span>
      </div>
      <div className="user-profile-actions flex gap-2">
        <WithToolTip description="send email">
          <Button variant="outline" className="aspect-square p-2"><Mail color="#888" /></Button>
        </WithToolTip>
        <WithToolTip description="send message">
          <Button variant="outline" className=" aspect-square p-2"><Send color="#888" /></Button>
        </WithToolTip>
        <WithToolTip description="configure">
          <Button variant="outline" className=" aspect-square p-2"><UserCog color="#888" /></Button>
        </WithToolTip>
      </div>
    </div>
  </div>
}