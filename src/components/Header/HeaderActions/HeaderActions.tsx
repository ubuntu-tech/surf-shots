import Link from 'next/link'
import { SignUpButton } from '../../SignUpButton'

interface HeaderActionsProps {
  onSignUpClick: () => void
  onLoginClick: () => void
}

const HeaderActions = ({ onSignUpClick, onLoginClick }: HeaderActionsProps) => {
  return (
    <div className="hidden md:flex items-center gap-6">
      <Link 
        href="/" 
        className="text-gray-700 hover:text-gray-900 transition-colors"
      >
        Home
      </Link>

      <SignUpButton onClick={onSignUpClick} />

      <button 
        onClick={onLoginClick}
        className="md:bg-blue-500 md:text-white md:px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Login
      </button>
    </div>
  )
}

export default HeaderActions
