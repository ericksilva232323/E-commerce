const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

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

const create = async (req, res) => {
    console.log(req.body);
    const {nome, email,password} = req.body;
    if(!nome || !email || !password){
        return res.status(400).json({erro:"nome, email e senha são obrigatorios"});
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                nome,
                email,
                password: hashedPassword
            }
        });
        return res.status(201).json(user);
    } catch (error){
        console.error("erro ao criar user: ",error);
        return res.status(500).json({erro: "erro ao criar professor"});
    }
};


module.exports = {
    read,
    login,
    create
}