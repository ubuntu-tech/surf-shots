import Image from "next/image"

interface User {
  id: number
  name: string
  profilePic: string
}

interface UserAvatarsGroupProps {
  users?: User[]
  maxVisible?: number
}

const MOCK_USERS = [
    {
      id: 1,
      name: 'Sarah Wilson',
      profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Marcus Chen',
      profilePic: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      name: 'Alex Thompson',
      profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    },
    {
      id: 4,
      name: 'Jessica Lee',
      profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    {
      id: 5,
      name: 'Michael Rodriguez',
      profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    {
      id: 6,
      name: 'Emma Davis',
      profilePic: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop',
    },
] as User[];

function UserAvatarsGroup({ users = MOCK_USERS, maxVisible = 3 }: UserAvatarsGroupProps) {
  const visibleUsers = users.slice(0, maxVisible + 1)

  return (
    <div className="flex -space-x-2">
      {visibleUsers.map((user, index) => (
        <div 
          key={user.id} 
          className={`relative w-9 h-9 rounded-full border-2 border-white ${
            index > maxVisible ? 'hidden md:block' : ''
          }`}
        >
          <Image
            src={user.profilePic}
            alt={user.name}
            fill
            className="rounded-full object-cover"
          />
          {index === maxVisible && users.length > maxVisible + 1 && (
            <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white text-xs">
              +{users.length - maxVisible}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default UserAvatarsGroup
