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

export {
    loginUser, checkAuth, registerUser
}