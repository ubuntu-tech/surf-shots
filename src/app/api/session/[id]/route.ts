import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

async function handler(req: NextRequest) {
    const sessionId = req.url?.split('/').pop()
    const session = await prisma.session.findUnique({
        where: {
            id: sessionId
        },
        include: {
            user: true
        }
    })

    if (!session) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    
    const photosSession = session.photos_session as { watermark: string[] }
    const photos = photosSession.watermark

    return NextResponse.json({ 
        session: {
            placeName: session.placeName,
            photographerName: session.user.name,
            date: session.createdAt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
            thumbnailUrl: session.thumbnailUrl,
            photos
        }
    })
}

export { handler as GET }