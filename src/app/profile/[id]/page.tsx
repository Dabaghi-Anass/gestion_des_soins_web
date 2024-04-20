"use client"
import api from "@/api/api";
import ProfileAnnouncement from "@/components/profile-announcement";
import ProfileContent from "@/components/profile-content";
import ProfileHeader from "@/components/profile-header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function ProfilePage() {
  const { id } = useParams()
  const [user, setUser] = useState<any>(null)
  async function getUser() {
    const userFromDB = await api.getUserById(+id)
    setUser(userFromDB)
  }
  useEffect(() => {
    getUser()
  }, [])
  return <section className="profile-container flex flex-col gap-8 w-full h-full bg-primary-foreground p-6">
    <ProfileHeader user={user} hideEditLink />
    <div className="w-full h-full px-1 overflow-y-scroll gap-4 grid lg:grid-cols-3 grid-flow-row">
      <ProfileContent user={user} />
      <ProfileAnnouncement />
    </div>
  </section>
}