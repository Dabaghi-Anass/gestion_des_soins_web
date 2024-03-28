"use client";
import api from '@/api/api';
import bgImage from "@/assets/images/Mobile.svg";
import Form from "@/components/form";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { RegisterUserFormData, User } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
const NotRefinedRegisterSchema= z
	.object({
		firstName: z
			.string()
			.min(3, {
				message: "First name must be at least 3 characters long",
			})
			.max(50, {
				message: "First name must be at most 50 characters long",
			}),
		lastName: z
			.string()
			.min(3, { message: "Last name must be at least 3 characters long" })
			.max(50, {
				message: "Last name must be at most 50 characters long",
			})
			.nullish(),
		username: z
			.string()
			.email({ message: "Invalid email address" })
			.nullish(),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" })
			._addCheck({
				kind: "regex",
				regex: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
				message:
					"Password must contain at least one number one (Upper / Lower) Case Letter (8 characters long)",
			})
			.nullish(),
		confirmPassword: z.string().nullish(),
	})

const RegisterSchema= NotRefinedRegisterSchema
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords Must Match",
		path: ["confirmPassword"],
	})
type Props = {
    onNext: () => void;
};

export default function RegisterForm({onNext}: Props) {
    const [formError , setFormError] = useState<string | null>(null)
	const [emailVerificationMessage , setEmailVerificationMessage] = useState<string>("A verification link has been sent to your email address please visit it and return")
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [user, setUser] = useState<RegisterUserFormData>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [showEmailToast, setShowEmailToast] = useState<boolean>(false);
    const validateFields = (data: any) => {
		setUser(data)
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
		}else {
			setErrors({});
			return validationObj.data;
		}
	}
	const validateField = (e: React.ChangeEvent) => {
		setFormError(null)
		const { name, value } = e.target as HTMLInputElement;
		const userClone = { ...user };
		userClone[name] = value;
		setUser(userClone);
		if (name === "confirmPassword") {
			if(!user.password) setUser({...user, password: ""})
			const isValid = value === user.password;
			if (!isValid) {
				setErrors(prev => ({...prev, [name]: "Passwords Must Match"}));
			} else {
				const errorsCopy = { ...errors };
				delete errorsCopy[name];
				setErrors(errorsCopy);
			}
		} else {
			const schema = NotRefinedRegisterSchema.pick({[name]: true});
			const validationObj = schema.safeParse({ [name]: value });
			if (!validationObj.success) {
				const errors: {
					[key: string]: string;
				} = {}
				for (let error of validationObj.error.issues) {
					let path: string = error.path[0] as string;
					errors[path] = error.message;
				}
				setErrors(prev => ({...prev, ...errors}));
			} else {
				const errorsCopy = { ...errors };
				delete errorsCopy[name];
				setErrors(errorsCopy);
			}
		}
	}
	const handleSubmit = async (data: any) => {
		const userDetails : any = validateFields(data);
		if (!userDetails) return;
		setFormError(null)
		setLoading(true);
		delete userDetails.confirmPassword;
		userDetails.username = userDetails?.username?.trim();
		userDetails.firstName = userDetails?.firstName?.trim();
		userDetails.lastName = userDetails?.lastName?.trim();
		try {
			const response = await api.registerUser(userDetails as User);
			if (response.done) {
				setShowEmailToast(true)
				localStorage.setItem("x-auth", response.token);
			}
			else {
				setFormError(response.message)
			}
		}catch(fetchingError : any) {
			setFormError("An error occurred while registering Please try again Later : " + fetchingError.message)
		}
		setLoading(false);
	};
	async function handleConfirmEmail() {
		setLoading(true);
		setFormError(null)
		const registred = await api.isUserRegistred()
		if (!registred) {
			setLoading(false);
			return;
		}
		if (!registred.done) {
			setEmailVerificationMessage(registred.message ?? "User Not Verified")
		} else if(registred.done){
			setEmailVerificationMessage(registred.message ?? "Email Verified Succefully")
			onNext();
		}
		setLoading(false);
	}
	return <section className="flex justify-between w-full">
		<div className="w-full h-full hidden lg:flex  flex-col items-center gap-2 justify-center filter hue-rotate-[140deg]">
			<h1 className='text-slate-800 text-2xl font-semibold'>Créer Un Compte</h1>
			<p className='text-slate-600 mb-8'>toutes vos donées sont bien securisé</p>
			<Image src={bgImage.src} alt="register image" className=""  width={500} height={500} />
		</div>
		<div className="h-screen w-full flex flex-col gap-4 items-center justify-center">
        {formError && <div className="text-red-600 text-center py-2 px-2 w-full rounded flex items-center justify-center gap-2 text-2xl">{formError}</div>}
			<Form
				onSubmit={handleSubmit}
				className='flex flex-col gap-4 p-4 w-100 md:min-w-[500px] relative'>
				{loading && <Loading />}
			{showEmailToast && <div className="absolute text-green-600 bg-primary-foreground text-center py-2 px-2 w-full rounded text-sm flex flex-col items-center justify-center gap-4 inset-0 border border-green-600 font-bold z-0">{emailVerificationMessage}
			<Button onClick={handleConfirmEmail} type='button' className="text-sm" variant="outline">I confirmed My Email</Button>
			<Button onClick={() => {
				setShowEmailToast(false)
			}} className="text-sm" variant="secondary" type='reset'>Cancel</Button>
			</div>}
				<Form.Input
					onChange={validateField}
					error={errors.firstName}
					name='firstName'
					placeholder='enter your first name'
					label="First Name"
				/>
				<Form.Input
					onChange={validateField}
					error={errors.lastName}
					name='lastName'
					placeholder='enter your last name'
					label="Last Name"
				/>
				<Form.Input
					onChange={validateField}
					error={errors.username}
					type='email'
					name='username'
					label="Email"
					placeholder='enter your email'
				/>
				<Form.Input
					onChange={validateField}
					error={errors.password}
					name='password'
					type='password'
					label="Password"
					placeholder='enter your password'
					/>
				<Form.Input
					onChange={validateField}
					error={errors.confirmPassword}
					name='confirmPassword'
					type='password'
					label="Confirm Password"
					placeholder='enter your password'
				/>
				<Form.Button disabled={Object.keys(errors).length > 0}>Submit</Form.Button>
				<div className="mt-4 text-center">
					<div>do you already have an account ? </div>
					<Link className="link text-sm" href="/">go to login page</Link>
				</div>
			</Form>
    </div>
	</section>
}