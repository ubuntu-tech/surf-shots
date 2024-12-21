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
    <div className="py-2 bg-white border-t border-seaFoam shadow-lg">
      <div className="space-y-1">
        <Link 
          href="/profile" 
          className="block px-4 py-3 text-slate hover:bg-seaFoam/20 hover:text-oceanBlue transition-colors font-secondary"
        >
          My Profile
        </Link>
        <Link 
          href="/my-photos" 
          className="block px-4 py-3 text-slate hover:bg-seaFoam/20 hover:text-oceanBlue transition-colors font-secondary"
        >
          My Photos
        </Link>
        <button 
          onClick={() => signOut()}
          className="w-full text-left px-4 py-3 text-coral hover:bg-seaFoam/20 transition-colors font-secondary"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

const MobileMenuItems = ({ session, onLoginClick, onMenuClose, isMenuOpen }: MobileMenuItemsProps) => {
  if (session?.user) return <LoggedInItems />

  return (
    <div
      className={`${
        isMenuOpen ? 'flex' : 'hidden'
      } absolute top-16 left-0 right-0 flex-col bg-white border-t border-seaFoam shadow-lg md:hidden`}
    >
      <div className="py-2 space-y-1">
        <Link 
          href="/discover" 
          className="block px-4 py-3 text-slate hover:bg-seaFoam/20 hover:text-oceanBlue transition-colors font-secondary"
        >
          Discover Shots
        </Link>
        <Link 
          href="/photographers" 
          className="block px-4 py-3 text-slate hover:bg-seaFoam/20 hover:text-oceanBlue transition-colors font-secondary"
        >
          Photographers
        </Link>
        <Link 
          href="/about" 
          className="block px-4 py-3 text-slate hover:bg-seaFoam/20 hover:text-oceanBlue transition-colors font-secondary"
        >
          About Us
        </Link>
        <div className="px-4 py-3">
          <SignUpButton 
            onClick={() => {
              onLoginClick()
              onMenuClose?.()
            }}
            className="w-full justify-center"
          />
        </div>
      </div>
    </div>
  )
}

export default MobileMenuItems