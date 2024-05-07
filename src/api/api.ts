const BASE_URL = 'http://localhost:8070' as const;
const API_URL = `${BASE_URL}/api` as const;
const AUTH_URL =  `${API_URL}/auth` as const;
const STORAGE_URL = `${BASE_URL}/media` as const;
const APPOINTMENT_URL =  `${API_URL}/appointment` as const;
const ACTIVITY_URL =  `${API_URL}/care-activity` as const;
const USER_URL =  `${API_URL}/users` as const;
const TREATMENTS_URL =  `${API_URL}/treatments` as const;
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
const updateNurse = async (nurse: any) => {
    try {
        if (nurse?.id === null || nurse?.id === undefined) return null;
        const response = await http.post(`${USER_URL}/updateNurse`, nurse);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
const getSpecialities = async () => {
    try {
        const response = await http.get(`${USER_URL}/specialities`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function getActivityRequests(userId: number, offset: number, limit = 5) {
    try {
        const response = await http.get(`${ACTIVITY_URL}?userId=${userId}&offset=${offset}&limit=${limit}`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function getAppointmentRequests(userId: number, offset: number, limit = 5) {
    try {
        const response = await http.get(`${APPOINTMENT_URL}?userId=${userId}&offset=${offset}&limit=${limit}`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function acceptAppointmentRequest(id: number) {
    try {
        if(!id && id !== 0) return null;
        const response = await http.put(`${APPOINTMENT_URL}/accept/${id}`, {});
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function cancelAppointmentRequest(id: number) {
    try {
        if(!id && id !== 0) return null;
        const response = await http.put(`${APPOINTMENT_URL}/cancel/${id}`, {});
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function rejectAppointmentRequest(id: number) {
    try {
        if(!id && id !== 0) return null;
        const response = await http.put(`${APPOINTMENT_URL}/reject/${id}`, {});
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function markAppointmentAsDone(id: number) {
    try {
        if(!id && id !== 0) return null;
        const response = await http.put(`${APPOINTMENT_URL}/complete/${id}`, {});
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function markAppointmentAsNotDone(id: number) {
    try {
        if(!id && id !== 0) return null;
        const response = await http.put(`${APPOINTMENT_URL}/uncomplete/${id}`, {});
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
//activity
async function acceptActivityRequest(id: number) {
    try {
        if(!id && id !== 0) return null;
        const response = await http.put(`${ACTIVITY_URL}/accept/${id}`, {});
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function cancelActivityRequest(id: number) {
    try {
        if(!id && id !== 0) return null;
        const response = await http.put(`${ACTIVITY_URL}/cancel/${id}`, {});
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function rejectActivityRequest(id: number) {
    try {
        if(!id && id !== 0) return null;
        const response = await http.put(`${ACTIVITY_URL}/reject/${id}`, {});
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function markActivityAsDone(id: number) {
    try {
        if(!id && id !== 0) return null;
        const response = await http.put(`${ACTIVITY_URL}/complete/${id}`, {});
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function markActivityAsNotDone(id: number) {
    try {
        if(!id && id !== 0) return null;
        const response = await http.put(`${ACTIVITY_URL}/uncomplete/${id}`, {});
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function getAppointmentById(id: number) {
    try {
        if(!id && id !== 0) return null;
        const response = await http.get(`${APPOINTMENT_URL}/${id}`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function getActivityById(id: number) {
    try {
        if(!id && id !== 0) return null;
        const response = await http.get(`${ACTIVITY_URL}/${id}`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function uploadImage(user_id: number, image: any) {
    try {
        if (!user_id && user_id !== 0) return null;
        let data = new FormData();
        data.append("file", image);
        const response = await http.postFile(`${STORAGE_URL}/upload-image/${user_id}`,data);
        if (response.ok) {
            return response.text();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function uploadFile(user_id: number, file: any) {
    try {
        if (!user_id && user_id !== 0) return null;
        let data = new FormData();
        data.append("file", file);
        const response = await http.postFile(`${STORAGE_URL}/upload/${user_id}`,data);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function getUserDocuments(user_id: number) {
    try {
        if (!user_id && user_id !== 0) return null;
        const response = await http.get(`${STORAGE_URL}/user-files/${user_id}`);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (e: any) {
        console.log(e.message)
    }
}
async function getAllUserDocuments(user_id: number) {
    try {
        if (!user_id && user_id !== 0) return null;
        const response = await http.get(`${STORAGE_URL}/user-files/all/${user_id}`);
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
    acceptAppointmentRequest,
    cancelAppointmentRequest,
    markAppointmentAsDone,
    getAppointmentById,
    markAppointmentAsNotDone,
    rejectAppointmentRequest,
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
    updateNurse,
    updateDoctor,
    getSpecialities,
    getActivityRequests,
    getAppointmentRequests,
    acceptActivityRequest,
    cancelActivityRequest,
    rejectActivityRequest,
    markActivityAsDone,
    markActivityAsNotDone,
    getActivityById,
    uploadImage,
    uploadFile,
    getUserDocuments,
    getAllUserDocuments
};
export default queries;