const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const read = async (req, res) => {

    if(!req.user){
        return res.status(401).json({ message: 'User is not authenticate'})
    }

    if(req.params.id !== undefined){
        const like = await prisma.like.findMany({
            where: {
                like: parseInt(req.paramns.id)
            },
            orderBy:{
                data:'desc'
            }
        });
        return res.json(like);
    }else{
        const product = await prisma.like.findMany();
        return res.json(product);
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

module.exports = {
    read,
    // auth
}

