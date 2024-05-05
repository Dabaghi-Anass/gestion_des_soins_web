"use client"
import { AppLogo } from "@/components/logo";
import WithToolTip from "@/components/ui/with-tooltip";
import { useAppSelector } from "@/hooks/redux-hooks";
import { Activity, ArrowLeft, ArrowRight, CalendarClock, MessageSquareDot, Sheet, User } from "lucide-react";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
export default function SideNav() {
  const [open, setOpen] = useState<boolean>(false)
  const path = usePathname();
  const currentUser: any = useAppSelector((state) => state.UserReducer.user);
  const authPage = path === "/login" || path === "/register";
  useEffect(() => {
    const open = localStorage.getItem("side-nav-open") === "true";
    setOpen(open);
  }, [])
  if (authPage) return null;
  return <aside className={`side-nav bg-primary-background border-r border-primary-200 ${open ? "w-[250px]" : "w-[68px]"} transition-all duration-300 h-full relative`}>
    <Button className="open-aside-btn w-8 p-2 rounded-full" variant="outline" onClick={() => {
      setOpen((prev: boolean) => {
        localStorage.setItem("side-nav-open", (!prev).toString())
        return !prev
      })
    }}>
      {open ? <ArrowLeft color="#888" /> : <ArrowRight color="#888" />}
    </Button>
    <nav className="flex flex-col gap-8 p-4">
      <Link href="/">
        <AppLogo navOpen={open} />
      </Link>
      {currentUser?.role === "CAREGIVER" ?
        <>
          <Link href="/activities">
            <WithToolTip description="activity">
              <div className="nav-link flex gap-4 items-center text-gray-400 hover:text-primary transition duration-300">
                <Activity />
                {open && <div>Activitées</div>}
              </div>
            </WithToolTip>
          </Link>
          <Link href="/agendas">
            <WithToolTip description="calendrier des activitées">
              <div className="nav-link flex gap-4 items-center text-gray-400 hover:text-primary transition duration-300">
                <Sheet />
                {open && <div>Calendrier</div>}
              </div>
            </WithToolTip>
          </Link>
        </> :
        <Link href="/calendrier">
          <WithToolTip description="calendrier des rendez vous">
            <div className="nav-link flex gap-4 items-center text-gray-400 hover:text-primary transition duration-300">
              <Sheet />
              {open && <div>Calendrier</div>}
            </div>
          </WithToolTip>
        </Link>

      }
      <Link href="/profile">
        <WithToolTip description="profile">
          <div className="nav-link flex gap-4 items-center text-gray-400 hover:text-primary transition duration-300">
            <User />
            {open && <div>Profile</div>}
          </div>
        </WithToolTip>
      </Link>
      {!(currentUser?.role === "CAREGIVER") && <>
        <Link href="/requestes">
          <WithToolTip description="requestes de traitement">
            <div className="nav-link flex gap-4 items-center text-gray-400 hover:text-primary transition duration-300">
              <MessageSquareDot />
              {open && <div>Traitments</div>}
            </div>
          </WithToolTip>
        </Link>
        <Link href="/appointments">
          <WithToolTip description="les demandes de rendez-vous">
            <div className="nav-link flex gap-4 items-center text-gray-400 hover:text-primary transition duration-300">
              <CalendarClock />
              {open && <div>Rendez-vous</div>}
            </div>
          </WithToolTip>
        </Link>
      </>
      }
    </nav>
  </aside>
}
