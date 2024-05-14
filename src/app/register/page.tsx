"use client";
import api from "@/api/api";
import ProfileForm from "@/components/forms/finalize-profile";
import ProfileImageSelect from "@/components/forms/image-select-form";
import RegisterForm from "@/components/forms/register-form";
import UserRoleDedicatedForm from "@/components/forms/user-dedicated-form";
import UserTypeSelector from "@/components/forms/user-type-selector";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { StepProgress } from "@/components/ui/progress-steps";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RegisterUserFormData, Role, User, UserProfile } from "@/types/types";
import { OctagonAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import {
	useEffect,
	useState
} from "react";
import { toast } from "sonner";
export default function RegisterPage() {
	const router = useRouter()
	const [currentComponentIndex, setCurrentComponentIndex] = useState<number>(1); //starts from 1
	const [loading, setLoading] = useState<boolean>(false);
	const currentUser = useAppSelector((state: any) => state.UserReducer.user);
	const [user, setUser] = useState<any>(currentUser);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	function handleNext(summary: string, message: string) {
		setCurrentComponentIndex((prev) => prev + 1);
		toast(summary, {
			description: message,
		})
	}
	const components = [
		<RegisterForm
			onSkip={() => setCurrentComponentIndex(2)}
			onNext={(userData: RegisterUserFormData) => {
				if (!userData) return;
				setUser(userData as User);
				setCurrentComponentIndex(2);
			}} />,
		<UserTypeSelector
			onSkip={() => setCurrentComponentIndex(3)}
			role={user?.role}
			onNext={async (role: Role | undefined) => {
				if (!user?.id || !role) return;
				const userFromDb = await api.initUserRole({
					id: user.id,
					role: role.toString()
				} as User)
				setUser((prev: any) => ({ ...userFromDb }))
				setCurrentComponentIndex(3);
			}}
			onBack={() => setCurrentComponentIndex(p => p - 1)}
		/>,
		<ProfileForm
			profile={user?.profile}
			onSkip={() => setCurrentComponentIndex(4)}
			onNext={(profile: UserProfile) => {
				if (!user) return;
				profile = { ...profile, id: user?.profile?.id }
				handleUpdateProfile(profile);
				setUser({ ...user, profile })
				setCurrentComponentIndex(4)
			}} onBack={() => {
				setCurrentComponentIndex(p => p - 1)
			}} />,
		<ProfileImageSelect
			imageUrl={imageUrl}
			onImage={setImageUrl}
			onSkip={() => setCurrentComponentIndex(5)}
			user={user}
			onNext={(imageUrl) => {
				if (!user) return;
				setUser((prev: any) => ({ ...prev, profile: { ...prev.profile, imageUrl } }))
				handleUpdateProfile({ ...user.profile, imageUrl });
				setCurrentComponentIndex(5)
			}} onBack={() => {
				setCurrentComponentIndex(p => p - 1)
			}} />,
		<UserRoleDedicatedForm
			user={user}
			onSkip={() => window.location.replace("/")}
			onNext={(userInfo: any) => {
				if (!userInfo) return;
				window.location.replace("/")
			}} onBack={() => {
				setCurrentComponentIndex(p => p - 1)
			}} />
	]
	async function handleUpdateProfile(profile: UserProfile) {
		if (profile.id) {
			setLoading(true)
			const profileFromDB: any = await api.updateProfile(profile);
			if (profileFromDB != null) {
				setUser((prev: any) => ({ ...prev, profile: { ...prev.profile, ...profileFromDB } }));
			} else {
				toast("Profile Update Failed", {
					description: "Profile update failed please try again later",
					icon: <OctagonAlert />
				});
			}
			setLoading(false)
		}
	}
	const specifity = user?.role === "DOCTOR" ? user?.specialities?.length : user?.role === "NURSE" ? user?.qualities?.length : false;
	const component = (!user?.profile?.imageUrl || !user?.profile?.address || !user?.role || !user?.username || !specifity) ?
		currentComponentIndex !== 0 && components[currentComponentIndex - 1] :
		<div className='text-xl h-full'>loading...</div>

	useEffect(() => {
		document.documentElement.style.setProperty("--nav-height", "0");
		const isFullyRegistred = (user?.profile?.imageUrl && user?.profile?.address && user?.role && user?.username)
		if (isFullyRegistred) {
			if (user.role === "DOCTOR" && user?.specialities?.length) window.location.replace("/")
			else if (user.role === "NURSE" && user?.qualities?.length) window.location.replace("/")
			else if (user.role === "CAREGIVER") window.location.replace("/")
		}
	}, [user])
	return <main className='w-full flex flex-col gap-8 items-center md:px-8 md:py-2 md:max-w-50 bg-primary-background'>
		<div className="flex items-center justify-center gap-4 w-full">
			<StepProgress currentStep={currentComponentIndex} stepsCount={components.length} />
			{currentUser &&
				<Button onClick={async () => {
					await api.logout()
				}} type='button' className="text-sm" variant="destructive">Se deconnecter</Button>
			}
		</div>
		{loading && <Loading />}
		{component}
	</main>;
}