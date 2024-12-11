import { readFile } from 'fs/promises';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const data = JSON.parse(
    await readFile(new URL('./dados/dados.json', import.meta.url))
  );

  // Seed Product data
  for (const product of data.Product) {
    await prisma.product.create({ data: product });
  }

  // Seed User data
  for (const user of data.User) {
    await prisma.user.create({ data: user });
  }

  // Seed Cart data
  for (const cart of data.Cart) {
    await prisma.cart.create({ data: cart });
  }

  // Seed Like data
  for (const like of data.Like) {
    await prisma.like.create({ data: like });
  }

  // Seed Pay data
  for (const pay of data.Pay) {
    await prisma.pay.create({ data: pay });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });