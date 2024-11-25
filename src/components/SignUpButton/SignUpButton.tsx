'use client'

import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { UserMenu } from "../UserMenu"
import Image from "next/image"

function SignUpButton({ onClick, className = '' }: { onClick: () => void, className?: string }) {
    const { data: session } = useSession()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (session?.user) {
        return (
            <div className={`relative ${className}`} ref={menuRef}>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-full overflow-hidden w-10 h-10 focus:outline-none focus:ring-2 focus:ring-oceanBlue border-2 border-seaFoam hover:border-oceanBlue transition-colors"
                >
                    <Image 
                        src={session.user.image || '/default-avatar.png'} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                    />
                </button>

                <UserMenu isOpen={isMenuOpen} />
            </div>
        )
    }

    return (
        <button 
            onClick={onClick}
            className={`px-6 py-2 bg-sunsetGold text-white hover:bg-sunsetGold/90 font-primary font-semibold rounded-lg transition-all duration-200 hover:shadow-md ${className}`}
        >
            Join the Lineup
        </button>
    )
}

export default SignUpButton