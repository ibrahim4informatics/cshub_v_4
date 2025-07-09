import { Router } from "express";
const router = Router();
import { getModules } from "../controllers/modules.js";


router.get("/", getModules)

export default router;