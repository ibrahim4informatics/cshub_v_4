import { Router } from "express";
import { checkUserAutentication, getLoginRoute, loginUsers, registerNewUser, refreshToken, forgotPasswordOtpSender, checkValidOtp, resetPasswordWithOtp } from "../controllers/auth.js";
import isAuth from "../midlewares/auth.midleware.js";
const router = Router();

router.get("/login", getLoginRoute);
router.post("/login", loginUsers);


router.post("/register", registerNewUser);
router.post("/status", isAuth, checkUserAutentication);
router.post("/refresh", refreshToken);

router.post("/forgot-password", forgotPasswordOtpSender);
router.post("/forgot-password/check", checkValidOtp);
router.patch("/forgot-password", resetPasswordWithOtp);


export default router;