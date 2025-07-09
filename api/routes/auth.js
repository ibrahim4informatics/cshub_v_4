import { Router } from "express";
import { checkUserAutentication, getLoginRoute, loginUsers, registerNewUser, refreshToken } from "../controllers/auth.js";
import isAuth from "../midlewares/auth.midleware.js";
const router = Router();

router.get("/login", getLoginRoute);
router.post("/login", loginUsers);


router.post("/register", registerNewUser);
router.post("/status", isAuth, checkUserAutentication);
router.post("/refresh", refreshToken)

export default router;