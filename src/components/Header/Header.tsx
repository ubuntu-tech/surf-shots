'use client'
import Link from 'next/link'
import { Logo } from '@/components/common/Logo'
import { useEffect, useState } from 'react'
import { SignUpModal } from '../SignUpModal'
import { useSession } from 'next-auth/react'
import { MobileMenuItems } from '../common/MobileMenu'
import { HeaderActions } from './HeaderActions'
import { ProfileImage } from '../common/ProfileImage'
import RoleSelectionModal from '../SignUpModal/RoleSelectionModal'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const { data: session } = useSession()
  const [variant, setVariant] = useState<'signup' | 'signin'>('signup')
  const [isRoleSelectionModalOpen, setIsRoleSelectionModalOpen] = useState(false)

  useEffect(() => {
    if (session?.user && !session?.user.role) {
      console.log('opening role selection modal')
      setIsRoleSelectionModalOpen(true)
    }
  }, [session])

  const handleRoleSubmit = (role: string) => {
    console.log('role submitted', role)
    setIsRoleSelectionModalOpen(false)
  }

  return (
    <header className="fixed w-full bg-white shadow-sm sticky top-0 z-50 border-b border-seaFoam">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center -ml-6">
          <Link 
            href="/" 
            className="hover:opacity-80 transition-opacity duration-200"
          >
            <Logo className="hover:opacity-80 transition-opacity" />
          </Link>
        </div>

        {/* Desktop Navigation - Added to match brand style */}
        <div className="hidden md:flex items-center space-x-8 font-secondary text-slate">
          <Link href="/discover" className="hover:text-oceanBlue transition-colors">
            Discover
          </Link>
          <Link href="/photographers" className="hover:text-oceanBlue transition-colors">
            Photographers
          </Link>
          <Link href="/about" className="hover:text-oceanBlue transition-colors">
            About Us
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <HeaderActions 
            onSignUpClick={() => {
              setIsSignUpModalOpen(true)
              setVariant('signup')
            }} 
            onLoginClick={() => {
              setIsSignUpModalOpen(true)
              setVariant('signin')
            }}
            className="hidden md:flex"
          />
          
          {session ? (
            <ProfileImage 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="border-2 border-seaFoam hover:border-oceanBlue transition-colors"
            />
          ) : (
            <button
              className="md:hidden text-oceanBlue"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>

        <MobileMenuItems 
          session={session}
          isMenuOpen={isMenuOpen}
          onLoginClick={() => setIsSignUpModalOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
        />
      </nav>
      <SignUpModal
        isOpen={isSignUpModalOpen} 
        onClose={() => setIsSignUpModalOpen(false)} 
        variant={variant}
      />
            <RoleSelectionModal
        isOpen={isRoleSelectionModalOpen}
        onClose={() => setIsRoleSelectionModalOpen(false)}
        onSubmit={handleRoleSubmit}
      />
    </header>
  )
}

export default Header