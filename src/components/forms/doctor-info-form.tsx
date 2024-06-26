"use client";
import api from "@/api/api";
import Form from "@/components/forms/form";
import { randomHslaCombination } from "@/lib/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { ComboBox } from "../ui/combo-box";
import Loading from "../ui/loading";

const defaultSpecs = [
  "Anesthésiologie",
  "Cardiologie",
  "Dermatologie",
  "Endocrinologie",
  "Gastro-entérologie",
  "Gynécologie",
  "Hématologie",
  "Infectiologie",
  "Médecine interne",
  "Néphrologie",
  "Neurologie",
  "Oncologie",
  "Ophtalmologie",
  "Orthopédie",
  "Oto-rhino-laryngologie",
  "Pédiatrie",
  "Pneumologie",
  "Psychiatrie",
  "Radiologie",
  "Rhumatologie",
  "Urologie",
  "Dentiste"
]
type DoctorFormProps = {
  user: any;
  formError: string | null;
  errors: Record<string, string>;
  onData: (data: any) => void;
  onErrors: (errors: Record<string, string>) => void;
  onFormError: (error: any) => void;
}
const DoctorForm = ({ user, formError, onData, onFormError }: DoctorFormProps) => {
  const [data, setData] = useState<string[]>([]);
  const [specValue, setSpecValue] = useState<string>("");
  const { data: specialities, isLoading } = useQuery({
    queryKey: ["specialities"],
    queryFn: async () => await api.getSpecialities(),
  })
  function uniqueArray(arr: string[]) {
    return arr.filter((v, i, a) => a.indexOf(v) === i);
  }
  async function handleSubmit() {
    onFormError("");
    if (data.length > 0) {
      const response = await api.updateDoctor({
        id: user.id,
        username: user.username,
        specialities: data
      })
      onData(response);
    } else {
      onFormError("Please select at least one speciality");
    }
  }
  function addSpec() {
    onFormError("");
    if (specValue?.length > 0) {
      setData((prev) => [...prev, specValue]);
      setSpecValue("");
    } else {
      onFormError("Please select a speciality");
    }
  }
  if (isLoading) return <Loading />
  return <div className="h-screen w-full flex flex-col gap-4 items-center">
    {formError && <div className="form-error">{formError}</div>}
    <Form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 px-4 w-full max-w-xl md:min-w-[500px] relative'>
      <div className="flex gap-4 items-center">
        <ComboBox
          value={specValue}
          onChange={setSpecValue}
          placeholder="Select Specialitée"
          data={uniqueArray([...defaultSpecs, ...specialities])}
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
export default DoctorForm;