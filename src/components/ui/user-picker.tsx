"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Props = {
  users: any[];
  pickedUsers: any[];
  onListUpdate: (users: number[]) => void;
}
export default function UserPicker({ users, pickedUsers, onListUpdate }: Props) {
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="w-full justify-between" size="sm" variant="outline">
        <span>Filter by User</span>
        <ChevronDownIcon className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 space-y-1">
      {users.filter((v: any, index: number, self: any[]) => {
        return self.findIndex((t: any) => (t.id === v.id)) === index;
      }).map((user: any) => <DropdownMenuCheckboxItem key={user.id}>
        <div className="flex items-center justify-between gap-4" >
          <span>{user.fullName}</span>
          <Checkbox
            checked={pickedUsers?.includes(user.id)}
            onCheckedChange={(checked: boolean) => {
              console.log(pickedUsers)
              console.log(users)
              // let data = checked ? [...pickedUsers, user] :
              //   pickedUsers.filter((u: any) => u.id !== user.id)
              // onListUpdate(data.map((u: any) => u.id)
              //   .filter((v: any, index: number, self: any[]) => self.findIndex((t: any) => (t === v)) === index))
            }}
          />
        </div>
      </DropdownMenuCheckboxItem>)}
    </DropdownMenuContent>
  </DropdownMenu>
}

type IconProps = {
  [key: string]: any;
}

function ChevronDownIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}