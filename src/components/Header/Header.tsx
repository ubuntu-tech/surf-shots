'use client'
import Link from 'next/link'
import { Logo } from '@/components/common/Logo'
import { useState } from 'react'
import { SignUpModal } from '../SignUpModal'
import { useSession } from 'next-auth/react'
import { MobileMenuItems } from '../common/MobileMenu'
import { HeaderActions } from './HeaderActions'
import { ProfileImage } from '../common/ProfileImage'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const { data: session } = useSession()
  const [variant, setVariant] = useState<'signup' | 'signin'>('signup')

  return (
    <header className="fixed w-full bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">

        <div className="flex items-center -ml-6">
          <Link href="/">
            <Logo className="hover:opacity-80 transition-opacity" />
          </Link>
        </div>

        <ProfileImage onClick={() => setIsMenuOpen(!isMenuOpen)} />
        <HeaderActions 
          onSignUpClick={() => {
            setIsSignUpModalOpen(true)
            setVariant('signup')
          }} 
          onLoginClick={() => {
            setIsSignUpModalOpen(true)
            setVariant('signin')
          }}
        />

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
    </header>
  )
}

export default Header
