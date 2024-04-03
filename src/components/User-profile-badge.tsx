"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { User } from "@/types/types"
type Props = {
  className?: string;
  user: User;
  lastLogin: number;
  onLogout: () => void;
}
export default function UserProfileBadge({ className, lastLogin, user, onLogout }: Props) {
  return <>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className={cn("hover:opacity-65 transition-all duration-300", className)}>
          <AvatarImage src={user.profile?.imageUrl} />
          <AvatarFallback>
            {user.firstName?.toUpperCase().slice(0, 1)}
            {user.lastName?.toUpperCase().slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-4 w-60">
        <DropdownMenuLabel className="capitalize">{`${user.firstName} ${user.lastName}`}</DropdownMenuLabel>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuLabel>Last Login :
          <span className="text-slate-500 text-sm font-thin mx-2">{new Date(Date.now() + lastLogin / 1000).toLocaleDateString()}</span></DropdownMenuLabel>
        <DropdownMenuItem asChild className="p-4 w-full mt-5">
          <Button variant="destructive" onClick={onLogout}>Log Out</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>

}