"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/plugins/draggable.min.css';
import 'froala-editor/css/plugins/emoticons.min.css';
import 'froala-editor/css/plugins/fullscreen.min.css';
import 'froala-editor/css/plugins/table.min.css';
import 'froala-editor/css/third_party/image_tui.min.css';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/draggable.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/fullscreen.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/line_height.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/url.min.js';
import 'froala-editor/js/third_party/image_tui.min.js';
import { useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import { Button } from "./button";
import { Input } from "./input";
type Props = {
  onCloseModal: (state: boolean) => void;
  open: boolean;
}
export default function TreatmentResponseEditor({ onCloseModal, open }: Props) {
  const [model, setModel] = useState('');
  function clearForm() {
    onCloseModal(false)
  }
  function handleModelChange(model: any) {
    console.log(model)
    setModel(model)
  }
  return (
    <Dialog open={open} onOpenChange={(open) => onCloseModal(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Treatment pour cette requete</DialogTitle>
          <DialogDescription>s'il vous plais repondre en detaille</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <Input placeholder="title..." />
          <FroalaEditor
            config={{
              imageUpload: true,
              placeholderText: 'Ecrire une response detaillée ici...',
              charCounterCount: true,
            }}
            onModelChange={handleModelChange}
            model={model}
            tag='textarea' />
          <div className="flex gap-4">
            <Button className="w-full" variant="outline" onClick={clearForm}>cancel</Button>
            <Button className="w-full">send response</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}