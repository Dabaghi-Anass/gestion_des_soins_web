import { TreatmentRequest } from "@/components/appointment-request-card";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Search } from "lucide-react";
type Props = {
  selected: any;
  requests: any,
  onSelect: (request: any) => void
  onSearch: (text: string) => void
}
export function TreatmentRequestPatients({ requests, onSearch, onSelect, selected }: Props) {
  return <section className="appointments-requests lg:w-1/3  max-h-screen pr-2">
    <div className="pr-4 py-2 bg-primary-foreground  flex items-center rounded-lg border shadow-sm">
      <Input type="search" onInput={(e: any) => onSearch(e?.target?.value)} name="patient-search" placeholder='search patient' className="focus-visible:ring-0 bg-primary-foreground border-0 shadow-transparent" />
      <div className="text-gray-600">
        <Search size={20} />
      </div>
    </div>
    <Tabs defaultValue="all" className="py-4 pr-2 max-h-full overflow-y-scroll">
      <TabsList className="flex items-center justify-start p-0 gap-1 bg-secondary">
        <TabsTrigger value="all">Tous</TabsTrigger>
        <TabsTrigger value="oldest">Plus Ancient</TabsTrigger>
        <TabsTrigger value="newest">Nouveau</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="grid gap-4">
        {requests.map((request: any) => <TreatmentRequest selected={selected === request.id} onClick={() => onSelect(request)} key={request.id} request={request} />)}
      </TabsContent>
      <TabsContent value="oldest" className="grid gap-4">
        {requests.sort((a: any, b: any) => new Date(a.creationDate).getDate() - new Date(b.creationDate).getDate()).map((request: any) => <TreatmentRequest selected={selected === request.id} onClick={() => onSelect(request)} key={request.id} request={request} />)}
      </TabsContent>
      <TabsContent value="newest" className="grid gap-4">
        {requests.sort((a: any, b: any) => new Date(b.creationDate).getDate() - new Date(a.creationDate).getDate()).map((request: any) => <TreatmentRequest selected={selected === request.id} onClick={() => onSelect(request)} key={request.id} request={request} />)}
      </TabsContent>
    </Tabs>
  </section>
}

