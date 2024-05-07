"use client"
import ProfileAnnouncement from "@/components/profile-announcement";
import ProfileContent from "@/components/profile-content";
import ProfileHeader from "@/components/profile-header";
import { useAppSelector } from "@/hooks/redux-hooks";

export default function ProfilePage() {
  const currentUser: any = useAppSelector(state => state.UserReducer.user);
  return <section className="profile-container flex flex-col gap-8 w-full h-full bg-primary-foreground p-6">
    <ProfileHeader user={currentUser} />
    <div className="w-full h-full px-1 overflow-y-scroll gap-4 grid lg:grid-cols-3 grid-flow-row">
      <ProfileContent user={currentUser} currentUser />
      <ProfileAnnouncement user={currentUser} />
    </div>
  </section>
}