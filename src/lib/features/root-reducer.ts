import { combineReducers } from "redux";
import userReducer from "./user-reducer";
const rootReducer = combineReducers({
  UserReducer : userReducer
});

export default rootReducer;