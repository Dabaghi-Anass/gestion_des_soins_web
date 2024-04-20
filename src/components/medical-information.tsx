import { HeartPulse } from "lucide-react";

function randomHsl() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue},46%,42%)`
}
export default function MedicalInformation({ patient, className }: { patient: any, className: string }) {
  return <div className={className}>
    {patient?.medicalInformation?.bloodType &&
      <div className="flex bg-rose-600 gap-2 font-bold text-white w-fit px-2 py-1 rounded-full">
        <HeartPulse />
        <h3>blood type : <span className="text-yellow-400 mx-2">{patient?.medicalInformation?.bloodType}</span></h3>
      </div>
    }
    {patient?.medicalInformation?.allergies &&
      <>
        <h1 className="text-2xl font-semibold my-8">Allergies</h1>
        <div className="flex flex-wrap gap-4 items-center text-secondary-foreground">
          {patient.medicalInformation.allergies.split(",").map((a: string) => (
            <div key={a} className="flex gap-2 font-semibold w-fit px-2 py-1 rounded-full" style={{
              background: randomHsl()
            }}>{a}</div>
          ))}
        </div>
      </>}
  </div>
}