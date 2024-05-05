import { cn } from "@/lib/utils";
import Image from "next/image";
export function AppLogo({ className, navOpen = false }: { className?: string, navOpen?: boolean }) {
	return (
		<div className={cn("flex items-center gap-4", className)}>
			<Image src="/logo.svg" alt="SOINS" width={50} height={50} />
		</div>
	);
}