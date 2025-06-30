import { Router } from "express";
import path from "path"
import { z } from "zod"
import bcrypt from "bcrypt";
import prisma from "../utils/db.js";
import jwt from "jsonwebtoken";
import ENV from "../config/ENV.js";

const router = Router();

router.get("/login", (req, res) => {
    return res.sendFile(path.join(process.cwd(), "views", "login.html"));
})

router.post("/login", async (req, res) => {
    
    const schema = z.object({
        email: z.string().email(),
        password: z.string()
    })
    const { success, data } = schema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: "invalid email or password" })
    }

    try {
        const user = await prisma.user.findUnique({ where: { email: data.email } });
        if (!user) return res.status(401).json({ message: "invalid email or password" });

        if (!(await bcrypt.compare(data.password, user.password))) return res.status(401).json({ message: "invalid email or password" });

        const accessToken = await jwt.sign({ user_id: user.id }, ENV.JWT_ACCESS_SECRET, { expiresIn: "15m" })
        const refreshToken = await jwt.sign({ user_id: user.id }, ENV.JWT_ACCESS_SECRET, { expiresIn: "30d" })
        res.cookie("access", accessToken, { httpOnly: true, secure: ENV.mode === "production", sameSite: "strict", maxAge: 1000 * 60 * 15 });
        res.cookie("refresh", refreshToken, { httpOnly: true, secure: ENV.mode === "production", sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 30 });
        return res.status(200).json({ access: accessToken, refresh: refreshToken });
    }

    catch (err) {
        return res.status(401).json({ message: "invalid email or password" });
    }




})

export default router;