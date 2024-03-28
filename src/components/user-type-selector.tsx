"use client";
import { useState } from "react";
// import { toast } from "sonner";
import caregiverImage from "@/assets/images/aide-soignant.png";
import companionImage from "@/assets/images/companion.png";
import doctorImage from "@/assets/images/doctor.png";
import nurseImage from "@/assets/images/nurse.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
enum Role {
  Doctor = "DOCTOR",
  Nurse = "NURSE",
  CareGiver = "CAREGIVER",
  Companion = "COMPANION",
}

type Props = {
  onNext : (role:Role | undefined) => void;
  onBack : () => void;
}
export default function UserTypeSelector({onBack , onNext} : Props) {
  const [selectedRole, setSelectedRole] = useState<Role>();
  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-2xl my-4 text-slate-800 font-semibold">t'est un ?</h1>
      <div className="roleImagesContainer flex w-full h-[100%] overflow-hidden rounded-lg">
        <div
          className={`relative w-full ${
            selectedRole === Role.Nurse ? "aria-selected" : ""
          }`}
          onClick={() => {
            setSelectedRole(Role.Nurse);
          }}
        >
          <Image
            src={nurseImage.src}
            alt="nurse image"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
          <div className="role-image-overlay">
            <h1 className="text-white text-xl font-semibold">Nurse</h1>
          </div>
        </div>
        <div className="relative flex flex-col w-full h-full justify-center">
          <div
            className={`relative h-full ${
              selectedRole === Role.Companion ? "aria-selected" : ""
            }`}
            onClick={() => {
              setSelectedRole(Role.Companion);
            }}
          >
            <Image
              src={companionImage.src}
              alt="nurse image"
              width={200}
              height={200}
              className="object-cover w-full"
            />
            <div className="role-image-overlay">
              <h1 className="text-white text-xl font-semibold">Compagnion</h1>
            </div>
          </div>

          <div
            className={`relative h-full ${
              selectedRole === Role.CareGiver ? "aria-selected" : ""
            }`}
            onClick={() => {
              setSelectedRole(Role.CareGiver);
            }}
          >
            <Image
              src={caregiverImage.src}
              alt="nurse image"
              width={200}
              height={200}
              className="object-cover w-full"
            />
            <div className="role-image-overlay">
              <h1 className="text-white text-xl font-semibold">
                Aide-Soignant
              </h1>
            </div>
          </div>
        </div>
        <div
          className={`relative w-full ${
            selectedRole === Role.Doctor ? "aria-selected" : ""
          }`}
          onClick={() => {
            setSelectedRole(Role.Doctor);
          }}
        >
          <Image
            src={doctorImage.src}
            alt="nurse image"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />

          <div className="role-image-overlay">
            <h1 className="text-white text-xl font-semibold">Doctor</h1>
          </div>
        </div>
      </div>
      <div className="flex gap-4 my-4">
        <Button variant="outline" onClick={onBack}>retourne</Button>
        <Button onClick={() => onNext(selectedRole)}>suivant</Button>
      </div>
    </div>
  );
}
