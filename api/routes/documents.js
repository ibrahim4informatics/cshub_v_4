import { Router } from "express";
import { addDocumentToFavourites, getDocuments, getFavouriteDocuments, removeDocumentFromFavourites } from "../controllers/documents.js";
import isAuth from "../midlewares/auth.midleware.js"
const router = Router();



router.get("/", isAuth,getDocuments);

router.post("/favourites/:document_id", isAuth, addDocumentToFavourites);
router.delete("/favourites/:document_id", isAuth, removeDocumentFromFavourites);

router.get("/favourites", isAuth, getFavouriteDocuments);


export default router;