import { SessionCardSkeleton } from "../common/SessionCard"

const RecentSessionsSkeleton = () => {
  return (
    <section className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <h2 className="text-2xl font-semibold mb-8 mt-8">Recent Sessions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <SessionCardSkeleton key={index} />
        ))}
      </div>
    </section>
  )
}

export default RecentSessionsSkeleton