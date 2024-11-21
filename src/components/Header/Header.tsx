'use client'
import Link from 'next/link'
import { Logo } from '@/components/common/Logo'
import { useState } from 'react'
import { SignUpModal } from '../SignUpModal'
import { LoginButton } from '../LoginButton'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

  console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
  console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET)

  return (
    <header className="fixed w-full bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href="/">
            <Logo className="hover:opacity-80 transition-opacity" />
          </Link>
        </div>

        {/* Hamburger menu button for mobile */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
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
