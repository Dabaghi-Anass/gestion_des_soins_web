"use client"
import ProfileContent from "@/components/profile-content";
import ProfileHeader from "@/components/profile-header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import Loading from "@/components/ui/loading";
import { User } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import WithToolTip from "../ui/with-tooltip";
type Props = {
  user: any;
}
export default function ProfileModal({ user, children }: React.PropsWithChildren<Props>) {
  const [open, setOpen] = useState<boolean>(false);
  if (!user) return <Loading />
  return <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
    <DialogTrigger>
      {children || <WithToolTip description="send email to patient">
        <Button variant="outline" className="aspect-square p-2">
          <User color="#888" size={18} />
        </Button>
      </WithToolTip>
      }
    </DialogTrigger>
    <DialogContent className="w-full max-w-[90vw] h-full overflow-y-scroll max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>Anass Dabaghi</DialogTitle>
        <DialogDescription>Patient</DialogDescription>
      </DialogHeader>
      <section className="profile-container flex flex-col gap-8 w-full h-full bg-primary-foreground p-6">
        <ProfileHeader user={user} hideEditLink />
        <div className="w-full h-full px-1 overflow-y-scroll gap-4 grid lg:grid-cols-3 grid-flow-row">
          <ProfileContent inModal={true} user={user} />
        </div>
      </section>
    </DialogContent>
  </Dialog>
}
