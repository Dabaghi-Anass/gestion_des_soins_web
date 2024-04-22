"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateAgeFromBirtDate
} from "@/lib/utils/utils";
import html2pdf from "html2pdf.js";
import { useState } from "react";
import { Button } from "./button";
import DataNotFound from "./data-not-found";
type Props = {
  treatment: any,
}

function getStatusBadgeStyle(status: string) {
  let getBgOfHue = (hue: number) => {
    return `hsl(${hue},84%, 93%)`
  };
  let getColorOfHue = (hue: number) => {
    return `hsl(${hue},64%, 24%)`
  };

  let style = {
    backgroundColor: getBgOfHue(270),
    color: getColorOfHue(270),
    border: `1px solid ${270}`
  }
  enum Status {
    PENDING = 42,
    CONFIRMED = 141,
    DENIED = 8
  }
  if (status === "PENDING") {
    style = {
      backgroundColor: getBgOfHue(Status.PENDING),
      color: getColorOfHue(Status.PENDING),
      border: `1px solid ${getColorOfHue(Status.PENDING)}`
    }
  }
  if (status === "CONFIRMED") {
    style = {
      backgroundColor: getBgOfHue(Status.CONFIRMED),
      color: getColorOfHue(Status.CONFIRMED),
      border: `1px solid ${getColorOfHue(Status.CONFIRMED)}`
    }
  }
  if (status === "DENIED") {
    style = {
      backgroundColor: getBgOfHue(Status.DENIED),
      color: getColorOfHue(Status.DENIED),
      border: `1px solid ${getColorOfHue(Status.DENIED)}`
    }
  }

  return style;
}
export default function TreatmentDetails({ treatment }: Props) {
  const [test, setTest] = useState(false)
  function printDocument() {
    const element = document.getElementById('printable') as HTMLElement;
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
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    }
    worker.set(options).from(element).save(fileName).then(() => {
      if (dark) document.documentElement.classList.toggle("dark", true);
    });
  }
  if (!treatment) return <DataNotFound />
  return (
    <main className="w-full min-h-full py-4 px-4 md:px-4">
      <Card className="w-full rounded-b-none" id="printable">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{treatment.title}</CardTitle>
            <div className="rounded-full px-3 py-1 text-xs font-medium" style={getStatusBadgeStyle(treatment.status)}>
              {treatment.status?.replace("_", " ")}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Patient Details</h2>
            <div className="flex items-center space-x-4">
              <div className="rounded-full overflow-hidden w-16 h-16">
                <img
                  alt="Patient Avatar"
                  height={64}
                  className="w-full h-full rounded-full"
                  src={treatment.sentTo?.profile?.imageUrl || "/user-placeholder.svg"}
                  style={{
                    aspectRatio: "64/64",
                    objectFit: "cover",
                  }}
                  width={64}
                />
              </div>
              <div>
                <p className="text-lg font-medium capitalize">{treatment.sentTo?.firstName + " " + treatment.sentTo?.lastName}</p>
                <p className="text-gray-500 dark:text-gray-400">Age: {treatment.sentTo?.profile?.birthDate ? calculateAgeFromBirtDate(treatment.sentTo?.profile?.birthDate) : "N/A"} | Gender: <span className="lowercase">{treatment.sentTo?.profile?.gender ?? "N/A"}</span></p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Treatment Response</h2>
            <p className="text-gray-500 dark:text-gray-400">{treatment.response}</p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <p className="text-sm font-medium">Treated on: {new Date(treatment.creationDate).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</p>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <p className="text-sm font-medium">Last Update: {new Date(treatment.lastModifiedDate).toLocaleString("en-GB", {
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
                <img
                  alt="Doctor Avatar"
                  height={64}
                  className="w-full h-full rounded-full"
                  src={treatment.sentBy?.profile?.imageUrl || "/user-placeholder.svg"}
                  style={{
                    aspectRatio: "64/64",
                    objectFit: "cover",
                  }}
                  width={64}
                />
              </div>
              <div>
                <p className="text-lg font-medium capitalize">{treatment.sentBy?.firstName + " " + treatment.sentBy?.lastName}</p>
                <p className="text-gray-500 dark:text-gray-400">Age: {treatment.sentBy?.profile?.birthDate ? calculateAgeFromBirtDate(treatment.sentBy?.profile?.birthDate) : "N/A"} | Gender: <span className="lowercase">{treatment.sentBy?.profile?.gender ?? "N/A"}</span></p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Treatment Notes</h2>
            <p className="text-gray-500 dark:text-gray-400">{treatment.review}</p>
          </div>
        </CardContent>
      </Card>
      <Button onClick={printDocument} className="w-full rounded-t-none">download</Button>
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