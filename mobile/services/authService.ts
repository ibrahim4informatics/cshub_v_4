import * as SecureStorage from "expo-secure-store";
import fetcher from "../config/axios"
// import axios from "axios";



const loginUser = (data: any) => {

    return new Promise((res, rej) => {
        fetcher.post("/auth/login", data).then(response => res(response.data))
            .catch(err => rej(err.response));
    })
};
const registerUser = (data: any) => new Promise((res, rej) => {
    fetcher.post("/auth/register", data).then(response => res(response.data)).catch(err => rej(err.response))
})
const checkAuth = (): Promise<boolean> => new Promise((res, rej) => {
    fetcher.post("/auth/status").then(response => response.status === 200 && res(true)).catch(err => err.response.status === 401 && rej(false));
})



const sendOtp = async (data: any) => {


    try {

        const response = await fetcher.post("/auth/forgot-password", data);
        return response.status
    }

    catch (err: any) {
        throw err.response.status;
    }
}

const validateOtp = async (data: any) => {
    try {
        const response = await fetcher.post("/auth/forgot-password/check", data);
        return response.status;
    }

    catch (err: any) {
        throw err.response.status
    }
}

const changePasswordWithOtp = async (data: any) => {
    try {
        const response = await fetcher.patch("/auth/forgot-password", data);
        return response.status;

    }

    catch (err: any) {
        throw err.response.status;
    }

}

export {
    loginUser, checkAuth, registerUser, sendOtp, validateOtp, changePasswordWithOtp
}