
import axios from "axios";
import * as secureStorage from "expo-secure-store";

const fetcher = axios.create(
    {
        baseURL: "https://cshub-v-4.onrender.com/",
        headers: {
            ["x-plateform"]: "Mobile"
        }
    }
)


fetcher.interceptors.response.use(
    (response) => response,
    async (err) => {
        const originalRequest = err.config
    

        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {

                await refreshToken();
                originalRequest.headers.Authorization = await secureStorage.getItemAsync("access");
                return fetcher(originalRequest);

            }

            catch (err) {
                return Promise.reject(err);
            }
        }


        return Promise.reject(err);
    }

)


const refreshToken = async () => {
    const refreshToken = await secureStorage.getItemAsync("refresh");
    if (!refreshToken)
        return false;

    try {

        const response = await fetcher.post("/auth/refresh", { refresh: refreshToken });
        await secureStorage.setItemAsync("access", response.data.access);
        return true;
    }
    catch (err) {
        return false
    }
}

export default fetcher;