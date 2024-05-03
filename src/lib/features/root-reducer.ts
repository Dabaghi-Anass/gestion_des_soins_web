import { combineReducers } from "redux";
import appointmentReducer from "./appointment-reducer";
import userReducer from "./user-reducer";
const rootReducer = combineReducers({
  UserReducer : userReducer,
  AppointmentReducer : appointmentReducer
});

export default rootReducer;