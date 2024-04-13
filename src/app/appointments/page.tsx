import { AppointmentRequest } from "@/components/appointment-request-card";
import ProfileAnnouncement from "@/components/profile-announcement";
import ProfileContent from "@/components/profile-content";
import ProfileHeader from "@/components/profile-header";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Search } from "lucide-react";
export default function AppointmentsPage() {
  return <main className="appointments-container flex w-full h-full p-4 gap-2">
    <section className="appointments-requests lg:w-1/3  max-h-screen pr-2">
      <div className="pr-4 py-2 bg-primary-foreground text-gray-600 flex items-center rounded-lg border shadow-sm">
        <Input type="search" name="patient-search" placeholder='search patient' className="focus-visible:ring-0 bg-primary-foreground border-0 shadow-transparent" />
        <Search size={20} />
      </div>
      <Tabs defaultValue="all" className="py-4 pr-2 max-h-full overflow-y-scroll">
        <TabsList className="flex items-center justify-start p-0 gap-1 bg-secondary">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="oldest">Plus Ancient</TabsTrigger>
          <TabsTrigger value="newest">Nouveau</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="grid gap-4">
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
          <AppointmentRequest />
        </TabsContent>
        <TabsContent value="oldest">
          <AppointmentRequest />
        </TabsContent>
        <TabsContent value="newest">
          <AppointmentRequest />
        </TabsContent>
      </Tabs>
    </section>
    <section className="profile bg-primary-foreground rounded-lg with-border flex flex-col gap-8 w-full p-6">
      <ProfileHeader />
      <div className="w-full h-full px-1 overflow-y-scroll gap-4 grid lg:grid-cols-3 grid-flow-row">
        <ProfileContent />
        <ProfileAnnouncement />
      </div>
    </section>
  </main>
}