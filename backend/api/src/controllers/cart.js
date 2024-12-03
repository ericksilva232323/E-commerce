const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const jwt = require('jsonwebtoken');
require('dotenv').config();

const read = async (req, res) => {

    if (!req.user) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    if(req.params.id !== undefined){
        const cart = await prisma.cart.findMany({
            where: {
                cart: parseInt(req.params.id)
            },
            orderBy:{
                data:'desc'
            }
        });
        return res.json(cart);
    }else{
        const cart = await prisma.cart.findMany();
        return res.json(cart);
    }
}

// const auth = (req, res, next) => {
//     const token = req.header.authorization?.split(' ')[1];

//     if(!token){
//         return res.status(401).json({message:'Token not provide'});
//     }

//     try{
//         const user = verifyToken(token);
//         req.user = user;
//         next();
//     } catch(error){
//         return res.status(401).json({message:'Token invalid'});
//     }
// };

module.export = {
    read,
    // auth
}
