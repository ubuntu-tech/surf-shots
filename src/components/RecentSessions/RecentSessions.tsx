'use client'

import { usePathname } from "next/navigation";
import SessionCard from "../common/SessionCard/SessionCard";
import useSWR from 'swr'
import { LoadingSpinner } from "../common/LoadingSpinner";
import RecentSessionsSkeleton from "./RecentSessionsSkeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const RecentSessions = () => {
  const pathname = usePathname()
  const { data, error, isLoading } = useSWR<{ sessions: any[] }>('/api/session/recent', fetcher)

  if (isLoading) {
    return <RecentSessionsSkeleton />
  }
  if (error) return <div>Error: {error.message}</div>

  console.log(data)

  return (
    <section className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
    <h2 className="text-2xl font-semibold mb-8 mt-8">Recent Sessions</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.sessions?.map((session) => (
        <SessionCard
          key={session.id}
          thumbnailUrl={session.thumbnailUrl}
          photographerName={session.photographerName}
          location={session.location}
          date={session.date}
          url={pathname}
          id={session.id}
        />
      ))}
      </div>
    </section>
  );
};

export default RecentSessions;
