import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({
      status: 'ok',
      db: 'ok',
      version: process.env.npm_package_version ?? '0.0.1',
      timestamp: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json({ status: 'error', db: 'unreachable' }, { status: 503 })
  }
}
