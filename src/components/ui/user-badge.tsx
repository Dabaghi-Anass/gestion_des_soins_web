import api from "@/api/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileModal from "../modals/user-profile-modal";

export default function UserBadge({ user }: { user: any }) {
  return <div className="w-full flex items-center gap-2">
    <ProfileModal user={user}>
      <Avatar className="rounded-full">
        <AvatarImage src={api.getUrlFromPath(user.profile.imageUrl)} />
        <AvatarFallback className="uppercase">
          {user.firstName.charAt(0) + user.lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </ProfileModal>
    <div className="flex flex-col gap-1">
      <div className="font-semibold max-w-[100px] lg:max-w-[200px] truncate">{user.firstName + " " + user.lastName}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">rejoint à {new Date(user.creationDate).toLocaleString("fr-FR", {
        dateStyle: "long",
        timeStyle: "short"
      })}
      </div>
    </div>
  </div>
}