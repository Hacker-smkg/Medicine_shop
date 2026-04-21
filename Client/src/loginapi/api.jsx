import axios from "axios";

const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const loginUser = async (data) => {
    try {
        console.log(data)
        return await axios.post(`${URL}/login`,data);
    } catch (error) {
        console.error("Error while logging in:", error);
        return error.response;
    }
};
