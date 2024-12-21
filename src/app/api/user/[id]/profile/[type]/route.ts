import { NextRequest } from "next/server";
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: { id: string, type: string } }) {
    const { id, type } = await params

    console.log(id, type, (await req.json()))
    const user = await prisma.user.findUniqueOrThrow({ where: { id }, include: { profile: true } })

    const activeProfile = user.profile.find(profile => profile)
    console.log(activeProfile, user.profile)

    await prisma.userProfile.update({ where: { id: activeProfile!.id }, data: { type } })

    return NextResponse.json({ user })
}