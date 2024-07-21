"use client"
import { useAppSelector } from '@/hooks/redux-hooks';
import { usePathname, useRouter } from "next/navigation";
export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  function redirectToRegister() {
    if (!isAuthPage) router.push("/register")
  }
  const currentUser: any = useAppSelector((state) => state.UserReducer.user);
  const isFullyRegistred = (currentUser?.isVerified && currentUser?.profile?.imageUrl && currentUser?.profile?.address && currentUser?.role && currentUser?.username)

  if (!isFullyRegistred) {
    redirectToRegister();
  } else {
    if (currentUser.role === "DOCTOR" && currentUser?.specialities?.length == 0) redirectToRegister();
    else if (currentUser.role === "NURSE" && currentUser?.qualities?.length == 0) redirectToRegister();
  }
  return children;
}
