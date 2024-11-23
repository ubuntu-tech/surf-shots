'use client'
import Link from 'next/link'
import { Logo } from '@/components/common/Logo'
import { useState } from 'react'
import { SignUpModal } from '../SignUpModal'
import { LoginButton } from '../LoginButton'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { MobileMenuItems } from '../common/MobileMenu'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="fixed w-full bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex items-center -ml-6">
          <Link href="/">
            <Logo className="hover:opacity-80 transition-opacity" />
          </Link>
        </div>

        {/* Profile image button for mobile */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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

        {/* Navigation buttons - desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/" 
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <LoginButton onClick={() => setIsSignUpModalOpen(true)} />
        </div>

        <div
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } absolute top-16 left-0 right-0 flex-col bg-white border-t shadow-lg md:hidden`}
        >
          <MobileMenuItems 
            session={session}
            onLoginClick={() => setIsSignUpModalOpen(true)}
            onMenuClose={() => setIsMenuOpen(false)}
          />
        </div>
      </nav>
      <SignUpModal isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} />
    </header>
  )
}

export default Header
