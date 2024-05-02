"use client"
import api from "@/api/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useAppSelector } from "@/hooks/redux-hooks";
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/line_height.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/url.min.js';
import { useEffect, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
  onUpdateRequest: (request: any) => void;
  onCloseModal: (state: boolean) => void;
  open: boolean;
  request: any;
}
export default function TreatmentResponseEditor({ onCloseModal, onUpdateRequest, open, request }: Props) {
  const currentUser: any = useAppSelector(state => state.UserReducer.user)
  const [title, setTitle] = useState("");
  const [model, setModel] = useState('');
  const [treatment, setTreatment] = useState<any>(null);
  function clearForm() {
    onCloseModal(false)
  }
  function handleModelChange(model: any) {
    setModel(model)
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let response;
    let treatmentDTO: any = {
      title,
      response: model,
      sentById: currentUser?.id,
      sentToId: request?.sentBy?.id,
      requestId: request?.id
    };
    if (!request?.responded) {
      response = await api.addTreatment(treatmentDTO);
      if (response) {
        toast(`Treatment created for user ${request.sentBy.firstName} ${request.sentBy.lastName}`)
      }
    } else {
      treatmentDTO.id = treatment.id;
      response = await api.updateTreatment(treatmentDTO);
      if (response) {
        toast(`Treatment modified for user ${request.sentBy.firstName} ${request.sentBy.lastName}`)
      }
    }
    onUpdateRequest(response.request)
  }
  async function fetchResponse(id: number) {
    const response = await api.getTreatmentByRequestId(id)
    if (response) {
      setTitle(response.title)
      setModel(response.response)
      setTreatment(response)
    }
  }
  useEffect(() => {
    if (request?.responded) fetchResponse(request.id)
    setTreatment(null)
    setTitle("")
    setModel("")
  }, [request])
  return (
    <Dialog open={open} onOpenChange={(open) => onCloseModal(open)}>
      <DialogContent className="w-full max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Treatment pour cette requete</DialogTitle>
          <DialogDescription>s'il vous plais repondre en detaille</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4 w-full max-w-[85vw]" onSubmit={handleSubmit}>
          <Input placeholder="title..." required maxLength={80} name='title' value={title} onChange={(e: any) => setTitle(e.target.value)} />
          <FroalaEditor
            config={{
              placeholderText: 'Ecrire une response detaillée ici...',
              charCounterCount: true,
              charCounterMax: 3000,
              attribution: false,
            }}
            onModelChange={handleModelChange}
            model={model}
            tag='textarea'
          />
          <div className="flex gap-4">
            <Button className="w-full" variant="outline" onClick={clearForm}>cancel</Button>
            <Button className="w-full" type="submit">send response</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}