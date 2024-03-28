"use client";
import ProfileForm from "@/components/finalize-profile";
import ProfileImageSelect from "@/components/image-select-form";
import RegisterForm from "@/components/register-form";
import { StepProgress } from "@/components/ui/progress-steps";
import UserTypeSelector from "@/components/user-type-selector";
import { RegisterUserFormData, Role, User, UserProfile } from "@/types/types";
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
		<RegisterForm onNext={(userData: RegisterUserFormData) => {
			if (!userData || !user) return;
			setUser({ ...user, ...userData });
			handleNext("Account Created", "Account has been created and verified successfully");
		}} />,
		<UserTypeSelector
			onNext={(role: Role | undefined) => {
				if (!user || !role) return;
				setUser({ ...user, role: role.toString() })
				setCurrentComponentIndex(p => p + 1)
			}}
			onBack={() => setCurrentComponentIndex(p => p - 1)}
		/>,
		<ProfileForm onNext={(profile: UserProfile) => {
			if (!user) return;
			setUser({ ...user, profile })
			handleNext("Profile Update", "Profile updated successfully")
		}} onBack={() => {
			setCurrentComponentIndex(p => p - 1)
		}} />,
		<ProfileImageSelect gender={true} onNext={(imageUrl) => {
			if (!user) return;
			const profile = { ...user.profile, imageUrl }
			setUser({ ...user, profile })
			handleSubmitUser();
		}} onBack={() => {
			setCurrentComponentIndex(p => p - 1)
		}} />,
	]
	function handleSubmitUser() {
		console.log(user)
	}
	return <main className='w-full flex flex-col gap-8 items-center md:px-8 md:py-2 md:max-w-50'>
		<StepProgress currentStep={currentComponentIndex} stepsCount={components.length} />
		{components[currentComponentIndex - 1]}
	</main>;
}