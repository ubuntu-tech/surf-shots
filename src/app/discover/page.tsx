'use client'

import { FiltersSection } from '@/components/FiltersSection'
import useSWR from 'swr'
import { SessionCard } from '@/components/common/SessionCard'
import { usePathname } from 'next/navigation'
import { SearchBar } from '@/components/SearchBar'

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
  const pathname = usePathname()

  const { data, } = useSWR<{ sessions: Session[] }>('/api/session/recent', fetcher)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-oceanBlue py-16 bg-[url('https://images.unsplash.com/photo-1503888162233-e16bea2cef78?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white font-primary mb-6 text-center pt-16">
            Discover Your Perfect Wave
          </h1>

          <div className="max-w-2xl mx-auto relative mb-8">
            <SearchBar />
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