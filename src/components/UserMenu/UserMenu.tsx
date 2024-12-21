import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
interface UserMenuProps {
    isOpen: boolean;
}

function UserMenu({ isOpen }: UserMenuProps) {
    const { data: session } = useSession()

    if (!isOpen) return null;
    
    return (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
            </a>
            <a href="/my-photos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                My Photos
            </a>
            {session?.user?.role === 'photographer' && (
                <a href="/session/new" className="block px-4 py-2 text-sm text-white bg-sunsetGold hover:bg-sunsetGold/90">
                    New Session
                </a>
            )}
            <hr className="my-1 border-gray-200" />
            <button 
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
                Logout
            </button>
        </div>
    )
}

export default UserMenu
