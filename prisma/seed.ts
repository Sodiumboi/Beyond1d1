// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing seed data
  await prisma.character.deleteMany({ where: { name: { startsWith: '[SEED]' } } })
  await prisma.campaign.deleteMany({ where: { name: { startsWith: '[SEED]' } } })

  // Create a test user (in real use, users are created via Discord OAuth)
  const user = await prisma.user.upsert({
    where: { email: 'test@openvtt.dev' },
    update: {},
    create: {
      email: 'test@openvtt.dev',
      displayName: 'Test DM',
    },
  })

  // Create a test campaign
  const campaign = await prisma.campaign.create({
    data: {
      name: '[SEED] Curse of Strahd',
      description: 'A gothic horror campaign in the land of Barovia.',
      ownerId: user.id,
    },
  })

  // Create a test character
  await prisma.character.create({
    data: {
      name: '[SEED] Tharivol Moonwhisper',
      userId: user.id,
      campaignId: campaign.id,
      sheetData: {
        STR: 12, DEX: 18, CON: 14, INT: 10, WIS: 16, CHA: 8,
        LEVEL: 8, PROF: 3, AC: 16, MAX_HP: 62, CURRENT_HP: 62,
        class: 'Ranger', race: 'Wood Elf',
      },
    },
  })

  console.log('✅ Seed complete')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())