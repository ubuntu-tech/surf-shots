import { NextRequest } from "next/server";
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

async function handler(req: NextRequest) {
    const type = req.url.split('/').pop()
    const urlPath = req.url.split('/')
    const id = urlPath[urlPath.length - 3]

    console.log(id, type, urlPath)

    const user = await prisma.user.findUniqueOrThrow({ where: { id }, include: { profile: true } })

    const activeProfile = user.profile.find(profile => profile)
    console.log(activeProfile, user.profile)

    await prisma.userProfile.update({ where: { id: activeProfile!.id }, data: { type } })

    return NextResponse.json({ user })
}

export { handler as POST }
