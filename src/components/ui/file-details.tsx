import { FileType } from "@/types/types";
import { CloudDownload, FileArchive, FileText, ScrollText } from "lucide-react";
import { Button } from "./button";
type Props = {
  title: string
  size: number
  fileType?: FileType
}
export default function FileDetails({ title, size, fileType }: Props) {
  let icon = <FileText size={30} />;
  switch (fileType) {
    case FileType.pdf:
      icon = <FileText size={30} />;
      break;
    case FileType.doc:
      icon = <ScrollText size={30} />;
      break;
    case FileType.zip:
      icon = <FileArchive size={30} />;
      break;
  }
  return <div className="flex gap-4 with-border rounded-lg p-2 items-center">
    <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
      {icon}
    </div>
    <div className="flex flex-col">
      <h1 className="text-slate-700 dark:text-slate-200">{title}</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">{size} mb</p>
    </div>
    <Button className="ml-auto text-gray-400 dark:text-gray-200 hover:bg-transparent" variant="ghost" size="sm">
      <CloudDownload />
    </Button>
  </div>
}