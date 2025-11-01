const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany({ take: 5 });
    console.log('OK — connected. sample users:', users);
  } catch (err) {
    console.error('Prisma/Mongo connection test failed:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();