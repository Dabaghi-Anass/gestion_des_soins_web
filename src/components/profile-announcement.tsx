import { FileType } from "@/types/types";
import Link from "next/link";
import FileDetails from "./ui/file-details";

export default function ProfileAnnouncement() {
  return <section className="flex flex-col w-full p-4 with-border rounded-lg gap-4 row-span-2 row-start-1">
    <h1 className="font-semibold mb-4">Documents</h1>
    <FileDetails title="anass-dabaghi.pdf" fileType={FileType.pdf} size={20} />
    <FileDetails title="anass-dabaghi.pdf" fileType={FileType.doc} size={20} />
    <FileDetails title="anass-dabaghi.pdf" fileType={FileType.pdf} size={20} />
    <FileDetails title="anass-dabaghi.pdf" fileType={FileType.doc} size={20} />
    <FileDetails title="anass-dabaghi.pdf" fileType={FileType.pdf} size={20} />
    <FileDetails title="anass-dabaghi.pdf" fileType={FileType.doc} size={20} />
    <FileDetails title="anass-dabaghi.pdf" fileType={FileType.pdf} size={20} />
    <FileDetails title="anass-dabaghi.pdf" fileType={FileType.doc} size={20} />
    <FileDetails title="anass-dabaghi.pdf" fileType={FileType.pdf} size={20} />
    <FileDetails title="anass-dabaghi.pdf" fileType={FileType.doc} size={20} />
    <Link href="/" className="z-[200] w-full text-center link">see all</Link>
  </section>
}
