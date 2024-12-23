import { useSession } from "next-auth/react"
import Image from "next/image"

type ProfileImageProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

const ProfileImage = ({ onClick, className }: ProfileImageProps) => {
  const { data: session } = useSession()

  return (
    <button
      className={`md:hidden p-2 ${className}`}
      onClick={onClick}
    >
    {session?.user?.image ? (
      <Image
        src={session.user.image}
        alt="Profile"
        width={32}
        height={32}
        className="rounded-full"
        />
      ) : (
        <svg
          className="w-6 h-6"
        fill="none" 
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    )}
  </button>
  )
}

export default ProfileImage
