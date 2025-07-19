import bcrypt from "bcrypt";
import prisma from "../utils/db.js";
import jwt from "jsonwebtoken";
import ENV from "../config/ENV.js";
import zodErrorExtractor from "../utils/zodErrorExtractor.js";
import path from "path";
import { z } from "zod";
import otpGenerator from "otp-generator";
import { resetPasswordEmailBuilder, transport } from "../config/nodemailer.js";


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
        const user = await prisma.user.findUnique({ where: { email: data.email }, select: { password: true, id: true } });
        if (!user) return res.status(404).json({ message: "invalid email or password" });

        if (!(await bcrypt.compare(data.password, user.password))) {
            return res.status(401).json({ message: "invalid email or password" });
        }
        const accessToken = await jwt.sign({ user_id: user.id }, ENV.JWT_ACCESS_SECRET, { expiresIn: "15m" })
        const refreshToken = await jwt.sign({ user_id: user.id }, ENV.JWT_REFRESH_SECRET, { expiresIn: "30d" })
        res.cookie("access", accessToken, { httpOnly: true, secure: ENV.mode === "production", sameSite: "strict", maxAge: 1000 * 60 * 15 });
        res.cookie("refresh", refreshToken, { httpOnly: true, secure: ENV.mode === "production", sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 30 });
        return res.status(200).json({ access: accessToken, refresh: refreshToken });
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "invalid email or password" });
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

    return res.status(200).json({ message: "User is Logged In" })

}


const refreshToken = async (req, res) => {
    if (req.headers["x-plateform"] === "Mobile") {

        const refreshToken = req.body.refresh;
        if (!refreshToken) return res.status(401).json({ message: "user is not authenticated" });
        try {
            const payload = await jwt.verify(refreshToken, ENV.JWT_REFRESH_SECRET);
            const newAccessToken = jwt.sign({ user_id: payload.user_id }, ENV.JWT_ACCESS_SECRET, { expiresIn: "15m" });
            return res.status(200).json({ access: newAccessToken });
        }
        catch (err) {
            return res.status(401).json({ message: "user is not authenticated" });
        }
    }
    else {
        return res.status(404).json({ message: "Route Was not found" });
    }
}



const forgotPasswordOtpSender = async (req, res) => {
    const bodySchema = z.object({
        email: z.string().email()
    })

    try {

        const body = await bodySchema.safeParseAsync(req.body);
        if (!(body.success)) return res.status(400).json({ errors: zodErrorExtractor(body.error) });

        const user = await prisma.user.findUnique({ where: { email: body.data.email } });
        if (!user) return res.status(404).json({ message: "user does not exist with this email" });

        if (user.otp_code_id) {
            await prisma.otp.delete({ where: { id: user.otp_code_id } });
        }

        const value = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false, digits: true });
        await prisma.otp.create({ data: { value, user: { connect: { id: user.id } } } });


        await transport.sendMail(
            {
                from: `"CSHUB" <${ENV.EMAIL}>`,
                to: user.email,
                subject: "Reset Password Otp",
                html: resetPasswordEmailBuilder(value)
            }
        )
        return res.status(200).json({ message: "Otp code has been sent" });
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err || "something happend please try again" });
    }

}


const checkValidOtp = async (req, res) => {
    const schema = z.object({
        email: z.string().email(),
        otp: z.string().regex(/^\d+$/, { message: "otp contains only digits" }).length(6, { message: "Otp has 6 digits" })
    })

    try {

        const body = await schema.safeParseAsync(req.body);
        if (!(body.success)) return res.status(400).json({ errors: zodErrorExtractor(body.error) });

        const user = await prisma.user.findUnique({ where: { email: body.data.email } });
        if (!user) return res.status(404).json({ message: "invalid otp sent" });
        const otp = await prisma.otp.findUnique({ where: { id: user.otp_code_id } });
        const now = new Date();
        const diffMinutes = Math.floor((now - otp.created_at) / (1000 * 60));
        if (!otp || otp.attempt >= 3 || diffMinutes > 10) return res.status(401).json({ message: "Otp is invalid or expired" });
        if (otp.value !== body.data.otp) {
            await prisma.otp.update({ where: { id: otp.id }, data: { attempt: otp.attempt + 1 } });
            return res.status(401).json({ message: "the otp code is not valid" });
        }
        return res.status(200).json({ message: "Otp Code is Correct" });

    }

    catch (err) {
        return res.status(500).json({ message: err || "something happend try later" });
    }
}


const resetPasswordWithOtp = async (req, res) => {
    const schema = z.object({
        email: z.string().email(),
        otp: z.string().regex(/^\d+$/, { message: "Otp should contain only digits" }).length(6, { message: "Otp has 6 digits" }),
        new_password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/, { message: "the password does not fill all requirements" })
    })

    try {

        const body = await schema.safeParseAsync(req.body);

        if (!(body.success)) return res.status(400).json({ errors: zodErrorExtractor(body.error) });

        const user = await prisma.user.findUnique({ where: { email: body.data.email } });
        if (!user) return res.status(404).json({ message: "can not find otp linked to this user" });


        const otp = await prisma.otp.findUnique({ where: { id: user.otp_code_id } });
        const now = new Date();
        const diffMinutes = Math.floor((now - otp.created_at) / (1000 * 60));
        if (!otp || otp.attempt >= 3 || diffMinutes > 10) return res.status(401).json({ message: "Otp is invalid or expired" });
        if (otp.value !== body.data.otp) {
            await prisma.otp.update({ where: { id: otp.id }, data: { attempt: otp.attempt + 1 } });
            return res.status(401).json({ message: "the otp code is not valid" });
        }
        await prisma.user.update({ where: { email: user.email }, data: { password: await bcrypt.hash(body.data.new_password, 12) } })
        return res.status(200).json({ message: "Password has been changed successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: err || "something happend try later" });
    }
}

export {
    getLoginRoute, loginUsers, registerNewUser, checkUserAutentication, refreshToken, forgotPasswordOtpSender, checkValidOtp,resetPasswordWithOtp
}