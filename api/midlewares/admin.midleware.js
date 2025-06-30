import prisma from "../utils/db.js";

export default async (req, res, next) => {
    const id = req.user_id;
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user || !(user.is_admin)) {
            return res.status(403).json({ message: "action not allowed" });
        }
        return next();

    }
    catch (err) {
        return res.status(403).json({ message: "action not allowed" });
    }
}