import prisma from "../utils/prisma.js"

export const getUser = async(req, res) => {
    try{
        const {password, ...user} = await prisma.user.findUnique({
            where: { id: req.user.id }
        })

        return res.status(200).json({ user })
    }
    catch(err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}