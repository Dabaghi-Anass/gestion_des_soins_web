"use client"
import api from '@/api/api'
import Loading from "@/components/ui/loading"
import useAuth from "@/hooks/use-auth"
import { Bell } from "lucide-react"
import { usePathname } from "next/navigation"
import AppBreadCrump from './app-bread-crumb'
import UserProfileBadge from "./User-profile-badge"
export default function NavBar() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const { user, lastLogin, pending } = useAuth({ redirectIfNull: !isAuthPage });
  if (pending) return <Loading />;
  const logout = async () => {
    localStorage.removeItem("x-auth");
    const logoutPromise = await api.logout();
    if (logoutPromise) {
      window.location.href = "/login";
    }
  }
  if (!user) return null;
  if (isAuthPage) return null;
  const links = [
    { path: "/home/anass", label: "home" },
    { path: "/home/profile", label: "profile" },
    { path: "/home/changeProfile", label: "edit", active: true },
  ]
  return <>
    <nav className="flex justify-between items-center px-4 border-b border-secondary">
      <div className="flex gap-4 h-full items-center">
        <AppBreadCrump links={links} />
      </div>
      <div className="user-info flex gap-4 items-center">
        <Bell color="#ccc" />
        <div className="bg-gray-200 w-[1px] self-stretch"></div>
        <div className="flex items-center py-3 gap-4">
          <UserProfileBadge lastLogin={lastLogin || 0} onLogout={logout} user={user} className="only-md-screen" />
          <div className="nav-user-name-displayer flex flex-col items-start">
            <span className="leading-tight capitalize font-bold">{user.firstName} {user.lastName}</span>
            <span className='leading-tight'>as {user?.role?.startsWith("A") ? "an" : "a"} <span className='lowercase'>{user.role}</span></span>
          </div>
        </div>
      </div>
    </nav>
  </>
}