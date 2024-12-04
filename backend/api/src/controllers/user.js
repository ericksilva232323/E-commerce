const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Ensure you have jwt installed and required

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
    const { email, password } = req.body;

    try {
        // Check if user exists by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, nome: user.nome, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Return user info and token
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

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