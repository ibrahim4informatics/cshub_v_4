import jwt from "jsonwebtoken";
import ENV from "../config/ENV.js";
import prisma from "../utils/db.js";

export default async (req, res, next) => {
    const token = req.headers.authorization || req.cookies.access;
    if (!token) {
        if (req.headers["x-plateform"] == "Mobile") {
            console.log("first")
            return res.status(401).json({ message: "user is not authenticated" });
        }
        if (req.cookies.refresh) {
            const rtoken = req.cookies.refresh;
            try {
                const payload = jwt.verify(rtoken, ENV.JWT_REFRESH_SECRET);
                const user = await prisma.user.findUnique({ where: { id: payload.user_id } });
                if (!user || !user.is_admin) return res.redirect("/auth/login");
                const newToken = jwt.sign({ user_id: payload.user_id }, ENV.JWT_ACCESS_SECRET, { expiresIn: "15m" });
                res.cookie("access", newToken, { httpOnly: true, sameSite: "strict", secure: ENV.MODE === "production", maxAge: 1000 * 60 * 15 });
                req.user_id = payload.user_id;
                return next();
            }
            catch (err) {
                console.log(err)
                return res.redirect("/auth/login");
            }
        }
        return res.redirect("/auth/login");
    };
    try {
        const payload = await jwt.verify(token, ENV.JWT_ACCESS_SECRET);
        req.user_id = payload.user_id;
        return next();
    }
    catch (err) {
        if (req.headers["x-plateform"] == "Mobile") {

            return res.status(401).json({ message: "user is not authenticated" });
        }
        return res.redirect("/auth/login");
    }
}