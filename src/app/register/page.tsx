"use client";
import RegisterForm from "@/components/register-form";
import UserTypeSelector from "@/components/user-type-selector";
import { Role, User } from "@/types/types";
import { useState } from "react";
import { toast } from "sonner";
export default function RegisterPage() {
	const [currentComponentIndex, setCurrentComponentIndex] = useState<number>(1);
	const [user, setUser] = useState<User | null>({
																									username: "",
																									password: "",
																								});
	function handleNext(summary : string,message : string) {
		setCurrentComponentIndex((prev) => prev + 1);
		toast(summary, {
				description: message,
		})
	}
	const components = [
		<RegisterForm onNext={() => {
			handleNext("Account Created", "Account has been created and verified successfully")
		}} />,
		<UserTypeSelector
			onNext={(role : Role | undefined) => {
				if (!user || !role) return;
				setUser({ ...user, role : role.toString() })
				setCurrentComponentIndex(2)
			}}
			onBack={() => setCurrentComponentIndex(p => p - 1)}
		/>,
		<h1>hello world</h1>
	]
	return <main className='h-screen w-full flex flex-col gap-4 items-center md:p-8 md:max-w-50'>
		{components[currentComponentIndex]}
	</main>;
}