import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Check, CreditCard, UserCog, X } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import WithToolTip from "./ui/with-tooltip"

export default function AppointmentRequestCard() {
  return <Card className="bg-primary-foreground hover:shadow-lg transition-all">
    <CardHeader className="flex flex-row justify-between p-4">
      <div className="flex gap-2 font-bold text-gray-700 items-center">
        <div className="rounded-full p-2 border aspect-square">
          <CreditCard size={16} />
        </div>
        <CardTitle>#1298</CardTitle>
      </div>
      <div className="flex h-full items-center">
        <Badge className="py-1 border border-success bg-transparent text-success pointer-events-none">Urgent</Badge>
      </div>
    </CardHeader>
    <CardContent className="p-4 py-2">
      <div className="bg-gray-2 flex flex-col gap-4">
        <Separator className="px-4" />
        <div className="flex gap-2 items-center">
          <div className="w-full flex items-center gap-2">
            <Avatar className="rounded-full">
              <AvatarImage src="https://randomuser.me/api/portraits/men/20.jpg" />
              <AvatarFallback>
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="font-semibold">John Doe</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Patient</div>
            </div>
          </div>
          <WithToolTip description="send email to patient">
            <Button variant="outline" className="aspect-square p-2" asChild>
              <Link href="#"><UserCog color="#888" /></Link>
            </Button>
          </WithToolTip>
        </div>
        <Separator className="px-4" />
        <div className="flex items-center gap-4 w-full">
          <div className="w-1/2">
            <div className="text-sm text-gray-500 dark:text-gray-400">crée le</div>
            <div className="font-semibold text-sm">{Math.random() > 0.3 ? "aujourdhui" : "15/07/2024"}</div>
          </div>
          <div className="w-1/2">
            <div className="text-sm text-gray-500 dark:text-gray-400">télephone</div>
            <div className="font-semibold text-sm">+212617171717</div>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="text-sm text-gray-500 dark:text-gray-400">email</div>
          <div className="text-sm font-semibold">anass.debbaghi123@gmail.com</div>
        </div>
        <Separator />
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2 w-full">
            <Avatar className="rounded-full">
              <AvatarImage src="https://randomuser.me/api/portraits/men/30.jpg" />
              <AvatarFallback>
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="font-semibold">John Doe</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Doctor</div>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <div className="text-sm text-gray-500 dark:text-gray-400">demandé le</div>
            <div className="font-semibold text-sm">19/06/2024</div>
          </div>
        </div>
        <Separator />
        <div className="flex w-full items-center gap-2 pb-2">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <X size={17} />
            <span>Refuser</span>
          </Button>
          <Button className="w-full flex items-center gap-2">
            <Check size={17} />
            <span>Accepter</span>
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
}

type IconProps = {
  [key: string]: any;
}


function CalendarIcon(props: IconProps) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}


function CheckIcon(props: IconProps) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}



function ClipboardIcon(props: IconProps) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  )
}


function FileTextIcon(props: IconProps) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}


function UserIcon(props: IconProps) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function XIcon(props: IconProps) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}