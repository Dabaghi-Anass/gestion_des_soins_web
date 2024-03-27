"use client";
import api from '@/api/api';
import Form from "@/components/form";
import { RegisterUserFormData, User } from "@/types/types";
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
					"Password must contain at least one number , one (Upper / Lower) Case Letter",
			})
			.nullish(),
		confirmPassword: z.string().nullish(),
	})

const RegisterSchema= NotRefinedRegisterSchema
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords Must Match",
		path: ["confirmPassword"],
	})
export default function RegisterPage() {
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [user, setUser] = useState<RegisterUserFormData>({});
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
		const { name, value } = e.target as HTMLInputElement;
		const userClone = { ...user };
		userClone[name] = value;
		setUser(userClone);
		if (name === "confirmPassword") {
			console.log(value, user.password)
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
	const handleSubmit = (data: any) => {
		const userDetails = validateFields(data);
		if(!userDetails) return;
		delete userDetails.confirmPassword;
		try {
			api.registerUser(userDetails as User);
		}catch(e) {
			console.error(e);
		}
	};
	return <div className='h-screen w-full flex flex-col gap-4 items-center p-8 mt-8'>
			<Form
				onSubmit={handleSubmit}
				className='flex w-100 flex-col gap-4 w-100'>
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
				{/* <Select name="gender" onValueChange={v => }>
					<SelectTrigger>
						<SelectValue placeholder='choisie votre sexe' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='male' className='p-2 cursor-pointer'>
							<SelectIcon>👨‍⚕️</SelectIcon>
							<span className='ml-4'>Male</span>
						</SelectItem>
						<SelectItem
							value='female'
							className='p-2 cursor-pointer'>
							<SelectIcon>👩‍⚕️</SelectIcon>
							<span className='ml-4'>Female</span>
						</SelectItem>
					</SelectContent>
				</Select> */}
				<Form.Button disabled={Object.keys(errors).length > 0 || Object.keys(user).length < 5}>Submit</Form.Button>
				<div className="mt-4">
					<span>do you already have an account ? </span>
					<Link className="link" href="/">go to login page</Link>
				</div>
			</Form>
		</div>;
}
