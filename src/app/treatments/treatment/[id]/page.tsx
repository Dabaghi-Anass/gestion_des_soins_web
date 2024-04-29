"use client"
import api from "@/api/api";
import Loading from "@/components/ui/loading";
import TreatmentDetails from "@/components/ui/treatment-details";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function UserTreatmentsPage() {
  const { id } = useParams();
  const [treatment, setTreatment] = useState(null);
  useEffect(() => {
    api.getTreatmentByRequestId(+id).then(setTreatment)
  }, [])
  if (!treatment) return <Loading />;
  return <TreatmentDetails treatment={treatment} />
}
