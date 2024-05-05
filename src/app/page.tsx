"use client"
import { useAppSelector } from "@/hooks/redux-hooks";
import { useRouter } from "next/navigation";
export default function Home() {
	const router = useRouter();
	const user: any = useAppSelector((state) => state.UserReducer.user);
	if (user?.role === "CAREGIVER") router.replace("/agendas")
	else router.replace("/calendrier")
	return <div className="w-full h-full grid place-content-center">Redirecting...</div>;
}
