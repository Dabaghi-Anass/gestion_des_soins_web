"use client";
import ProfileForm from "@/components/finalize-profile";
import RegisterForm from "@/components/register-form";
import { Progress } from "@/components/ui/progress";
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
	function handleNext(summary: string, message: string) {
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
			onNext={(role: Role | undefined) => {
				if (!user || !role) return;
				setUser({ ...user, role: role.toString() })
				setCurrentComponentIndex(2)
			}}
			onBack={() => setCurrentComponentIndex(p => p - 1)}
		/>,
		<ProfileForm onNext={() => { }} onBack={() => { }} />
	]
	return <main className='w-full flex flex-col gap-8 items-center md:px-8 md:py-2 md:max-w-50'>
		<div className="flex gap-4 w-[800px] p-8 items-center">
			<Progress value={(currentComponentIndex / components.length) * 100} />
			<span className="w-[100px] font-bold text-slate-500">{currentComponentIndex} / {components.length}</span>
		</div>
		{components[currentComponentIndex]}
	</main>;
}