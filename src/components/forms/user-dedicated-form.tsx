"use client";
import { useEffect, useState } from "react";
import DoctorForm from "./doctor-info-form";
import NurseForm from "./nurse-info-form";


type Props = {
  onNext: (data: any) => void;
  onBack: () => void;
  onSkip: () => void;
  user: any;
}
export default function UserRoleDedicatedForm({ user, onNext, onBack, onSkip }: Props) {
  const [formError, setFormError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (user?.specialities?.length || user?.qualities?.length) onSkip()
    else if (user.role === "CAREGIVER") onSkip()
  }, [user])
  const userAbbr =
    `${user.profile.gender === "MALE" ? "mr" : "mlle"} ${user.firstName} ${user.lastName}`
  return <section className="flex flex-col items-center w-full ">
    {user.role === "DOCTOR" ?
      <h1 className="md:text-3xl mb-8 capitalize">
        Quelle sont votre spéciality {userAbbr}
      </h1> : user.role === "NURSE" ?
        <h1 className="md:text-3xl mb-8 capitalize">
          Quelle sont votre qualités {userAbbr}
        </h1> : null
    }
    <div className="h-screen w-full flex flex-col gap-4 items-center">
      {user.role === "DOCTOR" ?
        <DoctorForm
          user={user}
          formError={formError}
          errors={errors}
          onData={onNext}
          onErrors={setErrors}
          onFormError={setFormError} />
        : user.role === "NURSE" ?
          <NurseForm
            user={user}
            formError={formError}
            errors={errors}
            onData={onNext}
            onErrors={setErrors}
            onFormError={setFormError} /> : null
      }
    </div>
  </section >
}
