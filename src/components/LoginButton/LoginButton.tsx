'use client'

import { useSession, signOut } from "next-auth/react"
import { useEffect, useRef, useState } from "react"

function LoginButton({ onClick }: { onClick: () => void }) {
    const { data: session } = useSession()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)  // Add ref for the menu container

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (session && session.user) {
        return (
            <div className="relative" ref={menuRef}>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-full overflow-hidden w-10 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <img 
                        src={session.user.image || '/default-avatar.png'} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                    />
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Profile
                        </a>
                        <a href="/my-photos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            My Photos
                        </a>
                        <hr className="my-1 border-gray-200" />
                        <button 
                            onClick={() => signOut()}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <button 
            onClick={onClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
            Login
        </button>
    )
}

export default LoginButton