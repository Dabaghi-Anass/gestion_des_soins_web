import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { AppLogo } from "./logo"
import UserProfileBadge from "./User-profile-badge"
export default function NavBar() {
  return <>
    <nav className="flex justify-between items-center px-4 py-2 border-b border-secondary">
      <Link href="/">
        <AppLogo />
      </Link>
      <ul className="only-md-screen items-stretch gap-4">
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
      <UserProfileBadge className="only-md-screen" />
      <Sheet>
        <SheetTrigger className="only-small-screen">
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <UserProfileBadge />
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