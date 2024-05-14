"use client"
import api from "@/api/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateAgeFromBirtDate, getBadgeStyle } from "@/lib/utils/utils";
import html2pdf from "html2pdf.js";
import NextImage from "next/image";
import { useEffect } from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import { toast } from "sonner";
import { Button } from "./button";
import DataNotFound from "./data-not-found";
type Props = {
  treatment: any,
}
export default function TreatmentDetails({ treatment }: Props) {
  function printDocument() {
    const element = document.getElementById('printable') as HTMLElement;
    if (!element) return;
    let oldWidth = element.style.width;
    element.style.width = "100%";
    let dark = false;
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.toggle("dark", false);
      dark = true;
    }
    let fileName = `treatment-${treatment.sentTo.firstName}-${Date.now()}.pdf`;
    const worker = html2pdf()
    let options = {
      margin: 1,
      filename: fileName,
      image: {
        type: "jpeg", quality: 0.98
      },
      html2canvas: {
        dpi: 192, letterRendering: true
      },
      jsPDF: { unit: "in", format: "a3", orientaion: "landscape" },
    }
    worker.set(options).from(element).save(fileName).then(() => {
      if (dark) document.documentElement.classList.toggle("dark", true);
      element.style.width = oldWidth;
    });
  }
  function uploadDocument() {
    const element = document.getElementById('printable') as HTMLElement;
    if (!element) return;
    let oldWidth = element.style.width;
    element.style.width = "100%";
    let dark = false;
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.toggle("dark", false);
      dark = true;
    }
    let fileName = `treatment-${treatment.sentTo.firstName}-${Date.now()}.pdf`;
    const worker = html2pdf()
    let options = {
      margin: 1,
      filename: fileName,
      image: {
        type: "jpeg", quality: 0.98
      },
      html2canvas: {
        dpi: 192, letterRendering: true
      },
      jsPDF: { unit: "in", format: "a3", orientaion: "landscape" },
    }
    worker.set(options).from(element).toPdf().get("pdf").then(async (pdf: any) => {
      const pdfBlob = new Blob([pdf.output('blob')], { type: 'application/pdf' });
      const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });
      if (dark) document.documentElement.classList.toggle("dark", true);
      element.style.width = oldWidth;
      const response = await api.uploadFile(treatment?.sentTo?.id, pdfFile);
      if (response) toast("document téléchargé avec succès");
      else toast.error("document téléchargé avec succès")
    });
  }
  useEffect(() => {
    const froalaView = document.querySelector(".fr-view") as HTMLElement;
    if (froalaView) {
      froalaView.style.maxWidth = "100ch";
    }
  }, [])
  if (!treatment) return <DataNotFound />
  return (
    <main className="w-full min-h-full py-4 px-4 md:px-4">
      <div className="w-full flex">
        <Button variant="outline" onClick={printDocument} className="w-full rounded-none rounded-tl-lg">download</Button>
        <Button onClick={uploadDocument} className="w-full rounded-none rounded-tr-lg">upload to user documents</Button>
      </div>
      <Card className="w-full rounded-none" id="printable">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{treatment.title}</CardTitle>
            <div className="rounded-full px-3 py-1 text-xs font-medium" style={getBadgeStyle(treatment.status)}>
              {treatment.status?.replace("_", " ")}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Patient Details</h2>
            <div className="flex items-center space-x-4">
              <div className="rounded-full overflow-hidden w-16 h-16">
                <NextImage
                  loading="lazy"
                  alt="Patient Avatar"
                  height={64}
                  className="w-full h-full rounded-full"
                  src={api.getUrlFromPath(treatment.sentTo?.profile?.imageUrl) || "/user-m.svg"}
                  style={{
                    aspectRatio: "64/64",
                    objectFit: "cover",
                  }}
                  width={64}
                />
              </div>
              <div>
                <p className="text-lg font-medium capitalize">{treatment.sentTo?.firstName + " " + treatment.sentTo?.lastName}</p>
                <p className="text-gray-500 dark:text-gray-400">Age: {treatment.sentTo?.profile?.birthDate ? calculateAgeFromBirtDate(treatment.sentTo?.profile?.birthDate) : "N/A"} | Sexe: <span className="lowercase">{treatment.sentTo?.profile?.gender ?? "N/A"}</span></p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Treatment Response</h2>
            <FroalaEditorView model={treatment.response} />
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <p className="text-sm font-medium">Treated on: {new Date(treatment.creationDate).toLocaleString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</p>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <p className="text-sm font-medium">Last Update: {new Date(treatment.lastModifiedDate).toLocaleString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Doctor Details</h2>
            <div className="flex items-center space-x-4">
              <div className="rounded-full overflow-hidden w-16 h-16">
                <NextImage
                  alt="Doctor Avatar"
                  height={64}
                  loading="lazy"
                  className="w-full h-full rounded-full"
                  src={api.getUrlFromPath(treatment.sentBy?.profile?.imageUrl) || "/user-m.svg"}
                  style={{
                    aspectRatio: "64/64",
                    objectFit: "cover",
                  }}
                  width={64}
                />
              </div>
              <div>
                <p className="text-lg font-medium capitalize">{treatment.sentBy?.firstName + " " + treatment.sentBy?.lastName}</p>
                <p className="text-gray-500 dark:text-gray-400">Age: {treatment.sentBy?.profile?.birthDate ? calculateAgeFromBirtDate(treatment.sentBy?.profile?.birthDate) : "N/A"} | Sexe: <span className="lowercase">{treatment.sentBy?.profile?.gender ?? "N/A"}</span></p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Treatment Notes</h2>
            <p className="text-gray-500 dark:text-gray-400">{treatment.review}</p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}


function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}