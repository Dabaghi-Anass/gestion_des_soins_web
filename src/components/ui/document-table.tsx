"use client"
import api from "@/api/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useAppSelector } from "@/hooks/redux-hooks";
import Link from "next/link";
type Props = {
  data?: any;
  inModal?: boolean;
  isCurrentUser?: boolean;
}
export default function DocumentTable({ data, inModal, isCurrentUser }: Props) {
  let owner = data?.[0]?.owner;
  if (isCurrentUser) owner = useAppSelector(state => state.UserReducer.user)
  return <div className={`p-4 with-border flex flex-col gap-4 rounded-lg w-full h-fit sm:row-span-1 ${inModal ? "lg:col-span-3" : "lg:col-span-2"}`}>
    <h1 className="font-semibold capitalize mb-4 text-xl">les documents de {owner?.firstName} {owner?.lastName}</h1>
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Intitulé</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Crée Le</TableHead>
          <TableHead>ِCreateur</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((document: any) =>
          <TableRow key={document.id} className="hover:filter hover:brightness-90">
            <TableCell>{document.originalName}</TableCell>
            <TableCell>{document.name}</TableCell>
            <TableCell>{new Date(document.creationDate).toLocaleDateString("fr-FR")}</TableCell>
            <TableCell>
              <Link href={`/profile/${document.creator.id}`} className="link">
                {document.creator.firstName} {document.creator.lastName}
              </Link>
            </TableCell>
            <TableCell>
              <Link href={api.getUrlFromPath(document.url)} download target="_blank" className="link">
                telecharger
              </Link>
            </TableCell>
          </TableRow>)
        }
      </TableBody>
    </Table>
  </div>
}