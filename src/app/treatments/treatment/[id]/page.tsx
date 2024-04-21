"use client"
import api from "@/api/api";
import TreatmentDetails from "@/components/ui/treatment-details";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
export default async function UserTreatmentsPage() {
  const { id } = useParams();
  const [treatment, setTreatment] = useState([]);
  useEffect(() => {
    api.getTreatmentById(+id).then(setTreatment)
  }, [])
  useEffect(() => {
    console.log(treatment)
  }, [treatment])
  return <Suspense fallback={<div>Loading...</div>}>
    <TreatmentDetails treatment={treatment} />
  </Suspense>;
}
