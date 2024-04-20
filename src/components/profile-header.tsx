"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import WithToolTip from "@/components/ui/with-tooltip"
import { useAppSelector } from "@/hooks/redux-hooks"
import { CalendarDays, Mail, Send, UserCog } from "lucide-react"
// import { User } from "@/types/types"
import Link from "next/link"
type Props = {
  user?: any,
  hideEditLink?: boolean
}
export default function ProfileHeader({ user, hideEditLink }: Props) {
  let currentUser = null;
  if (user) currentUser = user;
  else currentUser = useAppSelector(state => state.UserReducer.user);
  return <div className="profile-header flex justify-between gap-4 md:items-center w-full">
    <Avatar className="with-border w-16 h-16">
      <AvatarImage src={currentUser?.profile?.imageUrl} />
      <AvatarFallback className="uppercase font-semibold">{currentUser?.firstName?.charAt(0)}{currentUser?.lastName?.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="flex md:items-center gap-4 flex-col md:flex-row justify-between w-full">
      <div className="flex flex-col">
        <span className="text-md text-xl">
          {currentUser?.profile?.gender?.toLowerCase() === "male" ? "(Mr)" : "(Mlle)"} {currentUser?.firstName} {currentUser?.lastName}</span>
        <span className='text-sm flex gap-2 text-light'>
          <CalendarDays size={20} />
          Joined Since : {new Date(currentUser?.creationDate).toLocaleString("en-GB")}
        </span>
      </div>
      <div className="user-profile-actions flex gap-2">
        {!hideEditLink ?
          <WithToolTip description="send email to patient">
            <Button variant="outline" className="aspect-square p-2" asChild>
              <Link href="#"><UserCog color="#888" /></Link>
            </Button>
          </WithToolTip> :
          <>
            <WithToolTip description="send email to patient">
              <Button variant="outline" className="aspect-square p-2" asChild>
                <Link href={`mailto:${user?.username}`}><Mail color="#888" /></Link>
              </Button>
            </WithToolTip>
            <WithToolTip description="message privatly">
              <Button variant="outline" className=" aspect-square p-2"><Send color="#888" /></Button>
            </WithToolTip></>
        }
      </div>
    </div>
  </div>
}