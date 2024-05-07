import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import FileDetails from "./ui/file-details";
import Loading from "./ui/loading";
export default function ProfileAnnouncement({ user }: { user: any }) {
  const { data, isLoading } = useQuery({
    queryKey: ["get-documents", user?.id],
    queryFn: async ({ queryKey }) => await api.getUserDocuments(queryKey[1]),
  })
  if (!data) return <Loading />
  return <section className="flex flex-col w-full p-4 with-border rounded-lg gap-4 row-span-2 row-start-1 justify-between">
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-semibold mb-4">Documents</h1>
      {data?.map((doc: any) =>
        <FileDetails
          key={doc.id}
          title={doc.originalName}
          fileType={doc.contentType}
          owner={doc.owner}
          creator={doc.creator}
          size={doc.size}
          url={doc.url}
        />)
      }
    </div>
    <Link href={`/documents/${user?.id}`} className="z-[10] w-full text-center link">see all</Link>
  </section>
}
