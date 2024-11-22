import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function handler(req: NextRequest) {
    // const sessions = await prisma.session.findMany({ orderBy: { createdAt: 'desc' }, take: 15 })
    const sessions = [
        {
          id: '1',
          thumbnailUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f',
          photographerName: 'João Silva',
          location: 'Praia do Rosa, SC',
          date: '15 Mar 2024'
        },
        {
          id: '2',
          thumbnailUrl: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692',
          photographerName: 'Maria Santos',
          location: 'Fernando de Noronha, PE',
          date: '14 Mar 2024'
        },
        {
          id: '3',
          thumbnailUrl: 'https://images.unsplash.com/photo-1516370873344-fb7c61054fa9?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          photographerName: 'Pedro Costa',
          location: 'Maresias, SP',
          date: '13 Mar 2024'
        },
        {
          id: '4',
          thumbnailUrl: 'https://images.unsplash.com/photo-1476574898132-040f50db0a01?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          photographerName: 'Pedro Costa',
          location: 'Maresias, SP',
          date: '13 Mar 2024'
        },
        {
          id: '5',
          thumbnailUrl: 'https://images.unsplash.com/photo-1505937059382-aab581fd88c8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          photographerName: 'Pedro Costa',
          location: 'Maresias, SP',
          date: '13 Mar 2024'
        }
      ];
    return NextResponse.json({ sessions })
}

export { handler as GET }
