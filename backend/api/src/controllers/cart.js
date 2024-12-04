const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const read = async (req, res) => {

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

module.export = {
    read
}
