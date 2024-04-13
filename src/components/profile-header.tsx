"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import WithToolTip from "@/components/ui/with-tooltip"
import { useAppSelector } from "@/hooks/redux-hooks"
import { CalendarDays, Mail, Send, UserCog } from "lucide-react"
import AsyncButton from "./ui/AsyncButton"
export default function ProfileHeader() {
  const currentUser = useAppSelector((state: any) => state.UserReducer.user);
  return <div className="profile-header flex justify-between gap-4 md:items-center w-full">
    <Avatar className="with-border w-16 h-16">
      <AvatarImage src={currentUser?.profile?.imageUrl} />
      <AvatarFallback>AN</AvatarFallback>
    </Avatar>
    <div className="flex md:items-center gap-4 flex-col md:flex-row justify-between w-full">
      <div className="flex flex-col">
        <span className="text-md text-xl">hello world</span>
        <span className='text-sm flex gap-2 text-light'>
          <CalendarDays size={20} />
          Joined Since : {new Date(currentUser?.creationDate).toLocaleString("en-GB")}
        </span>
      </div>
      <div className="user-profile-actions flex gap-2">
        <AsyncButton variant="destructive" className="p-2 w-[150px]">cancel appointment</AsyncButton>
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