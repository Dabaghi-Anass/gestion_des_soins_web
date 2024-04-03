
"use client"
import WithToolTip from "@/components/ui/with-tooltip";
import { Activity, FileText, Home, MessageCircle } from "lucide-react";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function SideNav() {
  const [open, setOpen] = useState<boolean>(false)
  const path = usePathname();
  const authPage = path === "/login" || path === "/register";
  if (authPage) return null;
  return <aside className={`bg-white border-r border-gray-200 ${open ? "w-[300px]" : "w-[68px]"} h-full`}>
    <nav className="flex flex-col gap-6 px-4 py-8">
      <Link href="/">
        <WithToolTip description="home">
          <Home className="text-gray-400 hover:text-primary transition duration-300" />
        </WithToolTip>
      </Link>
      <Link href="/doctors"><WithToolTip description="home">
        <Activity className="text-gray-400 hover:text-primary transition duration-300" />
      </WithToolTip>
      </Link>
      <Link href="/requests">
        <WithToolTip description="home">
          <MessageCircle className="text-gray-400 hover:text-primary transition duration-300" />
        </WithToolTip>
      </Link>
      <Link href="/documents">
        <WithToolTip description="home">
          <FileText className="text-gray-400 hover:text-primary transition duration-300" />
        </WithToolTip>
      </Link>
    </nav>
  </aside>
}