import { createSlice } from "@reduxjs/toolkit";
const appointmentSlice = createSlice({
    name: "AppointmentReducer",
    initialState : {appointments : [], appointment : null},
    reducers: {
        updateAppointments: (state,payload) => {
            state.appointments = payload.payload
      },
      updateAppointment: (state,payload) => {
        const newAppointments: any[] = state.appointments.map((appointment:any) => {
          if (appointment.id === payload.payload.id) {
            state.appointment = payload.payload
            return payload.payload
          }
          return appointment;
        })
        state.appointments = newAppointments as never[]
      }
      
    }
})

export const { updateAppointments,updateAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;