"use client";
import Form from "@/components/form";
import { useState } from "react";
import { z } from "zod";

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
  const [data, setData] = useState<any>();
  const validateFields = (data: any) => {
    setData(data);
    const validationObj = RegisterSchema.safeParse(data);
    if (!validationObj.success) {
      const errors: {
        [key: string]: string;
      } = {}
      for (let error of validationObj.error.errors) {
        let path: string = error.path[0] as string;
        errors[path] = error.message;
      }
      setErrors(errors);
      return null;
    } else {
      setErrors({});
      return validationObj.data;
    }
  }
  const validateField = (e: React.ChangeEvent) => {
    setFormError(null)
    const { name, value } = e.target as HTMLInputElement;
    const dataClone = { ...data };
    dataClone[name] = value;
    setData(dataClone);
    const schema = RegisterSchema.pick({ [name]: true });
    const validationObj = schema.safeParse({ [name]: value });
    if (!validationObj.success) {
      const errors: {
        [key: string]: string;
      } = {}
      for (let error of validationObj.error.issues) {
        let path: string = error.path[0] as string;
        errors[path] = error.message;
      }
      setErrors(prev => ({ ...prev, ...errors }));
    } else {
      const errorsCopy = { ...errors };
      delete errorsCopy[name];
      setErrors(errorsCopy);
    }
  }
  const handleSubmit = async (data: any) => {
    onNext(data);
  };
  return <section className="flex flex-col items-center w-full ">
    <h1 className="md:text-3xl mb-8">Dites-nous en plus à propos de vous</h1>
    <div className="h-screen w-full flex flex-col gap-4 items-center">
      {formError && <div className="form-error">{formError}</div>}
      <Form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 px-4 w-full max-w-xl md:min-w-[500px] relative'>
        <Form.Input
          onChange={validateField}
          error={errors.phoneNumber}
          name='phoneNumber'
          placeholder='entrer votre numero de telephone'
          label="Phone Number"
        />
        <Form.Button onClick={handleSubmit} disabled={Object.keys(errors).length > 0}>Save Profile</Form.Button>
        <Form.Button onClick={onBack} variant="outline">retourne</Form.Button>
      </Form>
    </div>
  </section >
}
