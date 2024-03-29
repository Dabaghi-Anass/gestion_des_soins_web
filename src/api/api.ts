const BASE_URL = 'http://localhost:8070/api' as const;
const AUTH_URL =  `${BASE_URL}/auth`;
const PROFILE_URL =  `${BASE_URL}/profile`;
import { User, UserProfile } from "@/types/types";
import http from "./http";
const queries = {
    registerUser: async (user : User) => {
        try {
            const response = await http.post(`${AUTH_URL}/register`, user);
            if (response.status === 200){
                const json : any = await response.json();
                return { ...json, token: response.headers.get("x-auth") , done : true};
            }
            else if(response.status === 400)
                return {message : "User  With This Email already exists" , done : false};
        } catch (e: any) {
            console.log(e.message)
            return null;
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
        } catch (fetchingError: any) {
            return { message : "internal server error please try again later" , done : false};
        }
    },
    updateProfile: async (profile: UserProfile | undefined) => {
        try {
            if (!profile) return null;
            const response = await http.post(`${PROFILE_URL}/create`, profile);
            if (response.status === 200) {
                return response.json();
            } else {
                return null;
            }
        } catch (e : any) {
            return null;
        }
    },
    saveUserWithProfile: async (user: User) => {
        try {
            const response = await http.put(`${AUTH_URL}/user/createWithProfile`, user);
            // console.log(response)
            // if (response.status === 200) {
            //     return response.json();
            // } else {
            //     return null;
            // }
            return response;
        } catch (e : any) {
            console.log(e)
            return null;
        }
    },
}
export default queries;