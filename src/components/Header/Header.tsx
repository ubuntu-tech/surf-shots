'use client'
import Link from 'next/link'
import { Logo } from '@/components/common/Logo'
import { useState } from 'react'
import { SignUpModal } from '../SignUpModal'
import { LoginButton } from '../LoginButton'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="fixed w-full bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex items-center">
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
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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

        {/* Mobile menu */}
        <div
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } absolute top-16 left-0 right-0 flex-col bg-white border-t shadow-lg md:hidden`}
        >
          <Link 
            href="/" 
            className="px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Home
          </Link>
            <Link 
              href="/" 
              className="px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Profile
            </Link>
            <Link 
              href="/" 
              className="px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              My Photos
            </Link>
          <div className="px-4 py-3">
            <LoginButton 
              onClick={() => {
                setIsSignUpModalOpen(true)
                setIsMenuOpen(false)
              }} 
            />
          </div>
        </div>
      </nav>
      <SignUpModal isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} />
    </header>
  )
}

export default Header
