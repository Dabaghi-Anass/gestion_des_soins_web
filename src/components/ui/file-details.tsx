import pdfIcon from "@/assets/svgs/pdf.svg";
import { CloudDownload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
type Props = {
  title: string
  url: string
  size: number
  fileType?: string
  creator?: any
  owner?: any
}
export default function FileDetails({ title, size, fileType, url, creator, owner }: Props) {
  return <div className="flex gap-4 with-border rounded-lg p-2 items-center w-full">
    <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
      <Image alt="pdf" width={30} height={80} src={pdfIcon.src} />
    </div>
    <div className="flex flex-col flex-shrink">
      <h1 className="text-slate-700 dark:text-slate-200 lg:max-w-[200px] max-w-[300px] truncate">{title}</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{size?.toFixed(2)} kb</p>
    </div>
    <Button className="ml-auto text-gray-400 dark:text-gray-200 hover:bg-transparent" variant="ghost" size="sm" asChild>
      <Link href={url} target="_blank" download>
        <CloudDownload />
      </Link>
    </Button>
  </div>
}