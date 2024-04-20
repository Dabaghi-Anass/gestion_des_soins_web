"use client"
import { useAppSelector } from "@/hooks/redux-hooks";
import { User } from "@/types/types";
import { BookUser, Cake, Dna, Mail, MapPin, Phone } from "lucide-react";
import InfoWithIcon from "./ui/info-with-icon";

export default function ProfileBasicinformations() {
  const currentUser: User | any = useAppSelector(state => state.UserReducer.user);
  const age = currentUser?.profile?.birthDate ? new Date().getFullYear() - new Date(currentUser.profile.birthDate).getFullYear() : null;
  return <div className="p-4 with-border flex flex-col gap-4 rounded-lg w-full sm:row-span-1 lg:row-span-full">
    <h1 className="font-semibold capitalize mb-4">basic informations</h1>
    <InfoWithIcon title="Gender" content={currentUser?.profile?.gender || "male"} icon={<Dna size={20} />} />
    <InfoWithIcon title="Birthday" content={new Date(currentUser?.profile?.birthDate).toLocaleDateString("en-GB", { dateStyle: "long" }) || "n/a"} icon={<Cake size={20} />} />
    <InfoWithIcon title="Phone Number" content={currentUser?.profile?.phoneNumber || "n/a"} icon={<Phone size={20} />} />
    <InfoWithIcon title="Email" content={currentUser?.username} icon={<Mail size={20} />} />
    <InfoWithIcon title="Age" content={age !== null ? age + " years old" : "n/a"} icon={<BookUser size={20} />} />
    <InfoWithIcon title="Address" content={currentUser?.profile?.address || "n/a"} icon={<MapPin size={20} />} />
  </div>
}