import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
type Props = {
  title: string,
  message: string,
  open: boolean,
  onConfirm: () => void,
  onCancel: () => void
}

export default function ConfirmActionModal({ title, message, open, onConfirm, onCancel }: Props) {
  return <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <DialogDescription>{message}</DialogDescription>
      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={onCancel} variant='secondary'>Annuler</Button>
        <Button onClick={onConfirm}>Confirmer</Button>
      </div>
    </DialogContent>
  </Dialog>
}