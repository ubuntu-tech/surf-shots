import { PiHeartLight, PiHeartFill, PiShareNetworkLight } from "react-icons/pi"
import { useState } from "react"

interface SessionActionsProps {
  onShare?: () => void;
  initialLiked?: boolean;
  onLikeChange?: (isLiked: boolean) => void;
}

function SessionActions({ 
  onShare, 
  initialLiked = false,
  onLikeChange 
}: SessionActionsProps) {
  const [isLiked, setIsLiked] = useState(initialLiked)

  const handleLike = () => {
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    onLikeChange?.(newLikedState)
  }

  return (
    <div className="flex items-center pr-3">
      <button 
        onClick={handleLike}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        {isLiked ? (
          <PiHeartFill className="w-5 h-5 text-red-500" />
        ) : (
          <PiHeartLight className="w-5 h-5 text-gray-600" />
        )}
      </button>
      <button 
        onClick={onShare}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <PiShareNetworkLight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  )
}

export default SessionActions