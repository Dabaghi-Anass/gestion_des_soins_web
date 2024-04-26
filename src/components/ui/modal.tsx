import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";


type Props = {
  onCloseModal: (state: boolean) => void;
  open: boolean;
}
export default function TreatmentResponseEditor({ onCloseModal, open }: Props) {
  return (
    <Dialog open={open} onOpenChange={(open) => onCloseModal(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Response to treatment request</DialogTitle>
          <DialogDescription>please provide a response to the treatment request</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <textarea placeholder="response" className="input" />
          <button className="btn btn-primary">send response</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}