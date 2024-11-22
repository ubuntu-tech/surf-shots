import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function handler() {
    const sessions = await prisma.session.findMany({ orderBy: { createdAt: 'desc' }, take: 15, include: { user: true } })
    const recentSessions = sessions.map((session) => {
        return {
            id: session.id,
            thumbnailUrl: session.thumbnailUrl,
            photographerName: session.user.name,
            location: session.placeName,
            date: session.createdAt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
        }
    })
    return NextResponse.json({ sessions: recentSessions })
}

export { handler as GET }
