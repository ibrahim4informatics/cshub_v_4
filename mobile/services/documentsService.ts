import fetcher from "@/config/axios";
import * as secureStore from "expo-secure-store";

const getDocuments = async (filters: any) => {


    try {

        const params: { [key: string]: any } = {}

        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                params[key] = filters[key];
            }
        })

        const { data } = await fetcher.get("/documents", { params });
        return data;

    }
    catch (err: any) {
        return err
    }

}


const getFavouritesDocuments = async (filters: { [key: string]: any }) => {
    try {

        const params: { [key: string]: any } = {}

        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                params[key] = filters[key];
            }
        })

        const { data } = await fetcher.get("/documents/favourites", { params, headers: { Authorization: await secureStore.getItemAsync("access") } });
        return data;

    }

    catch (err: any) {
        throw err.response.status
    }
}


const addTofavourites = async (id: any) => {

    try {

        const response = await fetcher.post(`/documents/favourites/${id}`, null, { headers: { Authorization: await secureStore.getItemAsync("access") } });
        return response.status;

    }

    catch (err: any) {
        return err.response.status;
    }





};

const removeFromFavourites = async (id: any) => {
    try {

        const response = await fetcher.delete(`/documents/favourites/${id}`);
        return response.status;
    }

    catch (err: any) {
        return err.response.status
    }
}


const getAllModules = async () => {
    try {

        const response = fetcher.get("/modules");
        return response;

    }

    catch (err) {
        throw err;
    }
}
export { getDocuments, getFavouritesDocuments, addTofavourites, removeFromFavourites, getAllModules }