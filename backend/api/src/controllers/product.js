const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const read = async (req, res) => {
    if(req.params.id !== undefined) {
        const product = await prisma.product.findMany({
            where: {
                product: parseInt(req.params.id)
            },
            orderBy:{
                data:'desc'
            }
        });
        return res.json(product);
    }else{
        const product = await prisma.product.findMany();
        return res.json(product);
    }
}

module.exports = {
    read
}