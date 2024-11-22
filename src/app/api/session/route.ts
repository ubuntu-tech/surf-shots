import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function handler(req: NextRequest) {
    const sessions = await prisma.session.findMany({ orderBy: { createdAt: 'desc' }, take: 15 })
    return NextResponse.json({ sessions })
}

export { handler as GET }