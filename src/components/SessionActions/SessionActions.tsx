import { PiHeartLight, PiHeartFill, PiShareNetworkLight } from "react-icons/pi"
import { useState } from "react"
import { useToast } from "../Toast/ToastContext"
import { useFeatureFlagEnabled } from "posthog-js/react";

interface SessionActionsProps {
  onShare?: () => void;
  initialLiked?: boolean;
  onLikeChange?: (isLiked: boolean) => void;
  url?: string;
}

function SessionActions({ 
  onShare, 
  initialLiked = false,
  onLikeChange,
  url,
}: SessionActionsProps) {
  const [isLiked, setIsLiked] = useState(initialLiked)
  const { showToast } = useToast()
  const showShareButton = useFeatureFlagEnabled('show-share-button')

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    onLikeChange?.(newLikedState)
  }

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (onShare) {
      onShare()
      return
    }

    if (navigator.share) {
      try {
        await navigator.share({
          url,
          title: document.title,
        })
        showToast('Link shared successfully')
      } catch (error) {
        console.error('Share failed:', error)
      }
    } else {
      await navigator.clipboard.writeText(url || window.location.href)
      showToast('Link copied to clipboard')
    }
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
      {!showShareButton && (
        <button 
          onClick={handleShare}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
          <PiShareNetworkLight className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </div>
  )
}

export default SessionActions