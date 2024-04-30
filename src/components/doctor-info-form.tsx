"use client";
import Form from "@/components/form";
import { useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";
import { ComboBox } from "./ui/combo-box";

const Schema = z
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

type DoctorFormProps = {
  user: any;
  formError: string | null;
  errors: Record<string, string>;
  onData?: (data: any) => void;
  onErrors: (errors: Record<string, string>) => void;
  onFormError: (error: any) => void;
}
const DoctorForm = ({ user, formError, onFormError }: DoctorFormProps) => {
  const [data, setData] = useState<string[]>([]);
  const [specValue, setSpecValue] = useState<string>("");
  function handleSubmit() { }
  function addSpec() {
    onFormError("");
    if (specValue?.length > 0) {
      setData((prev) => [...prev, specValue]);
      setSpecValue("");
    } else {
      onFormError("Please select a speciality");
    }
  }
  return <div className="h-screen w-full flex flex-col gap-4 items-center">
    {formError && <div className="form-error">{formError}</div>}
    <Form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 px-4 w-full max-w-xl md:min-w-[500px] relative'>
      <div className="flex gap-4 items-center">
        <ComboBox
          value={specValue}
          onChange={setSpecValue}
          placeholder="Select Specialitée"
          data={['cardiologue', 'dentiste', 'généraliste', 'pédiatre', 'psychiatre', 'urologue', 'gynécologue']}
        />
        <Button onClick={addSpec}>ajouter</Button>
      </div>
    </Form>
  </div>
}
export default DoctorForm;