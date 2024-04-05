"use client";
import api from "@/api/api";
import ProfileForm from "@/components/finalize-profile";
import ProfileImageSelect from "@/components/image-select-form";
import RegisterForm from "@/components/register-form";
import Loading from "@/components/ui/loading";
import { StepProgress } from "@/components/ui/progress-steps";
import UserTypeSelector from "@/components/user-type-selector";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RegisterUserFormData, Role, User, UserProfile } from "@/types/types";
import { OctagonAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function RegisterPage() {
	const router = useRouter()
	const [currentComponentIndex, setCurrentComponentIndex] = useState<number>(0); //starts from 1
	const [loading, setLoading] = useState<boolean>(false);
	const currentUser = useAppSelector((state: any) => state.UserReducer);
	const [user, setUser] = useState<User | null>(null);
	function handleNext(summary: string, message: string) {
		setCurrentComponentIndex((prev) => prev + 1);
		toast(summary, {
			description: message,
		})
	}
	const components = [
		<RegisterForm onNext={(userData: RegisterUserFormData) => {
			if (!userData) return;
			setUser(userData as User);
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
		<ProfileForm onNext={async (profile: UserProfile) => {
			if (!user) return;
			setUser({ ...user, profile })
			await handleUpdateProfile();
			// handleNext("Profile Update", "Profile updated successfully")
			setCurrentComponentIndex(4)
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
	async function handleSubmitUser() {
		setLoading(true)
		if (!user) return;
		//pick the profile and uid and role from user and then submit them
		const { profile, uid, role } = user;
		const userFromDb: any = await api.saveUserWithProfile({ profile, uid, role });
		if (userFromDb != null) {
			setUser({ ...userFromDb });
			window.location.replace("/")
		} else {
			toast("Profile Update Failed", {
				description: "Profile update failed please try again later",
				icon: <OctagonAlert />
			});
		}

		setLoading(false)
	}
	async function handleUpdateProfile() {
		setLoading(true)
		if (!user) return;
		//pick the profile and uid and role from user and then submit them
		const { profile, uid, role } = user;
		const userFromDb: any = await api.saveUserWithProfile({ profile, uid, role });
		if (userFromDb != null) {
			setUser({ ...userFromDb });
		} else {
			toast("Profile Update Failed", {
				description: "Profile update failed please try again later",
				icon: <OctagonAlert />
			});
		}
		setLoading(false)
	}
	useEffect(() => {
		if (!user) {
			setCurrentComponentIndex(1)
			return;
		}
		router.replace("/")
	}, [])
	return <main className='w-full flex flex-col gap-8 items-center md:px-8 md:py-2 md:max-w-50 bg-primary-foreground'>
		<StepProgress currentStep={currentComponentIndex} stepsCount={components.length} />
		{loading && <Loading />}
		{currentComponentIndex !== 0 && components[currentComponentIndex - 1]}
	</main>;
}