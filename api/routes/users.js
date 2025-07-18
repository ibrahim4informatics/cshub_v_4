import { Router } from "express";
import {getUser} from "../controllers/users.js";
import isAuth from "../midlewares/auth.midleware.js";

const router = Router();



router.get("/", isAuth, getUser);

export default router;