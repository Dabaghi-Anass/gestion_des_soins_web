import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBadgeStyle } from "@/lib/utils/utils";
import Link from "next/link";
import { Button } from "./ui/button";
type Props = {
  data?: any;
  hideLink?: boolean;
  profilePage?: boolean;
}
export default function TreatmentHistory({ data, hideLink, profilePage }: Props) {
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
              <span className="status-badge lowercase" style={getBadgeStyle(treatment.status)}>{treatment.status}</span>
            </TableCell>
            <TableCell>
              <Link href={`/profile/${treatment.sentBy.id}`} className="link">
                {treatment.sentBy.firstName} {treatment.sentBy.lastName}
              </Link>
            </TableCell>
            <TableCell>
              <Button variant="link" asChild>
                <Link href={`/treatments/treatment/${treatment.request.id}`}>voir</Link>
              </Button>
            </TableCell>
          </TableRow>)
        }
      </TableBody>
    </Table>
    {!hideLink &&
      <div className="w-full flex justify-center">
        {profilePage ?
          <Link href={`/treatments`} className="link">voir tous</Link> :
          <Link href={`/treatments/${data?.[0]?.sentTo?.id}`} className="link">voir tous</Link>
        }
      </div>
    }
  </div>
}