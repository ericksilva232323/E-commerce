const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const read = async (req, res) => {

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

module.exports = {
    read
}

