import { z } from "zod";
import zodErrorExtractor from "../utils/zodErrorExtractor.js";
import prisma from "../utils/db.js";
const GetDocumentQuerySchema = z.object({
    page: z.string().regex(/^\d+$/, { message: "page must be digit" }).default("1").transform(value => parseInt(value)),
    document_per_page: z.string().regex(/^\d+$/, { message: "page must be digit" }).default("20").transform(value => parseInt(value)),
    title: z.string().nullish(),
    type: z.enum(["COURS", "TD", "EXAM"]).nullish(),
    module_id: z.string().regex(/^\d+$/, { message: "page must be digit" }).transform(value => parseInt(value)).nullish()
});

const getDocuments = async (req, res) => {


    // define the shcema for get document query to filter

    const { success, data, error } = await GetDocumentQuerySchema.safeParseAsync(req.query);
    // validate the request query
    if (!success) {
        return res.json({ query: req.query, errors: zodErrorExtractor(error) });
    }
    // building the where prisma clause object
    const queryParams = Object.keys(data);
    const fetchOptions = {};
    queryParams.forEach(param => {
        if (param !== "page" && param !== "document_per_page") {
            if (param === "title") {
                fetchOptions["title"] = { contains: data[param] }
            }
            else {

                fetchOptions[param] = data[param]
            }
        }
    })

    try {
        const documents_count = await prisma.document.count({ where: fetchOptions });
        const max_page = Math.ceil(documents_count / data.document_per_page);
        if (data.page > max_page) {
            return res.status(404).json({ documents: [], meta_data: null });
        }
        const documents = await prisma.document.findMany({
            where: fetchOptions,
            include: { module: true, favourite_by: true },
            take: data.document_per_page,
            skip: data.document_per_page * (data.page - 1)
        });

        const favouriteDocsIds = (await prisma.favourite.findMany({ where: { user_id: req.user_id }, select: { document_id: true } })).map(idobj => idobj.document_id);

        return res.status(200).json({
            documents: documents.map(doc => {
                return { ...doc, is_favourite: favouriteDocsIds.includes(doc.id) ? true : false }
            }), meta_data: { ...data, max_page }
        });
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "can not get documents" })
    }

}

const getFavouriteDocuments = async (req, res) => {


    const user_id = req.user_id;


    const { success, error, data } = await GetDocumentQuerySchema.safeParseAsync(req.query);
    if (!success) return res.status(400).json({ message: "can not get favourites invalid params" });
    const fetchOptions = {}
    const params = Object.keys(data).filter(param => (param !== "page" && param !== "document_per_page"));
    params.forEach(param => {
        if (param === "title") {
            fetchOptions[param] = { contains: data[param] }
        }
        else {
            fetchOptions[param] = data[param]
        }
    });

    try {
        const total_favourites = await prisma.favourite.count({ where: { user_id, document: fetchOptions } });
        const max_page = Math.ceil(total_favourites / data.document_per_page);

        if (data.page > max_page) return res.status(404).json({ favourites: [], meta_data: null });
        const favourites = await prisma.favourite.findMany({ where: { user_id, document: fetchOptions }, include: { document: { include: { module: true } } }, take: data.document_per_page, skip: data.document_per_page * (data.page - 1) });
        return res.status(200).json({ favourites, meta_data: { ...data, max_page } });
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "can not get favourites" });
    }

}


const addDocumentToFavourites = async (req, res) => {

    const { document_id } = req.params;
    const user_id = req.user_id;

    try {
        const exist = await prisma.favourite.findFirst({ where: { user_id, document_id: parseInt(document_id) } });
        if (exist) return res.status(400).json({ message: "the document is already in favourite list" });
        await prisma.favourite.create({ data: { user_id, document_id: parseInt(document_id) } });
        return res.status(201).json({ message: "document added to favourites list" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "can not add favourite documents" });
    }
}


const removeDocumentFromFavourites = async (req, res) => {
    const { document_id } = req.params;
    const user_id = req.user_id;

    try {
        const exist = await prisma.favourite.findFirst({ where: { user_id, document_id: parseInt(document_id) } });
        if (!exist) return res.status(404).json({ message: "can not delete favourite not found" });
        await prisma.favourite.delete({ where: { document_id: parseInt(document_id), user_id, id:exist.id } });
        return res.status(200).json({ message: "document deleted from favourites list" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "can not delete favourite documents" });
    }

}


export {
    getDocuments, getFavouriteDocuments, addDocumentToFavourites, removeDocumentFromFavourites
}