import { BookUser, Cake, Dna, Mail, MapPin, Phone } from "lucide-react";
import InfoWithIcon from "./ui/info-with-icon";
export default function ProfileBasicinformations() {
  // const currentUser = 
  return <div className="p-4 with-border flex flex-col gap-4 rounded-lg w-full sm:row-span-1 lg:row-span-full">
    <h1 className="font-semibold capitalize mb-4">basic informations</h1>
    <InfoWithIcon title="Gender" content="male" icon={<Dna size={20} color="#777" />} />
    <InfoWithIcon title="Birthday" content="male" icon={<Cake size={20} color="#777" />} />
    <InfoWithIcon title="Phone Number" content="male" icon={<Phone size={20} color="#777" />} />
    <InfoWithIcon title="Email" content="male" icon={<Mail size={20} color="#777" />} />
    <InfoWithIcon title="Age" content="male" icon={<BookUser size={20} color="#777" />} />
    <InfoWithIcon title="Address" content="male" icon={<MapPin size={20} color="#777" />} />
  </div>
}