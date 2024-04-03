"use client";
import caregiverSvg from "@/assets/svgs/caregiver.svg";
import companionSvg from "@/assets/svgs/companion.svg";
import doctorSvg from "@/assets/svgs/doctor.svg";
import nurseSvg from "@/assets/svgs/nurse.svg";
import { useState } from "react";
// import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Role } from "@/types/types";
import Image from "next/image";
type Props = {
  onNext: (role: Role | undefined) => void;
  onBack: () => void;
}
export default function UserTypeSelector({ onBack, onNext }: Props) {
  const [selectedRole, setSelectedRole] = useState<Role>();
  return (
    <div className="w-full h-full flex flex-col items-center p-4 bg-white">
      <h1 className="text-4xl text-slate-800 font-semibold">t'est un ?</h1>
      <div className="roleImagesContainer grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 md:w-1/2 rounded-lg my-8 w-full">
        <div
          className={`user-type-container relative w-full flex items-center justify-center p-4 border border-primary rounded ${selectedRole === Role.Nurse ? "aria-selected" : ""
            }`}
          onClick={() => {
            setSelectedRole(Role.Nurse);
          }}
        >
          <Image alt="nurse" width={200} height={200} src={nurseSvg.src} />
          <div className="role-image-overlay">
            <h1 className="text-white text-xl font-semibold">Infermier</h1>
          </div>
        </div>
        <div
          className={`user-type-container relative w-full flex items-center justify-center p-4 border border-primary rounded ${selectedRole === Role.Doctor ? "aria-selected" : ""
            }`}
          onClick={() => {
            setSelectedRole(Role.Doctor);
          }}
        >
          <Image alt="doctor" width={200} height={200} src={doctorSvg.src} />
          <div className="role-image-overlay">
            <h1 className="text-white text-xl font-semibold">Medcine</h1>
          </div>
        </div>
        <div
          className={`user-type-container relative w-full flex items-center justify-center p-4 border border-primary rounded ${selectedRole === Role.Companion ? "aria-selected" : ""
            }`}
          onClick={() => {
            setSelectedRole(Role.Companion);
          }}
        >
          <Image alt="compagnion" width={200} height={200} src={companionSvg.src} />
          <div className="role-image-overlay">
            <h1 className="text-white text-xl font-semibold">Compagnion</h1>
          </div>
        </div>
        <div
          className={`user-type-container relative w-full flex items-center justify-center p-4 border border-primary rounded ${selectedRole === Role.CareGiver ? "aria-selected" : ""
            }`}
          onClick={() => {
            setSelectedRole(Role.CareGiver);
          }}
        >
          <Image alt="caregiver" width={200} height={200} src={caregiverSvg.src} />
          <div className="role-image-overlay">
            <h1 className="text-white text-xl font-semibold">Aide Soignant</h1>
          </div>
        </div>

      </div>
      <div className="flex gap-4 pb-8 mb-8">
        <Button variant="outline" onClick={onBack}>retourne</Button>
        <Button onClick={() => onNext(selectedRole)} disabled={!selectedRole}>suivant</Button>
      </div>
    </div>
  );
}
