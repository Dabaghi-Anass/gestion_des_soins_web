"use client"
import api from "@/api/api";
import { DatePicker } from "@/components/ui/date-picker";
import { DayList } from "@/components/ui/day-list";
import Loading from "@/components/ui/loading";
import WithTooltip from "@/components/ui/with-tooltip";
import { calculateProgress, getBadgeStyle, randomHue, weekEnd, weekStart } from "@/lib/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { groupBy } from "lodash";
import Image from "next/image";

import { useAppSelector } from "@/hooks/redux-hooks";
import { useEffect, useState } from "react";


let dataFromDb = [
  {
    "id": 10,
    "creationDate": "2024-05-02T18:37:26.251414",
    "lastModifiedDate": "2024-05-02T18:37:26.251414",
    "date": "2024-05-06T09:30:52.000+00:00",
    "status": null,
    "type": "Consultation",
    "reason": "eveniet",
    "patient": {
      "id": 3,
      "creationDate": "2024-04-18T23:46:35.683614",
      "lastModifiedDate": "2024-04-18T23:46:35.683614",
      "username": "hasan@email.com",
      "firstName": "hasan",
      "lastName": "lbatal",
      "password": "$2a$10$hTXMbH6GNGKhIgGJi.y0Zu5IVa3I/iv5w4kxoxTfbAaml32ox0t7a",
      "role": "PATIENT",
      "isVerified": true,
      "profile": {
        "id": 3,
        "creationDate": "2024-04-18T23:46:35.684582",
        "lastModifiedDate": "2024-04-18T23:47:45.056508",
        "address": "123 zouagha Street",
        "imageUrl": "https://randomuser.me/api/portraits/men/4.jpg",
        "gender": "FEMALE",
        "birthDate": "2003-01-13",
        "phoneNumber": "5551234567"
      },
      "medicalInformation": {
        "temperature": 42,
        "bloodType": "O+",
        "allergies": "Pollen, poussière, squames d'animaux, arachides, crustacés",
        "condition": "Sick"
      },
      "careGiver": null,
      "companion": null
    },
    "assignedTo": {
      "id": 1,
      "creationDate": "2024-04-18T23:29:52.284296",
      "lastModifiedDate": "2024-04-18T23:30:53.014931",
      "username": "anass.debbaghi123@gmail.com",
      "firstName": "anass",
      "lastName": "dabaghi",
      "password": "$2a$10$Pjce4w8td9Pmke7R7zkKXelBoiSqOCcqv6UkFhJ/10RckPfdWH4DC",
      "role": "DOCTOR",
      "isVerified": true,
      "profile": {
        "id": 1,
        "creationDate": "2024-04-18T23:29:52.424389",
        "lastModifiedDate": "2024-05-01T15:53:57.99731",
        "address": "Fes Zouagha, 116 bis hay griyou",
        "imageUrl": "https://randomuser.me/api/portraits/men/16.jpg",
        "gender": "MALE",
        "birthDate": "2004-01-13",
        "phoneNumber": "0634259777"
      },
      "specialities": [
        {
          "id": 1,
          "creationDate": "2024-05-01T13:20:55.676886",
          "lastModifiedDate": "2024-05-01T13:20:55.676886",
          "category": "psychiatre"
        },
        {
          "id": 2,
          "creationDate": "2024-05-01T13:20:55.828888",
          "lastModifiedDate": "2024-05-01T13:20:55.828888",
          "category": "pédiatre"
        },
        {
          "id": 3,
          "creationDate": "2024-05-01T13:20:55.866883",
          "lastModifiedDate": "2024-05-01T13:20:55.866883",
          "category": "lklawi"
        },
        {
          "id": 4,
          "creationDate": "2024-05-01T13:21:23.098377",
          "lastModifiedDate": "2024-05-01T13:21:23.098377",
          "category": "hasan"
        },
        {
          "id": 5,
          "creationDate": "2024-05-01T13:21:50.806004",
          "lastModifiedDate": "2024-05-01T13:21:50.806004",
          "category": "testemone"
        },
        {
          "id": 6,
          "creationDate": "2024-05-01T13:25:17.05636",
          "lastModifiedDate": "2024-05-01T13:25:17.05636",
          "category": "wal3adaaaaw"
        },
        {
          "id": 7,
          "creationDate": "2024-05-01T13:26:27.845698",
          "lastModifiedDate": "2024-05-01T13:26:27.845698",
          "category": "dialise"
        },
        {
          "id": 8,
          "creationDate": "2024-05-01T13:31:34.999287",
          "lastModifiedDate": "2024-05-01T13:31:34.999287",
          "category": "data"
        }
      ]
    },
    "duration": 1,
    "accepted": false
  },
  {
    "id": 9,
    "creationDate": "2024-05-02T18:37:26.251414",
    "lastModifiedDate": "2024-05-02T18:37:26.251414",
    "date": "2024-05-08T08:00:52.000+00:00",
    "status": null,
    "type": "Consultation",
    "reason": "eveniet",
    "patient": {
      "id": 3,
      "creationDate": "2024-04-18T23:46:35.683614",
      "lastModifiedDate": "2024-04-18T23:46:35.683614",
      "username": "hasan@email.com",
      "firstName": "hasan",
      "lastName": "lbatal",
      "password": "$2a$10$hTXMbH6GNGKhIgGJi.y0Zu5IVa3I/iv5w4kxoxTfbAaml32ox0t7a",
      "role": "PATIENT",
      "isVerified": true,
      "profile": {
        "id": 3,
        "creationDate": "2024-04-18T23:46:35.684582",
        "lastModifiedDate": "2024-04-18T23:47:45.056508",
        "address": "123 zouagha Street",
        "imageUrl": "https://randomuser.me/api/portraits/men/4.jpg",
        "gender": "FEMALE",
        "birthDate": "2003-01-13",
        "phoneNumber": "5551234567"
      },
      "medicalInformation": {
        "temperature": 42,
        "bloodType": "O+",
        "allergies": "Pollen, poussière, squames d'animaux, arachides, crustacés",
        "condition": "Sick"
      },
      "careGiver": null,
      "companion": null
    },
    "assignedTo": {
      "id": 1,
      "creationDate": "2024-04-18T23:29:52.284296",
      "lastModifiedDate": "2024-04-18T23:30:53.014931",
      "username": "anass.debbaghi123@gmail.com",
      "firstName": "anass",
      "lastName": "dabaghi",
      "password": "$2a$10$Pjce4w8td9Pmke7R7zkKXelBoiSqOCcqv6UkFhJ/10RckPfdWH4DC",
      "role": "DOCTOR",
      "isVerified": true,
      "profile": {
        "id": 1,
        "creationDate": "2024-04-18T23:29:52.424389",
        "lastModifiedDate": "2024-05-01T15:53:57.99731",
        "address": "Fes Zouagha, 116 bis hay griyou",
        "imageUrl": "https://randomuser.me/api/portraits/men/16.jpg",
        "gender": "MALE",
        "birthDate": "2004-01-13",
        "phoneNumber": "0634259777"
      },
      "specialities": [
        {
          "id": 1,
          "creationDate": "2024-05-01T13:20:55.676886",
          "lastModifiedDate": "2024-05-01T13:20:55.676886",
          "category": "psychiatre"
        },
        {
          "id": 2,
          "creationDate": "2024-05-01T13:20:55.828888",
          "lastModifiedDate": "2024-05-01T13:20:55.828888",
          "category": "pédiatre"
        },
        {
          "id": 3,
          "creationDate": "2024-05-01T13:20:55.866883",
          "lastModifiedDate": "2024-05-01T13:20:55.866883",
          "category": "lklawi"
        },
        {
          "id": 4,
          "creationDate": "2024-05-01T13:21:23.098377",
          "lastModifiedDate": "2024-05-01T13:21:23.098377",
          "category": "hasan"
        },
        {
          "id": 5,
          "creationDate": "2024-05-01T13:21:50.806004",
          "lastModifiedDate": "2024-05-01T13:21:50.806004",
          "category": "testemone"
        },
        {
          "id": 6,
          "creationDate": "2024-05-01T13:25:17.05636",
          "lastModifiedDate": "2024-05-01T13:25:17.05636",
          "category": "wal3adaaaaw"
        },
        {
          "id": 7,
          "creationDate": "2024-05-01T13:26:27.845698",
          "lastModifiedDate": "2024-05-01T13:26:27.845698",
          "category": "dialise"
        },
        {
          "id": 8,
          "creationDate": "2024-05-01T13:31:34.999287",
          "lastModifiedDate": "2024-05-01T13:31:34.999287",
          "category": "data"
        }
      ]
    },
    "duration": 1,
    "accepted": false
  },
  {
    "id": 9,
    "creationDate": "2024-05-02T18:37:26.251414",
    "lastModifiedDate": "2024-05-02T18:37:26.251414",
    "date": "2024-05-08T11:00:52.000+00:00",
    "status": null,
    "type": "Consultation",
    "reason": "eveniet",
    "patient": {
      "id": 3,
      "creationDate": "2024-04-18T23:46:35.683614",
      "lastModifiedDate": "2024-04-18T23:46:35.683614",
      "username": "hasan@email.com",
      "firstName": "hasan",
      "lastName": "lbatal",
      "password": "$2a$10$hTXMbH6GNGKhIgGJi.y0Zu5IVa3I/iv5w4kxoxTfbAaml32ox0t7a",
      "role": "PATIENT",
      "isVerified": true,
      "profile": {
        "id": 3,
        "creationDate": "2024-04-18T23:46:35.684582",
        "lastModifiedDate": "2024-04-18T23:47:45.056508",
        "address": "123 zouagha Street",
        "imageUrl": "https://randomuser.me/api/portraits/men/4.jpg",
        "gender": "FEMALE",
        "birthDate": "2003-01-13",
        "phoneNumber": "5551234567"
      },
      "medicalInformation": {
        "temperature": 42,
        "bloodType": "O+",
        "allergies": "Pollen, poussière, squames d'animaux, arachides, crustacés",
        "condition": "Sick"
      },
      "careGiver": null,
      "companion": null
    },
    "assignedTo": {
      "id": 1,
      "creationDate": "2024-04-18T23:29:52.284296",
      "lastModifiedDate": "2024-04-18T23:30:53.014931",
      "username": "anass.debbaghi123@gmail.com",
      "firstName": "anass",
      "lastName": "dabaghi",
      "password": "$2a$10$Pjce4w8td9Pmke7R7zkKXelBoiSqOCcqv6UkFhJ/10RckPfdWH4DC",
      "role": "DOCTOR",
      "isVerified": true,
      "profile": {
        "id": 1,
        "creationDate": "2024-04-18T23:29:52.424389",
        "lastModifiedDate": "2024-05-01T15:53:57.99731",
        "address": "Fes Zouagha, 116 bis hay griyou",
        "imageUrl": "https://randomuser.me/api/portraits/men/16.jpg",
        "gender": "MALE",
        "birthDate": "2004-01-13",
        "phoneNumber": "0634259777"
      },
      "specialities": [
        {
          "id": 1,
          "creationDate": "2024-05-01T13:20:55.676886",
          "lastModifiedDate": "2024-05-01T13:20:55.676886",
          "category": "psychiatre"
        },
        {
          "id": 2,
          "creationDate": "2024-05-01T13:20:55.828888",
          "lastModifiedDate": "2024-05-01T13:20:55.828888",
          "category": "pédiatre"
        },
        {
          "id": 3,
          "creationDate": "2024-05-01T13:20:55.866883",
          "lastModifiedDate": "2024-05-01T13:20:55.866883",
          "category": "lklawi"
        },
        {
          "id": 4,
          "creationDate": "2024-05-01T13:21:23.098377",
          "lastModifiedDate": "2024-05-01T13:21:23.098377",
          "category": "hasan"
        },
        {
          "id": 5,
          "creationDate": "2024-05-01T13:21:50.806004",
          "lastModifiedDate": "2024-05-01T13:21:50.806004",
          "category": "testemone"
        },
        {
          "id": 6,
          "creationDate": "2024-05-01T13:25:17.05636",
          "lastModifiedDate": "2024-05-01T13:25:17.05636",
          "category": "wal3adaaaaw"
        },
        {
          "id": 7,
          "creationDate": "2024-05-01T13:26:27.845698",
          "lastModifiedDate": "2024-05-01T13:26:27.845698",
          "category": "dialise"
        },
        {
          "id": 8,
          "creationDate": "2024-05-01T13:31:34.999287",
          "lastModifiedDate": "2024-05-01T13:31:34.999287",
          "category": "data"
        }
      ]
    },
    "duration": 2.5,
    "accepted": false
  },
]
export default function CalendrierPage() {
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


  const filteredAppointments = dataFromDb.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    const startOfWeek = weekStart(date);
    const endOfWeek = weekEnd(date);
    return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek;
  });
  const groupedAppointments = groupBy(filteredAppointments || [], (appointment) => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate.getDay();
  });
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
          <div className="time-zone text-semibold border-r border-secondary aspect-square w-[90px] p-5 grid place-content-center cursor-pointer">{timeZone}</div>
        </WithTooltip>
        <DayList startOfWeek={startOfWeek} currentDate={date} />
      </div>
      <div className="flex">
        <div className="times w-[96px] px-4 relative border border-t-0 border-secondary">
          <div className={`hour-indicator px-2 rounded-lg rounded-b-none text-white flex items-center bg-primary absolute ${50 > 100 ? "hidden" : ""}`} style={{
            top: `${timePercentage.toFixed(2)}%`,
            left: ".2rem"
          }}>
            {currentDateTime.getHours()}:{currentDateTime.getMinutes()}
          </div>
          {Array.from({ length: 10 }).map((_, i) => {
            return <div key={i} className="time text-sm border-b border-secondary h-[180px] grid place-content-center">{i + 8}:00</div>
          })}
        </div>
        <div className="days-cols w-full grid grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => {
            let day = new Date(startOfWeek);
            day.setDate(day.getDate() + i + 1);
            return <div key={i} className="time text-sm border-r border-secondary flex flex-col gap-2 p-2">
              {groupedAppointments?.[i]?.map((appointment: any, i) => {
                let aDate = new Date(appointment.date)
                let hour = aDate.getHours();
                let minutes = aDate.getMinutes();
                let amount = appointment.duration;
                return <div className="appintment-card w-full rounded-lg p-4 flex flex-col gap-2" style={{
                  height: `${(amount / 8) * 100}%`,
                  marginTop: i === 0 ? `${(hour - 8) / 8 * 100}%` : 0,
                  backgroundColor: `hsl(${randomHue()}, 100%, 95%)`,
                }}>
                  <div className="flex gap-2 items-center w-full">
                    <Image
                      className='rounded-full'
                      src="https://randomuser.me/api/portraits/men/75.jpg" alt="doctor" width={30} height={30} />
                    <span className="font-semibold capitalize truncate">anass dabaghi</span>
                  </div>
                  <span className="text-sm">change blood</span>
                  <div className="flex justify-end w-full h-full items-end">
                    <span className="text-sm p-1 rounded-lg w-fit lowercase mt-4" style={getBadgeStyle("DONE")}>Follow Up</span>
                  </div>
                </div>
              })}
            </div>
          })}
        </div>
      </div>
    </section>
  </section >
}