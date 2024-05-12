"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import WithToolTip from "@/components/ui/with-tooltip"
import { useAppSelector } from "@/hooks/redux-hooks"
import { CalendarDays, Mail } from "lucide-react"
// import { User } from "@/types/types"
import api from "@/api/api"
import Link from "next/link"
import ProfileEditModal from "./modals/profile-edit-modal"
import { Badge } from "./ui/badge"
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
      <AvatarImage src={api.getUrlFromPath(currentUser?.profile?.imageUrl)} />
      <AvatarFallback className="uppercase font-semibold">{currentUser?.firstName?.charAt(0)}{currentUser?.lastName?.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="flex md:items-center gap-4 flex-col md:flex-row justify-between w-full">
      <div className="flex flex-col">
        <span className="text-md text-xl">
          {currentUser?.profile?.gender?.toLowerCase() === "male" ? "(Mr)" : "(Mlle)"} {currentUser?.firstName} {currentUser?.lastName}</span>
        <span className='text-sm flex gap-2 text-light'>
          <CalendarDays size={20} />
          Joined Since : {new Date(currentUser?.creationDate).toLocaleString("fr-FR")}
        </span>
        <div className="flex gap-2 mt-1 flex-wrap">
          {user?.specialities && user.specialities.map((spec: any) => <Badge
            key={spec.category}
            variant="secondary">{spec.category}</Badge>)}
        </div>
        <div className="flex gap-2 mt-1 flex-wrap">
          {user?.qualities &&
            user.qualities.split(",").map((spec: any) => <Badge
              key={spec}
              variant="secondary">{spec}</Badge>)}
        </div>
      </div>
      <div className="user-profile-actions flex gap-2">
        {!hideEditLink ?
          <ProfileEditModal /> :
          <>
            <WithToolTip description="send email to patient">
              <Button variant="outline" className="aspect-square p-2" asChild>
                <Link href={`mailto:${user?.username}`}><Mail color="#888" /></Link>
              </Button>
            </WithToolTip>
            <span></span>
          </>
        }
      </div>
    </div>
  </div>
}