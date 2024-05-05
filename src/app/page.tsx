"use client"
import { useRouter } from "next/navigation";
export default function Home() {
	const router = useRouter();
	router.replace("/calendrier")
	return <div className="w-full h-full grid place-content-center">Redirecting...</div>;
}
