import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "./ui/button";
type Props = {
  data?: any;
  hideLink?: boolean;
}
export default function TreatmentHistory({ data, hideLink }: Props) {
  function getBadgeStyle(status: string) {
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
  return <div className="p-4 with-border flex flex-col gap-4 rounded-lg w-full h-fit sm:row-span-1 lg:col-span-2">
    <h1 className="font-semibold capitalize mb-4">history de traitements</h1>
    <Table>
      {!hideLink &&
        <TableCaption>la listes des traitements de tous les medcines</TableCaption>
      }
      <TableHeader>
        <TableRow>
          <TableHead>Intitulé</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Statue</TableHead>
          <TableHead>ِCreateur</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((treatment: any) =>
          <TableRow key={treatment.id} className="hover:filter hover:brightness-90">
            <TableCell>{treatment.title}</TableCell>
            <TableCell>{new Date(treatment.creationDate).toLocaleDateString("en-GB")}</TableCell>
            <TableCell>
              <span className="status-badge lowercase" style={getBadgeStyle("PENDING")}>{treatment.status}</span>
            </TableCell>
            <TableCell>
              <Link href={`/profile/${treatment.sentBy.id}`} className="link">
                {treatment.sentBy.firstName} {treatment.sentBy.lastName}
              </Link>
            </TableCell>
            <TableCell>
              <Button variant="link" asChild>
                <Link href={`/treatments/treatment/${treatment.id}`}>voir</Link>
              </Button>
            </TableCell>
          </TableRow>)

        }
      </TableBody>
    </Table>
    {!hideLink &&
      <div className="w-full flex justify-center">
        <Link href={`/treatments/${data?.[0]?.sentTo?.id}`} className="link">voir tous</Link>
      </div>
    }
  </div>
}