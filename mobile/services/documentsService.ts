import fetcher from "@/config/axios";

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

    catch (err:any) {
        console.log(err)
        return err.response
    }

}


export { getDocuments }