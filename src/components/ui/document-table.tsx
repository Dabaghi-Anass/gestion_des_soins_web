"use client"
import api from "@/api/api";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { toast } from "sonner";
import ConfirmActionModal from "../modals/confirm-action-modal";
import { Input } from "./input";
type Props = {
  data?: any;
  ownerId: string;
  inModal?: boolean;
  isCurrentUser?: boolean;
  onUpdate: (data: any[]) => void
}
export default function DocumentTable({ data, inModal, ownerId, onUpdate, isCurrentUser }: Props) {
  const [owner, setOwner] = useState<any>();
  const currentUser: any = useAppSelector(state => state.UserReducer.user);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<number | undefined>();
  async function fetchOwner() {
    if (isCurrentUser) {
      setOwner(currentUser)
    } else {
      let owner = await api.getUserById(+ownerId)
      if (owner) setOwner(owner)
    }
  }
  async function handleSubmitDocument() {
    setLoading(true)
    const fileRes = await api.uploadFile(+ownerId, uploadedFile)
    if (fileRes) {
      toast.success("document est ajouté avec succée")
      const newData = [...data, fileRes]
      onUpdate(newData)
      setUploadedFile(null)
    } else {
      toast.error("une erreur a été survenue")
    }
    setLoading(false)
  }
  async function handleDeleteDocument(id: number) {
    await api.deleteDocumentById(id);
    let newDocuments = [...data]
    newDocuments = newDocuments.filter((d: any) => d.id !== id);
    onUpdate(newDocuments);
  }
  useEffect(() => {
    fetchOwner()
  }, [])
  return <div className={`p-4 with-border flex flex-col gap-4 rounded-lg w-full h-fit sm:row-span-1 ${inModal ? "lg:col-span-3" : "lg:col-span-2"}`}>
    <ConfirmActionModal
      title={"supprimer document"}
      message={"confirmer la suppression de cette document"}
      open={modalOpen}
      onConfirm={() => {
        handleDeleteDocument(selectedDocument || 0)
        setModalOpen(false)
      }}
      onCancel={() => setModalOpen(false)}
    />
    <div className="max-h-10 flex gap-4 justify-end">
      {!uploadedFile ?
        <label htmlFor="fileToSend">
          <Input
            type="file"
            onChange={(e: any) => setUploadedFile(e?.target?.files?.[0] || null)}
            className="hidden"
            name="file"
            id="fileToSend" />
          <span className="btn text-white cursor-pointer">ajouter document</span>
        </label>
        : <>
          <span>{uploadedFile.name}</span>
          <Button
            onClick={() => setUploadedFile(null)}
          >annuler</Button>
          <Button
            onClick={handleSubmitDocument}>
            {loading ? <Loading type="bubbles" /> : "envoyer"}</Button>
        </>
      }
    </div>
    {data.length === 0 ?
      <h1 className="font-semibold capitalize mb-4 text-xl">aucune document pour le moment</h1>
      :
      <>
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
                {currentUser?.id === document?.creator?.id &&
                  <TableCell>
                    <Button size="sm" variant="destructive" onClick={() => {
                      setSelectedDocument(document?.id)
                      setModalOpen(true)
                    }
                    }>supprimer</Button>
                  </TableCell>
                }
              </TableRow>)
            }
          </TableBody>
        </Table>
      </>
    }
  </div>
}