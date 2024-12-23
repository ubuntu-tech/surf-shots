import Link from 'next/link'
import { signOut } from "next-auth/react"
import { Session } from 'next-auth'
import { SignUpButton } from '@/components/SignUpButton'
import { useEffect, useState, useRef } from 'react'

interface MobileMenuItemsProps {
  session: Session | null
  onLoginClick: () => void
  onMenuClose?: () => void
  isMenuOpen: boolean
  menuPosition?: { top: number; right: number }
}

const LoggedInItems = ({ onMenuClose }: { onMenuClose?: () => void }) => {
  return (
    <div className="py-2 bg-white border-t border-seaFoam shadow-lg">
      <div className="space-y-1">
        <Link 
          href="/profile" 
          onClick={onMenuClose}
          className="block px-4 py-3 text-slate hover:bg-seaFoam/20 hover:text-oceanBlue transition-colors font-secondary"
        >
          My Profile
        </Link>
        <Link 
          href="/my-photos" 
          onClick={onMenuClose}
          className="block px-4 py-3 text-slate hover:bg-seaFoam/20 hover:text-oceanBlue transition-colors font-secondary"
        >
          My Photos
        </Link>
        <button 
          onClick={() => {
            signOut();
            onMenuClose?.();
          }}
          className="w-full text-left px-4 py-3 text-coral hover:bg-seaFoam/20 transition-colors font-secondary"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

const MobileMenuItems = ({ session, onLoginClick, onMenuClose, isMenuOpen, menuPosition }: MobileMenuItemsProps) => {
  const [isMobile, setIsMobile] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMenuOpen) {
        onMenuClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen, onMenuClose])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is Tailwind's md breakpoint
    }
    
    checkMobile() // Initial check
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isMobile) return null
  if (session?.user && isMenuOpen) return (
    <div 
      ref={menuRef}
      style={{
        position: 'absolute',
        top: menuPosition?.top ?? '4rem',
        right: menuPosition?.right ?? 0,
        width: 'max-content',
        zIndex: 50
      }}>
      <LoggedInItems onMenuClose={onMenuClose} />
    </div>
  )

  return (
    <div
      ref={menuRef}
      className={`${
        isMenuOpen ? 'flex' : 'hidden'
      } absolute top-16 left-0 right-0 flex-col bg-white border-t border-seaFoam shadow-lg md:hidden`}
    >
      <div className="py-2 space-y-1">
        <Link 
          href="/discover" 
          className="block px-4 py-3 text-slate hover:bg-seaFoam/20 hover:text-oceanBlue transition-colors font-secondary"
        >
          Discover
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