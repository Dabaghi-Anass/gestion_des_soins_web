"use client"
import { AppLogo } from "@/components/logo";
import WithToolTip from "@/components/ui/with-tooltip";
import { Activity, ArrowLeft, ArrowRight, Home, Sheet } from "lucide-react";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
export default function SideNav() {
  const [open, setOpen] = useState<boolean>(false)
  const path = usePathname();
  const authPage = path === "/login" || path === "/register";
  useEffect(() => {
    const open = localStorage.getItem("side-nav-open") === "true";
    setOpen(open);
  }, [])
  if (authPage) return null;
  return <aside className={`side-nav bg-primary-background border-r border-primary-200 ${open ? "w-[200px]" : "w-[68px]"} transition-all duration-300 h-full relative`}>
    <Button className="open-aside-btn w-8 p-2 rounded-full" variant="outline" onClick={() => {
      setOpen((prev: boolean) => {
        localStorage.setItem("side-nav-open", (!prev).toString())
        return !prev
      })
    }}>
      {open ? <ArrowLeft color="#888" /> : <ArrowRight color="#888" />}
    </Button>
    <nav className="flex flex-col gap-6 p-4">
      <Link href="/">
        <AppLogo navOpen={open} />
      </Link>
      <Link href="/">
        <WithToolTip description="home">
          <div className="mt-8 nav-link flex gap-4 items-center text-gray-400 hover:text-primary transition duration-300">
            <Home />
            {open && <div>home</div>}
          </div>
        </WithToolTip>
      </Link>
      <Link href="/">
        <WithToolTip description="activity">
          <div className="nav-link flex gap-4 items-center text-gray-400 hover:text-primary transition duration-300">
            <Activity />
            {open && <div>Activity</div>}
          </div>
        </WithToolTip>
      </Link>
      <Link href="/">
        <WithToolTip description="home">
          <div className="nav-link flex gap-4 items-center text-gray-400 hover:text-primary transition duration-300">
            <Sheet />
            {open && <div>home</div>}
          </div>
        </WithToolTip>
      </Link>
      <Link href="/">
        <WithToolTip description="home">
          <div className="nav-link flex gap-4 items-center text-gray-400 hover:text-primary transition duration-300">
            <Home />
            {open && <div>home</div>}
          </div>
        </WithToolTip>
      </Link>
    </nav>
  </aside>
}