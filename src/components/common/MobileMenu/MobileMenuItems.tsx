import Link from 'next/link'
import { signOut } from "next-auth/react"

import { Session } from 'next-auth'
import { SignUpButton } from '@/components/SignUpButton'

interface MobileMenuItemsProps {
  session: Session | null
  onLoginClick: () => void
  onMenuClose?: () => void
  isMenuOpen: boolean
}

const LoggedInItems = () => {
  return (
    <>
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
        <button 
          onClick={() => signOut()}
          className="px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors text-left"
        >
          Logout
        </button>
    </>
  )
}

const MobileMenuItems = ({ session, onLoginClick, onMenuClose, isMenuOpen }: MobileMenuItemsProps) => {
  if (session?.user) return <LoggedInItems />

  return (
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
        <SignUpButton 
          onClick={() => {
            onLoginClick()
            onMenuClose?.()
          }} 
        />
      </div>
    </div>
  )
}

export default MobileMenuItems