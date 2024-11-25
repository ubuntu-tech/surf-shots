'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { FiltersSection } from '@/components/FiltersSection'
import useSWR from 'swr'
import { SessionCard } from '@/components/common/SessionCard'
import { usePathname } from 'next/navigation'

// Types
interface Session {
  date: string
  thumbnailUrl: string
  userId: string
  placeName: string
  id: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()

  const { data, } = useSWR<{ sessions: Session[] }>('/api/session/recent', fetcher)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-oceanBlue py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white font-primary mb-6 text-center">
            Discover Your Perfect Wave
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate" />
            </div>
            <input
              type="text"
              placeholder="Search by location, photographer, or style..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-seaFoam bg-white font-secondary focus:ring-2 focus:ring-sunsetGold focus:border-transparent outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <FiltersSection />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.sessions.map((session) => (
              <SessionCard
                size="large"
                key={session.id}
                thumbnailUrl={session.thumbnailUrl}
                photographerName={session.userId}
                location={session.placeName!}
                date={session.date}
                url={pathname!}
                id={session.id}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default DiscoverPage