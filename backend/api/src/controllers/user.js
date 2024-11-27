const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const read = async (req, res) => {
    if(req.params.id !== undefined){
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            select: {
                id: true,
                user: true
            }
        });
    }
}

const login = async (req, res) => {
    const { password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            password:password
        }, select: {
            id: true,
            user: true
        }
    });
    if (user === null){
        return res.status(401).json("Password Failed");
    }
    return res.json(user);
}

module.exports = {
    read,
    login
}