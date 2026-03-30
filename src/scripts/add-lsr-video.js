const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slug = 'lsr-moulding';
  const page = await prisma.capabilityPage.findUnique({
    where: { slug },
    include: { sections: { orderBy: { order: 'asc' } } }
  });

  if (!page) {
    console.log(`Page '${slug}' not found`);
    return;
  }

  console.log("Current sections:");
  page.sections.forEach(s => console.log(`  ${s.order}: ${s.type}`));

  const existingVideo = page.sections.find(s => s.type === 'lsr-video');
  if (existingVideo) {
    console.log("lsr-video already exists at order:", existingVideo.order);
    return;
  }

  // Insert after order=2 (lsr-overview). Shift orders of sections with order >= 3
  const sectionsToShift = page.sections.filter(s => s.order >= 3);
  for (const section of sectionsToShift) {
    await prisma.capabilitySection.update({
      where: { id: section.id },
      data: { order: section.order + 1 }
    });
  }

  // Create lsr-video at order 3
  await prisma.capabilitySection.create({
    data: {
      type: 'lsr-video',
      order: 3,
      content: {
        videoUrl: "",
        posterImage: "/images/lsr-moulding-facility.png",
        title: ""
      },
      pageId: page.id
    }
  });

  console.log("Added lsr-video at order 3");
  const updated = await prisma.capabilityPage.findUnique({
    where: { slug },
    include: { sections: { orderBy: { order: 'asc' } } }
  });
  updated.sections.forEach(s => console.log(`  ${s.order}: ${s.type}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
