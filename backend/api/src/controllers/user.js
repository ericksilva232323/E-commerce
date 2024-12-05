const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const authRead = async (req, res) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  
      if (!token) {
        return res.status(401).json({ error: 'Token is required' });
      }
  
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid token' });
        }
  
        // Use decoded.id for the user ID
        const user = await prisma.user.findUnique({
          where: { id: decoded.id }, // Use decoded.id, which is the user ID from the token
          select: {
            id: true,
            name: true,
            email: true,
          },
        });
  
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        return res.json(user); // Send the user data back
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
const readAll = async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true, subname: true }, // Select fields to return
      });
  
      if (!users || users.length === 0) {
        return res.status(404).json({ error: 'No users found' });
      }
  
      return res.json(users); // Return all users
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }

        const token = jwt.sign(
            { id: user.id, nome: user.nome, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            user: { id: user.id, nome: user.nome, email: user.email },
            token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const create = async (req, res) => {
    const { name, subname, email, number, password, } = req.body;

    // Validation: Ensure required fields are present
    if (!name || !email || !password  || !number) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password.toString(), 10);

        // Create the user
        const user = await prisma.user.create({
            data: {
                name,
                subname: subname || null, // Use `null` if `subname` is not provided
                email,
                number,
                password: hashedPassword,
            },
        });

        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



module.exports = {
    readAll,
    authRead,
    login,
    create,
};
