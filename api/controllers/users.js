
import prisma from "../utils/db.js";
const getUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user_id } });
        return res.status(200).json({ user })
    }

    catch (err) {
        console.log("Error is : \n" + err);
        return res.status(500).json({ message: "Can not get current user" })
    }
}


export {
    getUser
}