const BASE_URL = 'http://localhost:8070/api' as const;
const AUTH_URL =  `${BASE_URL}/auth`;
const PROFILE_URL =  `${BASE_URL}/profile`;
const USER_URL =  `${BASE_URL}/users`;
const TREATMENTS_URL =  `${BASE_URL}/treatments`;
import { User, UserProfile } from "@/types/types";
import http from "./http";
const registerUser = async (user: User) => {
    try {
        const response = await http.post(`${AUTH_URL}/register`, user);
        if (response.status === 200) {
            const json: any = await response.json();
            return { ...json, token: response.headers.get("x-auth"), done: true };
        } else if (response.status === 400)
            return { message: "User  With This Email already exists", done: false };
    } catch (e: any) {
        console.log(e.message);
        return null;
    }
};

const logout = async () => {
    try {
        return await http.get(`${AUTH_URL}/logout`);
    } catch (e: any) {
        return null;
    }
};

const loginUser = async (user: User) => {
    try {
        const response = await http.post(`${AUTH_URL}/login`, user);
        if (response.status === 200) {
            const json: any = await response.json();
            return { ...json, token: response.headers.get("x-auth"), done: true };
        } else if (response.status === 400)
            return { message: "Invalid Username / Password", done: false };
    } catch (e: any) {
        console.log(e.message);
        return null;
    }
};

const currentUser = async () => {
    try {
        const response = await http.get(`${AUTH_URL}/current-user`);
        if (response.status === 200) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
};

const isUserRegistred = async () => {
    try {
        const response: any = await http.get(`${AUTH_URL}/isVerified`);
        if (response.status === 400) {
            return { message: "User is not Verified Yet", done: false };
        } else if (response.status === 200) {
            const action = await response.json();
            if (action.done) {
                return { done: true, message: "user verified succefully!" };
            } else {
                return { done: false, message: "user is not verified!" };
            }
        }
    } catch (fetchingError: any) {
        return { message: "internal server error please try again later", done: false };
    }
};

const updateProfile = async (profile: UserProfile | undefined) => {
    try {
        if (!profile) return null;
        delete profile.lastModifiedDate;
        delete profile.creationDate;
        const response = await http.put(`${AUTH_URL}/user/saveProfile`, profile);
        if (response.ok) {
            return response;
        } else {
            return null;
        }
    } catch (e: any) {
        return null;
    }
};

const updateUser = async (user: User) => {
    try {
        const response = await http.put(`${AUTH_URL}/user/update`, user);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
};
const getUserById = async (id: number) => {
    try {
        const response = await http.get(`${USER_URL}/${id}`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
}
const getRequestTreatments = async (userId : number) => {
    try {
        const response = await http.get(`${TREATMENTS_URL}/requests/${userId}`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
};
const denyTreatmentRequest = async (requestId: number) => {
    try {
        const response = await http.put(`${TREATMENTS_URL}/deny/${requestId}`, {});
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
}
const acceptTreatmentRequest = async (requestId: number) => {
    try {
        const response = await http.put(`${TREATMENTS_URL}/accept/${requestId}`, {});
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
}
const getTreatmentsByUserId = async (id: number, offset = 0, limit = 6) => {
    try {
        const response = await http.get(`${TREATMENTS_URL}/${id}?offset=${offset}&limit=${limit}`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
}
const getAllTreatmentsByUserId = async (id: number) => {
    try {
        const response = await http.get(`${TREATMENTS_URL}/all/${id}`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
}
const getTreatmentById = async (id: number) => {
    try {
        const response = await http.get(`${TREATMENTS_URL}/treatment/${id}`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
}

const queries = {
    registerUser,
    logout,
    loginUser,
    currentUser,
    isUserRegistred,
    updateProfile,
    getRequestTreatments,
    updateUser,
    denyTreatmentRequest,
    acceptTreatmentRequest,
    getTreatmentsByUserId,
    getAllTreatmentsByUserId,
    getUserById,
    getTreatmentById
};

export default queries;