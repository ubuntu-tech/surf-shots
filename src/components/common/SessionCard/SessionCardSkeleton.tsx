const SessionCardSkeleton = () => {
  return (
    <div className="rounded-lg bg-gray-200 animate-pulse">
      <div className="h-48 bg-gray-300 rounded-t-lg" /> {/* Thumbnail */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-2/3" /> {/* Photographer name */}
        <div className="h-4 bg-gray-300 rounded w-1/2" /> {/* Location */}
        <div className="h-4 bg-gray-300 rounded w-1/3" /> {/* Date */}
      </div>
    </div>
  )
}

export default SessionCardSkeleton