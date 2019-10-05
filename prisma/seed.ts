
import { prisma } from '../src/generated/prisma-client'

async function main() {
  try {
    await prisma.createUser({
      email: 'aloo@kaloo.com',
      name: 'Aloo',
      password: 'goru'
    })
  } catch (e) {
    console.log(e)
  };
};

// Remember to call setup method in the end
main().catch(e => console.error(e))