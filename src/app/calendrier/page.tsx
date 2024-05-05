"use client"
import api from "@/api/api";
import { DatePicker } from "@/components/ui/date-picker";
import { DayList } from "@/components/ui/day-list";
import Loading from "@/components/ui/loading";
import WithTooltip from "@/components/ui/with-tooltip";
import { calculateProgress, getBadgeStyle, getTimeString, randomHue, weekEnd, weekStart } from "@/lib/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { groupBy } from "lodash";
import Image from "next/image";

import { useAppSelector } from "@/hooks/redux-hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function CalendrierPage() {
  const colorsMap: { [key: string | number]: number } = {}
  const currentUser: any = useAppSelector((state) => state.UserReducer.user);
  const [date, setDate] = useState(new Date());
  const [startOfWeek, setStartOfWeek] = useState(new Date());
  const [timeZone, setTimeZone] = useState("GMT");
  const [timeZoneName, setTimeZoneName] = useState("GMT");
  let [currentDateTime, setCurrentDateTime] = useState(new Date());
  let timePercentage = calculateProgress(currentDateTime, 8, 17);
  const { data, isLoading } = useQuery({
    queryKey: ["appointment-requests", currentUser?.id, 0, 0],
    queryFn: async ({ queryKey }) => await api.getAppointmentRequests(queryKey[1], queryKey[2], queryKey[3])
  });
  useEffect(() => {
    const timeZone = new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];
    const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(timeZone);
    setTimeZoneName(timeZoneName);
    let id = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 30000);
    return () => clearInterval(id);
  }, [])
  useEffect(() => {
    setStartOfWeek(weekStart(date));
  }, [date])


  const filteredAppointments = data?.appointments?.filter((appointment: any) => {
    const appointmentDate = new Date(appointment.date);
    const startOfWeek = weekStart(date);
    const endOfWeek = weekEnd(date);
    endOfWeek.setDate(endOfWeek.getDate() + 1);
    return (appointmentDate >= startOfWeek && appointmentDate <= endOfWeek) && appointment.accepted;
  });

  const groupedAppointments = groupBy(filteredAppointments || [], (appointment) => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate.getDay();
  });
  useEffect(() => {
    filteredAppointments?.forEach((appointment: any) => {
      colorsMap[appointment.id] = colorsMap[appointment.id] || randomHue();
    })
  }, [data])
  if (isLoading) return <Loading />
  return <section className="w-full h-full p-4">
    <section className='h-full w-full p-4 bg-primary-foreground rounded-lg with-border overflow-y-scroll'>
      <header className="w-full pb-4">
        <DatePicker
          className="w-fit"
          value={date}
          onPickDate={date => date && setDate(new Date(date))}
        />
      </header>
      <div className="flex items-stretch border border-secondary">
        <WithTooltip description={timeZoneName}>
          <div className="time-zone text-xs text-bold border-r border-secondary aspect-square w-[90px] p-5 grid place-content-center cursor-pointer">{timeZone}</div>
        </WithTooltip>
        <DayList startOfWeek={startOfWeek} currentDate={date} />
      </div>
      <div className="flex">
        <div className="times w-[96px] relative border border-t-0 border-secondary">
          <div className={`hour-indicator text-sm px-2 lowercase w-[80px] flex justify-center items-center rounded-sm rounded-b-none text-white bg-primary absolute ${50 > 100 ? "hidden" : ""}`} style={{
            top: `${timePercentage.toFixed(2)}%`,
            left: ".2rem"
          }}>
            {getTimeString(currentDateTime)}
          </div>
          {Array.from({ length: 10 }).map((_, i) => {
            return <div key={i} className="time text-sm border-b border-secondary h-[180px] grid place-content-center">{i + 8}:00</div>
          })}
        </div>
        <div className="days-cols w-full grid grid-cols-6 gap-1">
          {Array.from({ length: 6 }).map((_, i) => {
            let day = new Date(startOfWeek);
            day.setDate(day.getDate() + i + 1);
            return <div key={i} className="time text-sm border-r border-secondary px-2 relative">
              {groupedAppointments?.[i + 1]?.map((appointment: any) => {
                let startDate = new Date(appointment.date)
                let endDate = new Date(appointment.date)
                let amount = appointment.duration;
                let userFullName = `${appointment.patient.firstName} ${appointment.patient.lastName}`
                endDate.setHours(startDate.getHours() + amount)
                let dateRange = `${getTimeString(startDate)} - ${getTimeString(endDate)}`
                let hue = colorsMap[appointment.id] || randomHue();
                return <Link href={`/appointments/appointment/${appointment.id}`} className="appintment-card w-full rounded-lg p-4 flex flex-col gap-2 absolute" style={{
                  height: `calc(${(amount / 10) * 100}%)`,
                  top: `${180 * (startDate.getHours() + (startDate.getMinutes() / 60) - 8)}px`,
                  left: 0,
                  backgroundColor: `hsl(${hue}, 100%, 50%, 0.3)`,
                  border: `1px solid hsl(${hue}, 100%, 40%)`,
                }}>
                  <div className="flex gap-2 items-center w-full">
                    <Image
                      className='rounded-full'
                      src={appointment?.patient?.profile?.imageUrl || '/user-m.svg'} alt="doctor" width={30} height={30} />
                    <span className="font-semibold capitalize truncate">{userFullName}</span>
                  </div>
                  <span className="text-sm">{appointment.type}</span>
                  <div className="flex flex-col w-full h-full justify-end gap-1">
                    <div className="flex items-center w-full">
                      <span className="text-sm px-1 rounded-lg w-fit lowercase" style={getBadgeStyle(appointment.status)}>{appointment.status || "en-attente"}</span>
                    </div>
                    <span className="text-xs">{dateRange}</span>
                  </div>
                </Link>
              })}
            </div>
          })}
        </div>
      </div>
    </section>
  </section >
}