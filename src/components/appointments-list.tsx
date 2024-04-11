import SmallAppointment from "@/components/ui/small-appointment-visualizer";
import Link from "next/link";

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
export default function ProfileAppointementSchedule() {
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