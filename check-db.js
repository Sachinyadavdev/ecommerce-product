const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.capabilityPage.findUnique({
    where: { slug: 'green-energy-consumption' },
    include: { sections: { orderBy: { order: 'asc' } } }
  });
  if (!page) {
    console.log("Page not found");
    return;
  }
  console.log(page.sections.map(s => `${s.order}: ${s.type}`).join('\n'));
}
main().catch(console.error).finally(() => prisma.$disconnect());
