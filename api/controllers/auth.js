import bcrypt from "bcrypt";
import prisma from "../utils/db.js";
import jwt from "jsonwebtoken";
import ENV from "../config/ENV.js";
import zodErrorExtractor from "../utils/zodErrorExtractor.js";


const getLoginRoute = (req, res) => {
    return res.sendFile(path.join(process.cwd(), "views", "login.html"));
}

const loginUsers = async (req, res) => {

    const schema = z.object({
        email: z.string().email(),
        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/, { message: "the password is not valid" })
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




}


const registerNewUser = async (req, res) => {
    const schema = z.object({
        email: z.string().email(),
        first_name: z.string().min(3).max(35),
        last_name: z.string().min(3).max(35),
        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/, { message: "the password does not fill all requirements" })
    })
    const { data, error, success } = schema.safeParse(req.body);
    if (!success) return res.status(400).json({ errors: zodErrorExtractor(error) });
    try {
        const user = await prisma.user.findUnique({ where: { email: data.email } });
        if (user) return res.status(400).json({ errors: [{ email: "the email is in use" }] });
        const newUser = await prisma.user.create({ data: { ...data, password: await bcrypt.hash(data.password, 12) } });
        return res.status(201).json(newUser);
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "can not create the user at the moment" });
    }
}

const checkUserAutentication = (req, res) => {

    return res.status(403).json({ message: "User is Logged In" })

}

export {
    getLoginRoute, loginUsers, registerNewUser, checkUserAutentication
}