import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Dots from "./ui/dots";
export default function TreatmentHistory() {
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