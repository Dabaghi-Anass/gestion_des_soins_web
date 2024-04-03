"use client";
import api from '@/api/api';
import bgImage from "@/assets/svgs/security.svg";
import Form from "@/components/form";
import Loading from "@/components/ui/loading";
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { setCurrentUser } from "@/lib/features/user-reducer";
import { RegisterUserFormData, User } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
const RegisterSchema = z
	.object({
		username: z
			.string()
			.email({ message: "Invalid email address" })
			.nullish(),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" })
			.nullish(),
	})

export default function LoginPage() {
	const [formError, setFormError] = useState<string | null>(null)
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [user, setUser] = useState<RegisterUserFormData>({});
	const [loading, setLoading] = useState<boolean>(false);
	const currentUser = useAppSelector((state: any) => state.UserReducer.user)
	const router = useRouter();
	const dispatch = useAppDispatch();
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
		} else {
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
			if (!user.password) setUser({ ...user, password: "" })
			const isValid = value === user.password;
			if (!isValid) {
				setErrors(prev => ({ ...prev, [name]: "Passwords Must Match" }));
			} else {
				const errorsCopy = { ...errors };
				delete errorsCopy[name];
				setErrors(errorsCopy);
			}
		} else {
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
	}
	const handleSubmit = async (data: any) => {
		const userDetails: any = validateFields(data);
		if (!userDetails) return;
		setFormError(null)
		setLoading(true);
		userDetails.username = userDetails?.username?.trim();
		try {
			const response = await api.loginUser(userDetails as User);
			if (response === null) throw new Error("An error occurred while login Please try again Later")
			if (response.done) {
				setUser(prev => ({ ...prev, ...response }));
				dispatch(setCurrentUser(response))
				localStorage.setItem("x-auth", response.token);
				if (!response.role || !response.profile || !response.isVerified) router.push("/register")
				else router.push("/")
			} else {
				setFormError(response.message)
			}
		} catch (fetchingError: any) {
			setFormError(fetchingError.message)
		}
		setLoading(false);
	};
	useEffect(() => {
		if (!currentUser) return;
		if (!currentUser.role || !currentUser.profile) router.push("/register")
		router.replace("/")
	}, [currentUser])
	return <section className="flex justify-center items-center w-full h-full bg-white">
		<div className="w-full h-full hidden lg:flex  flex-col items-center gap-2 justify-center filter">
			<h1 className='text-slate-800 text-2xl font-semibold'>Accéder a votre Compte</h1>
			<p className='text-slate-600'>toutes vos donées sont bien securisé</p>
			<Image src={bgImage.src} alt="register image" className="" width={500} height={500} />
		</div>
		<div className="h-screen w-full flex flex-col gap-4 items-center justify-center">
			{formError && <div className="text-red-600 text-center py-2 px-2 w-full rounded flex items-center justify-center gap-2 text-2xl">{formError}</div>}
			<Form
				onSubmit={handleSubmit}
				className='flex flex-col gap-4 p-4 w-full max-w-xl md:min-w-[500px] relative'>
				{loading && <Loading />}
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
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleSubmit(user)
						}
					}}
				/>
				<Form.Button disabled={Object.keys(errors).length > 0}>Submit</Form.Button>
				<div className="mt-4 text-center">
					<div>tu n'as pas un compte ?</div>
					<Link className="link text-sm" href="/register">créer un compte</Link>
				</div>
			</Form>
		</div>
	</section>
}
