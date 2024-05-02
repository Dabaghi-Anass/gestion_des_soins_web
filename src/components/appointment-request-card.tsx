import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getTypeHue } from "@/lib/utils/utils"
import { Check, CreditCard, SendHorizontal, X } from "lucide-react"
import Link from "next/link"
import AppointmentModal from "./modals/appointment-request-modal"
import { Button } from "./ui/button"
import UserBadge from "./ui/user-badge"
import WithToolTip from "./ui/with-tooltip"

type AppointmentRequestCardProps = {
  appointment: any;
}
export default function AppointmentRequestCard({ appointment }: AppointmentRequestCardProps) {
  return <Card className="bg-primary-foreground hover:shadow-lg transition-all w-full flex flex-col">
    <CardHeader className="flex flex-row justify-between p-4">
      <div className="flex gap-2 font-bold text-gray-700 items-center">
        <div className="rounded-full p-2 border aspect-square">
          <CreditCard size={16} />
        </div>
        <CardTitle>#{appointment.patient.id}</CardTitle>
      </div>
      <div className="flex h-full items-center">
        <Badge className="py-1 border bg-transparent pointer-events-none capitalize"
          style={{
            color: `hsl(${getTypeHue(appointment.type)} , 100%, 50%)`,
            borderColor: `hsl(${getTypeHue(appointment.type)} , 100%, 50%)`,
          }}
        >{appointment.type}</Badge>
      </div>
    </CardHeader>
    <CardContent className="p-4 py-2 h-full">
      <div className="bg-gray-2 h-full flex flex-col gap-4 justify-evenly">
        <Separator className="px-4" />
        <div className="flex gap-2 items-center">
          <UserBadge user={appointment.patient} />
          <WithToolTip description="send email to patient">
            <Button variant="outline" className="aspect-square p-2" asChild>
              <Link href="#"><SendHorizontal color="#888" /></Link>
            </Button>
          </WithToolTip>
        </div>
        <Separator className="px-4" />
        <div className="h-full line-clamp-3">
          {appointment.reason}
        </div>
        {appointment.patient.companion &&
          <>
            <Separator />
            <h3 className="text-sm text-light">compagnon</h3>
            <div className="flex gap-2 items-center">
              <UserBadge user={appointment.patient.companion} />
            </div>
            <Separator />
          </>
        }
        <div className="flex gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">demandé le</div>
          <div className="font-semibold">
            {new Date(appointment.date).toLocaleString("fr-FR", {
              dateStyle: "short",
              timeStyle: "short"
            })}</div>
        </div>
        <Separator />
        <AppointmentModal appointment={appointment} />
        <div className="flex w-full items-center gap-2 pb-2 flex-wrap">
          <Button className="w-full flex items-center gap-2">
            <Check size={17} />
            <span>Accepter</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <X size={17} />
            <span>Refuser</span>
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
}
