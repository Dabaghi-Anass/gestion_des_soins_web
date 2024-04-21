import Link from "next/link";
import { Button } from "./button";

export default function DataNotFound() {
  return <div className="flex h-full w-full flex-col gap-4 justify-center items-center text-2xl">
    <span>404! data not found</span>
    <div className="flex gap-4">
      <Button asChild variant="outline">
        <Link href="javascript:history.go(-1)">retourne a la page precedent</Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/">retourne a l'acceuil</Link>
      </Button></div>
  </div>
}