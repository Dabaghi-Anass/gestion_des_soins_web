"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { UserCog } from "lucide-react"
import { useState } from "react"
import WithToolTip from "../ui/with-tooltip"
export default function ProfileEditModal() {
  const [open, setOpen] = useState<boolean>(false);
  function openModal() {
    setOpen(true);
  }
  return (
    <Dialog open={open} onOpenChange={(state: boolean) => setOpen(state)}>
      <DialogTrigger asChild>
        <WithToolTip description="send email to patient">
          <Button variant="outline" className="aspect-square p-2" onClick={openModal}>
            <UserCog color="#888" size={20} />
          </Button>
        </WithToolTip>
      </DialogTrigger>
      <DialogContent>
        <div className="mx-auto container space-y-8 py-12">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <Button>Save Changes</Button>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage alt="Profile Image" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline">
                Upload Photo
              </Button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input defaultValue="John Doe" id="name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input defaultValue="john@example.com" id="email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input defaultValue="123 Main St, Anytown USA" id="address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input defaultValue="(123) 456-7890" id="phone" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Sexe</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Male</SelectItem>
                      <SelectItem value="dark">Female</SelectItem>
                    </SelectContent>
                  </Select>

                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Role</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Doctor</SelectItem>
                      <SelectItem value="dark">Nurse</SelectItem>
                      <SelectItem value="system">Care Giver</SelectItem>
                    </SelectContent>
                  </Select>

                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Birth Date</Label>
                  <Input defaultValue="1990-01-01" id="birthdate" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="speciality">Speciality</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Cardiology</Badge>
                  <Badge variant="secondary">Oncology</Badge>
                  <Button size="sm" variant="outline">
                    <PlusIcon className="h-4 w-4" />
                    Add Speciality
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}