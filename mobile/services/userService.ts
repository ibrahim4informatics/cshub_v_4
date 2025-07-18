import fetcher from "@/config/axios"
import * as secureStore from "expo-secure-store";
const getUser = async () => {

    try {
        const response = fetcher.get("/users", { headers: { Authorization: await secureStore.getItemAsync("access") } });
        return response;

    }
    catch (err: any) {
        throw err.response;
    }
}


export { getUser }