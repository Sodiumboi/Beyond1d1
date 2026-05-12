import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const CreateCharacterSchema = z.object({
  name: z.string().min(1).max(100),
  campaignId: z.string().optional(),
})

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const characters = await prisma.character.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      name: true,
      status: true,
      campaignId: true,
      schemaVersion: true,
      createdAt: true,
      updatedAt: true,
      sheetData: true,
      campaign: { select: { name: true } },
    },
  })

  return NextResponse.json(characters)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = CreateCharacterSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const character = await prisma.character.create({
    data: {
      name: parsed.data.name,
      userId: session.user.id,
      campaignId: parsed.data.campaignId ?? null,
      sheetData: {},
    },
  })

  return NextResponse.json(character, { status: 201 })
}
