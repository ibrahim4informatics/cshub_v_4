import { Router } from "express";
import { checkUserAutentication, getLoginRoute, loginUsers, registerNewUser } from "../controllers/auth.js";
import isAuth from "../midlewares/auth.midleware.js";
const router = Router();

router.get("/login", getLoginRoute);
router.post("/login", loginUsers);


router.post("/register", registerNewUser);
router.post("/status", isAuth, checkUserAutentication);

export default router;