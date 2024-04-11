import SmallAppointment from "@/components/ui/small-appointment-visualizer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookUser, Cake, Dna, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Dots from "./ui/dots";
import InfoWithIcon from "./ui/info-with-icon";

export default function ProfileContent() {
  return <>
    <ProfileBasicinformations />
    <ProfileAppointementSchedule />
    <TreatmentHistory />
  </>
}
function ProfileBasicinformations() {
  return <div className="p-4 with-border flex flex-col gap-4 rounded-lg w-full sm:row-span-1 lg:row-span-full">
    <h1 className="font-semibold capitalize mb-4">basic informations</h1>
    <InfoWithIcon title="Gender" content="male" icon={<Dna size={20} color="#777" />} />
    <InfoWithIcon title="Birthday" content="male" icon={<Cake size={20} color="#777" />} />
    <InfoWithIcon title="Phone Number" content="male" icon={<Phone size={20} color="#777" />} />
    <InfoWithIcon title="Email" content="male" icon={<Mail size={20} color="#777" />} />
    <InfoWithIcon title="Age" content="male" icon={<BookUser size={20} color="#777" />} />
    <InfoWithIcon title="Address" content="male" icon={<MapPin size={20} color="#777" />} />
  </div>
}
const appointment = {
  "id": 4,
  "creationDate": "2024-04-08T12:40:07.433952",
  "lastModifiedDate": "2024-04-08T12:40:07.433952",
  "date": "2019-02-21T12:34:56.123+00:00",
  "status": "DONE",
  "type": null,
  "description": null,
  "patient": {
    "id": 7,
    "creationDate": "2024-04-07T22:54:07.171721",
    "lastModifiedDate": "2024-04-07T22:54:07.171721",
    "username": "anassabaaabb@email.com",
    "firstName": "anass",
    "lastName": null,
    "password": "anassanaahss",
    "role": null,
    "isVerified": null,
    "profile": null,
    "medicalInformation": null,
    "careGiver": null
  },
  assignedTo: {
    "id": 2,
    "creationDate": "2024-04-07T18:04:17.504672",
    "lastModifiedDate": "2024-04-07T18:04:17.504672",
    "username": "anass.debbaghi1ZZ23@gmail.com",
    "firstName": "anass",
    "lastName": "ajajaj",
    "password": "$2a$10$0VGn46sGspFPpvlvfLY5QuGkKwusFXrlyWsYxNN5zqeOcv5b77brq",
    "role": null,
    "isVerified": false,
    "profile": null
  },
  "duration": 0
};
function ProfileAppointementSchedule() {
  function calculateColor(status: string): string {
    switch (status) {
      case "DONE":
        return "#7aff99";
      case "SCHEDULED":
        return "#ffc478";
      case "CANCELED":
        return "#ff9c78";
      default:
        return "#a07aff";
    }

  }
  return <div className="p-4 with-border flex flex-col gap-4 rounded-lg w-full h-full hide-footer lg:overflow-hidden sm:row-span-1 lg:row-span-full">
    <h1 className="font-semibold capitalize mb-4">Appointments Schedule</h1>
    <div className="pl-10 flex flex-col gap-4 px-4 pt-4 h-full overflow-scroll">
      <SmallAppointment color={calculateColor("DONE")} appointment={appointment} />
      <SmallAppointment color={calculateColor("DONE")} appointment={appointment} />
      <SmallAppointment color={calculateColor("SCHEDULED")} appointment={appointment} />
      <SmallAppointment color={calculateColor("CANCELED")} appointment={appointment} />
    </div>
    <Link href="/" className="z-[200] w-full text-center link">see all</Link>
  </div>
}

function TreatmentHistory() {
  return <div className="p-4 with-border flex flex-col gap-4 rounded-lg w-full h-full sm:row-span-1 lg:col-span-2">
    <h1 className="font-semibold capitalize mb-4">history de traitements</h1>
    <Table>
      <TableCaption>la listes des traitements de tous les medcines</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Type Traitement</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Statue</TableHead>
          <TableHead className="w-0"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">#123</TableCell>
          <TableCell>Soin</TableCell>
          <TableCell>12 Aout 2024</TableCell>
          <TableCell><span className="status-badge lowercase" style={{ color: "green", border: "1px solid green" }}>finie</span></TableCell>
          <TableCell className="text-right">
            <Dots count={3} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#123</TableCell>
          <TableCell>Soin</TableCell>
          <TableCell>12 Aout 2024</TableCell>
          <TableCell><span className="status-badge lowercase" style={{ color: "red", border: "1px solid red" }}>annulé</span></TableCell>
          <TableCell className="text-right">
            <Dots count={3} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#123</TableCell>
          <TableCell>Soin</TableCell>
          <TableCell>12 Aout 2024</TableCell>
          <TableCell><span className="status-badge lowercase" style={{ color: "green", border: "1px solid green" }}>finie</span></TableCell>
          <TableCell className="text-right">
            <Dots count={3} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#123</TableCell>
          <TableCell>Soin</TableCell>
          <TableCell>12 Aout 2024</TableCell>
          <TableCell><span className="status-badge lowercase" style={{ color: "orange", border: "1px solid orange" }}>pending</span></TableCell>
          <TableCell className="text-right">
            <Dots count={3} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#123</TableCell>
          <TableCell>Soin</TableCell>
          <TableCell>12 Aout 2024</TableCell>
          <TableCell><span className="status-badge lowercase" style={{ color: "green", border: "1px solid green" }}>finie</span></TableCell>
          <TableCell className="text-right">
            <Dots count={3} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#123</TableCell>
          <TableCell>Soin</TableCell>
          <TableCell>12 Aout 2024</TableCell>
          <TableCell><span className="status-badge lowercase" style={{ color: "green", border: "1px solid green" }}>finie</span></TableCell>
          <TableCell className="text-right">
            <Dots count={3} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

  </div>
}