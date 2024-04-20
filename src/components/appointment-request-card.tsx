import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import { Button } from "./ui/button";
import Dots from "./ui/dots";
type Props = {
  request: any;
  onClick?: () => void;
  selected: boolean;
}
export function TreatmentRequest({ request, selected, onClick }: Props) {
  return <div onClick={onClick} className={`with-border p-4 flex flex-col gap-2 bg-primary-foreground rounded-lg treatment-request cursor-pointer ${selected && "active-request"}`}>
    <div className="header flex justify-between">
      <Avatar>
        <AvatarImage className="rounded-full" src={request?.sentBy?.profile?.imageUrl || ""} />
        <AvatarFallback className="rounded-full uppercase" >{request?.sentBy?.firstName?.charAt(0)}{request?.sentBy?.lastName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <Popover>
        <PopoverTrigger>
          <Button variant="ghost" className="aspect-square h-[30px] p-0">
            <Dots count={3} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-4">
            <Button className="w-full" variant="secondary" asChild>
              <Link href={`/profile/${request?.sentBy?.id}`}>View Profile</Link>
            </Button>
            <div className="flex w-full gap-4">
              <Button className="w-full" variant="destructive">Delete</Button>
              <Button className="w-full">Reply</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
    <div className='text-gray-600 dark:text-gray-300'>
      {request?.title || "no description"}
    </div>
    <div className="text-gray-400">
      <p>{new Date(request?.creationDate).toLocaleString("en-GB")}</p>
    </div>
  </div>
}

