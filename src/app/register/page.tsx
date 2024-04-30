"use client";
import api from "@/api/api";
import ProfileForm from "@/components/finalize-profile";
import ProfileImageSelect from "@/components/image-select-form";
import RegisterForm from "@/components/register-form";
import Loading from "@/components/ui/loading";
import { StepProgress } from "@/components/ui/progress-steps";
import UserRoleDedicatedForm from "@/components/user-dedicated-form";
import UserTypeSelector from "@/components/user-type-selector";
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
	const [currentComponentIndex, setCurrentComponentIndex] = useState<number>(0); //starts from 1
	const [loading, setLoading] = useState<boolean>(false);
	const currentUser = useAppSelector((state: any) => state.UserReducer);
	const [user, setUser] = useState<any>(null);
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
			onNext={async (role: Role | undefined) => {
				if (!user || !role) return;
				const userFromDb = await api.updateUser({ id: user.id, role: role.toString() } as User)
				setUser((prev: any) => ({ ...userFromDb }))
				handleNext("Role Selected", "Role selected successfully")
			}}
			onBack={() => setCurrentComponentIndex(p => p - 1)}
		/>,
		<ProfileForm onNext={(profile: UserProfile) => {
			if (!user) return;
			profile = { ...profile, id: user?.profile?.id }
			setUser({ ...user, profile })
			handleUpdateProfile(profile);
			setCurrentComponentIndex(4)
		}} onBack={() => {
			setCurrentComponentIndex(p => p - 1)
		}} />,
		<ProfileImageSelect gender={true} onNext={(imageUrl) => {
			if (!user) return;
			setUser((prev: any) => ({ ...prev, profile: { ...prev.profile, imageUrl } }))
			handleUpdateProfile(user.profile);
			router.replace("/")
		}} onBack={() => {
			setCurrentComponentIndex(p => p - 1)
		}} />,
		<UserRoleDedicatedForm user={user?.role} onNext={(userInfo: any) => {

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
	useEffect(() => {
		if (!user) {
			setCurrentComponentIndex(1)
			return;
		}
		router.replace("/")
	}, [])
	return <main className='w-full flex flex-col gap-8 items-center md:px-8 md:py-2 md:max-w-50 bg-primary-background'>
		<StepProgress currentStep={currentComponentIndex} stepsCount={components.length} />
		{loading && <Loading />}
		{currentComponentIndex !== 0 && components[currentComponentIndex - 1]}
	</main>;
}