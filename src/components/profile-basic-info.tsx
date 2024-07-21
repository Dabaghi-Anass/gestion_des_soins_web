"use client"
import { getGenderName } from "@/lib/utils/utils";
import { BookUser, Cake, Dna, Mail, MapPin, Phone } from "lucide-react";
import InfoWithIcon from "./ui/info-with-icon";
type Props = {
  user: any
}
export default function ProfileBasicinformations({ user }: Props) {
  const age = user?.profile?.birthDate ? new Date().getFullYear() - new Date(user.profile.birthDate).getFullYear() : null;
  return <div className="p-4 with-border flex flex-col gap-4 rounded-lg w-full sm:row-span-1 lg:row-span-full">
    <h1 className="font-semibold capitalize mb-4">informations</h1>
    <InfoWithIcon title="Sexe" content={getGenderName(user?.profile?.gender)} icon={<Dna size={20} />} />
    <InfoWithIcon title="Date De Naissance" content={new Date(user?.profile?.birthDate).toLocaleDateString("fr-FR", { dateStyle: "long" }) || "n/a"} icon={<Cake size={20} />} />
    <InfoWithIcon title="Numero de telephone" content={user?.profile?.phoneNumber || "n/a"} icon={<Phone size={20} />} />
    <InfoWithIcon title="email" content={user?.username} icon={<Mail size={20} />} />
    <InfoWithIcon title="age" content={age !== null ? age + " ans" : "n/a"} icon={<BookUser size={20} />} />
    <InfoWithIcon title="address" content={user?.profile?.address || "n/a"} icon={<MapPin size={20} />} />
  </div>
}