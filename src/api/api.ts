const BASE_URL = 'http://localhost:8070' as const;
const AUTH_URL =  `${BASE_URL}/api/auth`;
import { User } from "@/types/types";
import http from "./http";
const queries = {
    registerUser: async (user : User) => {
        try {
            const response = await http.post(`${AUTH_URL}/register`, user);
            if (response.status === 200){
                const json : any = await response.json();
                return { ...json, token: response.headers.get("x-auth") };
            }
            else if(response.status === 400)
                return {message : "User  With This Email already exists" , done : false};
        }catch(e : any) {
            return e;
        }
    },
    loginUser: async (user: User) => {
        const response = await http.post(`${AUTH_URL}/login`, user);
        if (response.status === 200) {
            return response.json();
        } else {
            // throw new Error(response.text());
        }
    },
    currentUser: async () => {
        try {
            const response = await http.get(`${AUTH_URL}/current-user`);
            if (response.status === 400) {
            }
            return response.json();
        } catch (e : any) {
            return null;
        }
    },
    isUserRegistred : async () =>{
        try {
            const response: any = await http.get(`${AUTH_URL}/isVerified`);
            if (response.status === 400) {
                return { message : "User is not Verified Yet" , done : false };
            } else if (response.status === 200) {
                const action = await response.json();
                if(action.done){
                    return { done : true  , message : "user verified succefully!"};
                } else {
                    return { done : false  , message : "user is not verified!"};
                }
            }
        }catch(fetchingError : any) {
            return { message : `internal server error please try again later : ${fetchingError.message}` , done : false};
        }
    }
}
export default queries;