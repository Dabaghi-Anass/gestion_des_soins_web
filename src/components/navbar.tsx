"use client"
import api from '@/api/api'
import Loading from "@/components/ui/loading"
import useAuth from "@/hooks/use-auth"
import { getRoleName } from '@/lib/utils/utils'
import { Moon, Sun } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from 'react'
import AppBreadCrump from './app-bread-crumb'
import { Button } from "./ui/button"
import UserProfileBadge from "./User-profile-badge"
export default function NavBar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false)
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const roles: {
    [key: string]: string | undefined
  } = {
    "DOCTOR": "medcine",
    "PATIENT": "patient",
    "CAREGIVER": "aid soignant",

  }
  const [links, setLinks] = useState([
    { path: "/home", label: "home" },
  ]);
  useEffect(() => {
    const dark = localStorage.getItem("dark") === "true";
    setDarkMode(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, [])
  useEffect(() => {
    let path = pathname;
    let pages = path.split("/");
    if (path === "/") pages = [""];
    const links = pages.map((page: string, index: number) => {
      return { path: pages.slice(0, index + 1).join("/") || "/", label: page || "acceuil" }
    })
    setLinks(prev => links)
  }, [pathname])
  const { user, lastLogin, pending } = useAuth({ redirectIfNull: !isAuthPage });
  if (pending) return <Loading />;
  const logout = async () => {
    localStorage.removeItem("x-auth");
    const logoutPromise = await api.logout();
    if (logoutPromise) {
      window.location.href = "/login";
    }
  }
  const toggleDarkMode = () => {
    setDarkMode(p => !p);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("dark", darkMode ? "false" : "true");
  }
  if (!user) return null;
  if (isAuthPage) return null;
  return <>
    <nav className="flex justify-between items-center px-4 border-b border-secondary bg-primary-background">
      <div className="hidden md:flex gap-4 h-full items-center">
        <AppBreadCrump links={links} />
      </div>
      <span className='flex md:hidden'></span>
      <div className="user-info flex gap-4 items-center">
        <Button onClick={toggleDarkMode} variant="ghost" className='p-0 aspect-square'>
          {!darkMode ? <Moon color='#aaa' /> : <Sun color='#fff' />}
        </Button>
        <div className="dark:bg-slate-700 bg-slate-200 w-[1px] self-stretch"></div>
        <div className="flex items-center py-3 gap-4 text-secondary-foreground">
          <UserProfileBadge lastLogin={lastLogin || 0} onLogout={logout} user={user || {
            username: "no user",
            password: "doctor",
          }} className="only-md-screen" />
          <div className="nav-user-name-displayer flex flex-col items-start">
            <span className="leading-tight capitalize font-bold">{user?.firstName} {user?.lastName}</span>
            <span className='leading-tight'><span className='lowercase'>{getRoleName(user?.role)}</span></span>
          </div>
        </div>
      </div>
    </nav>
  </>
}