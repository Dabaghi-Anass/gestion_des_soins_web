import { createSlice } from "@reduxjs/toolkit";
const initialUser = null;
const userSlice = createSlice({
    name: "UserReducer",
    initialState : {user : initialUser},
    reducers: {
        setCurrentUser: (state,payload) => {
            state.user = payload.payload
        }
    }
})

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;