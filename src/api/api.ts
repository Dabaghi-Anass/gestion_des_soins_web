const BASE_URL = 'http:localhost:8070' as const;
const AUTH_URL =  `${BASE_URL}/api/auth`;
import { User } from "@/types/types";
import http from "./http";
const queries = {
    registerUser: async (user : User) => {
        const response = await http.post(`${AUTH_URL}/register`, user);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.data);
        }
    },
    loginUser: async (user: User) => {
        const response = await http.post(`${AUTH_URL}/login`, user);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.data);
        }
    }
}
export default queries;