const BASE_URL = 'http://localhost:8070/api' as const;
const AUTH_URL =  `${BASE_URL}/auth`;
const PROFILE_URL =  `${BASE_URL}/profile`;
const USER_URL =  `${BASE_URL}/users`;
const TREATMENTS_URL =  `${BASE_URL}/treatments`;
import { User, UserProfile } from "@/types/types";
import http from "./http";
const registerUser = async (user: User) => {
    try {
        if(user === null || user === undefined) return null;
        const response: any = await http.post(`${AUTH_URL}/register`, user);
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
        if(user === null || user === undefined) return null;
        const response: any = await http.post(`${AUTH_URL}/login`, user);
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
        const response: any = await http.get(`${AUTH_URL}/current-user`);
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
        if (!profile?.id) return null;
        delete profile.lastModifiedDate;
        delete profile.creationDate;
        const response: any = await http.put(`${AUTH_URL}/user/saveProfile`, profile);
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
        if (user === null || user === undefined) return null;
        const response: any = await http.put(`${AUTH_URL}/user/update`, user);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
};

const initUserRole = async (user: User) => {
    try {
        if (user === null || user === undefined) return null;
        const response: any = await http.put(`${AUTH_URL}/user/update-role`, user);
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
        if (id === null || id ===undefined) return null;
        const response: any = await http.get(`${USER_URL}/${id}`);
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
        if (userId === null || userId === undefined) return null;
        const response: any = await http.get(`${TREATMENTS_URL}/requests/${userId}`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
};
const denyTreatmentRequest = async (id: number) => {
    try {
        if (id === null || id ===undefined) return null;
        const response: any = await http.put(`${TREATMENTS_URL}/deny/${id}`, {});
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
}
const acceptTreatmentRequest = async (id: number) => {
    try {
        if (id === null || id ===undefined) return null;
        const response: any = await http.put(`${TREATMENTS_URL}/accept/${id}`, {});
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
}
const updateRequestStatus = async (id: number,status:string) => {
    try {
        if (id === null || id ===undefined) return null;
        const response: any = await http.put(`${TREATMENTS_URL}/status/${id}`, { status });
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
        if (id === null || id ===undefined) return null;
        const response: any = await http.get(`${TREATMENTS_URL}/${id}?offset=${offset}&limit=${limit}`);
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
        if (id === null || id ===undefined) return null;
        const response: any = await http.get(`${TREATMENTS_URL}/all/${id}`);
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
        if (id === null || id ===undefined) return null;
        const response: any = await http.get(`${TREATMENTS_URL}/treatment/${id}`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
}
const getTreatmentByRequestId = async (id: number) => {
    try {
        if (id === null || id ===undefined) return null;
        const response: any = await http.get(`${TREATMENTS_URL}/treatment-by-request/${id}`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
}
const addTreatment = async (treatment: any) => {
    try {
        const response: any = await http.post(`${TREATMENTS_URL}/add-treatment`, treatment);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
}
const updateTreatment = async (treatment: any) => {
    try {
        const response: any = await http.put(`${TREATMENTS_URL}/update-treatment`, treatment);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        return null;
    }
}
const deleteTreatmentRequestById = async (id: number) => {
    try {
        if (id === null || id ===undefined) return null;
        await http.delete(`${TREATMENTS_URL}/request/${id}`);
    } catch (e: any) {
        console.log(e.message)
    }
}
const updateDoctor = async (doctor: any) => {
    try {
        if (doctor?.id === null || doctor?.id === undefined) return null;
        const response = await http.post(`${USER_URL}/updateDoctor`, doctor);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
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
    initUserRole,
    denyTreatmentRequest,
    acceptTreatmentRequest,
    getTreatmentsByUserId,
    getAllTreatmentsByUserId,
    getUserById,
    getTreatmentById,
    addTreatment,
    updateRequestStatus,
    getTreatmentByRequestId,
    updateTreatment,
    deleteTreatmentRequestById,
    updateDoctor
};

export default queries;