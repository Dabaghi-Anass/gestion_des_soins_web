"use client"
import { BookUser, Cake, Dna, Mail, MapPin, Phone } from "lucide-react";
import InfoWithIcon from "./ui/info-with-icon";

type Props = {
  user: any
}
export default function ProfileBasicinformations({ user }: Props) {
  const age = user?.profile?.birthDate ? new Date().getFullYear() - new Date(user.profile.birthDate).getFullYear() : null;
  return <div className="p-4 with-border flex flex-col gap-4 rounded-lg w-full sm:row-span-1 lg:row-span-full">
    <h1 className="font-semibold capitalize mb-4">basic informations</h1>
    <InfoWithIcon title="Gender" content={user?.profile?.gender || "male"} icon={<Dna size={20} />} />
    <InfoWithIcon title="Birthday" content={new Date(user?.profile?.birthDate).toLocaleDateString("en-GB", { dateStyle: "long" }) || "n/a"} icon={<Cake size={20} />} />
    <InfoWithIcon title="Phone Number" content={user?.profile?.phoneNumber || "n/a"} icon={<Phone size={20} />} />
    <InfoWithIcon title="Email" content={user?.username} icon={<Mail size={20} />} />
    <InfoWithIcon title="Age" content={age !== null ? age + " years old" : "n/a"} icon={<BookUser size={20} />} />
    <InfoWithIcon title="Address" content={user?.profile?.address || "n/a"} icon={<MapPin size={20} />} />
  </div>
}