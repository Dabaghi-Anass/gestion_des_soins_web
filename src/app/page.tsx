"use client"
import { useAppSelector } from "@/hooks/redux-hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
	const router = useRouter();
	const user: any = useAppSelector((state) => state.UserReducer.user);
	useEffect(() => {
		if (user?.role === "CAREGIVER") router.replace("/agendas")
		else router.replace("/calendrier")
	}, [user])
	return <div className="w-full h-full grid place-content-center">Redirecting...</div>;
}
