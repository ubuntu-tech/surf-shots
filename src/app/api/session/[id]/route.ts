import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function handler(req: NextRequest) {
    const sessionId = req.url?.split('/').pop()
    const session = await prisma.session.findUnique({
        where: {
            id: sessionId
        }
    })

    if (!session) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    return NextResponse.json({ session })
}

export { handler as GET }