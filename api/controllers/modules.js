import { z } from "zod";
import prisma from "../utils/db.js"
import zodErrorExtractor from "../utils/zodErrorExtractor.js"

const GetModuleQuerySchema = z.object({
    name: z.string().nullish(),
    coeficient: z.string().regex(/^\d+$/).transform(val => parseInt(val)).nullish(),
    page: z.string().regex(/^\d+$/).transform(val => parseInt(val)).default("1")
})
const getModules = async (req, res) => {
    const { success, data, error } = await GetModuleQuerySchema.safeParseAsync(req.query)
    if (!success) return res.status(400).json({ message: "invalid request", errors: zodErrorExtractor(error) });
    const fetchOptions = {}
    Object.keys(data).filter(param => param !== "page").forEach(param => fetchOptions[param] = data[param]);
    try {
        const modules_count = await prisma.module.count({ where: fetchOptions });
        const total_pages = Math.ceil(modules_count / 20);
        if (data.page > total_pages) return res.status(404).json({ modules: [], meta_data: null });
        const modules = await prisma.module.findMany({ where: fetchOptions, take: 20, skip: 20 * (data.page - 1) });
        return res.status(200).json({ modules, meta_data: { ...data, max_pages: total_pages } })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "can not get modules" })
    }
}

export {
    getModules
}