import Link from 'next/link'
import { signOut } from "next-auth/react"

import { Session } from 'next-auth'
import { LoginButton } from '@/components/LoginButton'

interface MobileMenuItemsProps {
  session: Session | null
  onLoginClick: () => void
  onMenuClose?: () => void
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

const MobileMenuItems = ({ session, onLoginClick, onMenuClose }: MobileMenuItemsProps) => {
  if (session?.user) return <LoggedInItems />

  return (
    <>
      <Link 
        href="/" 
        className="px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
      >
        Home
      </Link>
      <div className="px-4 py-3">
        <LoginButton 
          onClick={() => {
            onLoginClick()
            onMenuClose?.()
          }} 
        />
      </div>
    </>
  )
}

export default MobileMenuItems