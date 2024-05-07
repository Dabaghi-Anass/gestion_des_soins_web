"use client"
import api from "@/api/api";
import ProfileAnnouncement from "@/components/profile-announcement";
import ProfileContent from "@/components/profile-content";
import ProfileHeader from "@/components/profile-header";
import Loading from "@/components/ui/loading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
export default function ProfilePage() {
  const { id } = useParams()
  const { data: user, isLoading } = useQuery({
    queryKey: ["get-user", id],
    queryFn: async ({ queryKey }) => await api.getUserById(+id)
  })
  if (!user || isLoading) return <Loading />
  return <section className="profile-container flex flex-col gap-8 w-full h-full bg-primary-foreground p-6">
    <ProfileHeader user={user} hideEditLink />
    <div className="w-full h-full px-1 overflow-y-scroll gap-4 grid lg:grid-cols-3 grid-flow-row">
      <ProfileContent user={user} />
      <ProfileAnnouncement user={user} />
    </div>
  </section>
}