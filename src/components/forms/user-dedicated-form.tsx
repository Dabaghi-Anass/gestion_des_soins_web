"use client";
import { useState } from "react";
import { z } from "zod";
import DoctorForm from "./doctor-info-form";
import NurseForm from "./nurse-info-form";

const RegisterSchema = z
  .object({
    birthDate: z.string().datetime({
      message: "Invalid date format",
    }),
    phoneNumber: z
      .string()
      .min(5, { message: "Phone Number must be at least 5 characters long" })
      .max(50, {
        message: "Phone Number must be at most 50 characters long",
      })
      .regex(/^[+,0-9]*$/, { message: "Phone Number Must Contain numbers only" })
      .nullish(),
    address: z
      .string()
      .optional().nullish(),
  })

type Props = {
  onNext: (data: any) => void;
  onBack: () => void;
  user: any;
}
export default function UserRoleDedicatedForm({ user, onNext, onBack }: Props) {
  const [formError, setFormError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({});
  if (user.role === "CAREGIVER") onNext({ role: user.role })
  if (user.specialities || user.qualities) onNext({ role: user.role })
  const userAbbr = `${user.profile.gender === "MALE" ? "mr" : "mlle"} ${user.firstName} ${user.lastName}`
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
          onData={(data) => {
            onNext(data);
          }}
          onErrors={setErrors}
          onFormError={setFormError} />
        : user.role === "NURSE" ?
          <NurseForm
            user={user}
            formError={formError}
            errors={errors}
            onData={(data) => {
              onNext(data);
            }}
            onErrors={setErrors}
            onFormError={setFormError} /> : null
      }
    </div>
  </section >
}
