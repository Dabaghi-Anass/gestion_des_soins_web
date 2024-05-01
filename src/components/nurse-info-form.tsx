"use client";
import api from "@/api/api";
import Form from "@/components/form";
import { randomHslaCombination } from "@/lib/utils/utils";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { ComboBox } from "./ui/combo-box";

const qualities = [
  "Aimable",
  "Attentionné",
  "Autonome",
  "Calme",
  "Compétent",
  "Consciencieux",
  "Courageux",
  "Créatif",
  "Sérieux",
  "Sociable",
  "Sûr de soi",
]
type NurseFormProps = {
  user: any;
  formError: string | null;
  errors: Record<string, string>;
  onData: (data: any) => void;
  onErrors: (errors: Record<string, string>) => void;
  onFormError: (error: any) => void;
}
const NurseForm = ({ user, formError, onData, onFormError }: NurseFormProps) => {
  const [data, setData] = useState<string[]>([]);
  const [specValue, setSpecValue] = useState<string>("");
  function uniqueArray(arr: string[]) {
    return arr.filter((v, i, a) => a.indexOf(v) === i);
  }
  async function handleSubmit() {
    onFormError("");
    if (data.length > 0) {
      const response = await api.updateNurse({
        id: user.id,
        username: user.username,
        qualities: data
      })
      onData(response);
    } else {
      onFormError("Please select at least one Quality");
    }
  }
  function addSpec() {
    onFormError("");
    if (specValue?.length > 0) {
      setData((prev) => [...prev, specValue]);
      setSpecValue("");
    } else {
      onFormError("Please add a valid Quality");
    }
  }
  return <div className="h-screen w-full flex flex-col gap-4 items-center">
    {formError && <div className="form-error">{formError}</div>}
    <Form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 px-4 w-full max-w-xl md:min-w-[500px] relative'>
      <div className="flex gap-4 items-center">
        <ComboBox
          value={specValue}
          onChange={setSpecValue}
          placeholder="Select Qualité"
          data={uniqueArray(qualities)}
        />
        <Button type="reset" onClick={addSpec}>ajouter</Button>
        <Button type="reset" onClick={() => setData([])} variant="outline">supprimer tous</Button>
      </div>
      <div className="flex gap-4 items-center w-full flex-wrap">
        {data.map((spec, i) => {
          const { color, backgroundColor } = randomHslaCombination(0.1);
          return <div key={i}
            className="flex items-center gap-2 px-2 rounded-lg"
            style={{ backgroundColor, color, border: `1px solid ${color}` }}
          >
            <div className=" flex-grow">{spec}</div>
            <button type="reset"
              onClick={() => setData((prev) => prev.filter((s) => s !== spec))}>
              <Trash size={14} />
            </button>
          </div>
        })}
      </div>
      <Form.Button onClick={handleSubmit} className="min-w-[200px] my-10 mx-auto">completer</Form.Button>
    </Form>
  </div >
}
export default NurseForm;