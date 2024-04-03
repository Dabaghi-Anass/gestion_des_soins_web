"use client"
import api from '@/api/api'
import Loading from "@/components/ui/loading"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import useAuth from "@/hooks/use-auth"
import { Bell, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AppLogo } from "./logo"
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
  return <>
    <nav className="flex justify-between items-center px-4 border-b border-secondary ">
      <div className="flex gap-4 h-full">
        <AppLogo />
        {/* <Link href="/">
        </Link> */}
        <div className="bg-gray-200 w-[1px] self-stretch h-full"></div>
      </div>
      {/* <ul className="only-md-screen items-stretch gap-4">
        <li>
          <Link className="nav-link" href="/">home</Link>
        </li>
        <li>
          <Link className="nav-link" href="/">doctors</Link>
        </li>
        <li>
          <Link className="nav-link" href="/">requets</Link>
        </li>
        <li>
          <Link className="nav-link" href="/">document</Link>
        </li>
      </ul> */}
      <div className="user-info flex gap-4 only-lg-screen items-center">
        <Bell color="#ccc" />
        <div className="bg-gray-200 w-[1px] self-stretch"></div>
        <div className="flex items-center py-2 gap-4">
          <UserProfileBadge lastLogin={lastLogin || 0} onLogout={logout} user={user} className="only-md-screen" />
          <div className="nav-user-name-displayer flex flex-col items-start">
            <span className="leading-tight capitalize font-bold">{user.firstName} {user.lastName}</span>
            <span className='leading-tight'>as {user?.role?.startsWith("A") ? "an" : "a"} <span className='lowercase'>{user.role}</span></span>
          </div>
        </div>
      </div>
      <Sheet>
        <SheetTrigger className="only-small-screen">
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <UserProfileBadge lastLogin={lastLogin || 0} onLogout={logout} user={user} />
          <br />
          <SheetClose />
          <SheetTitle>Menu</SheetTitle>
          <ul className="flex flex-col gap-4">
            <li>
              <Link className="nav-link" href="/">home</Link>
            </li>
            <li>
              <Link className="nav-link" href="/">doctors</Link>
            </li>
            <li>
              <Link className="nav-link" href="/">requets</Link>
            </li>
            <li>
              <Link className="nav-link" href="/">document</Link>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  </>
}