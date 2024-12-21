import { useSession } from 'next-auth/react'
import { SignUpButton } from '../../SignUpButton'

interface HeaderActionsProps {
  onSignUpClick: () => void
  onLoginClick: () => void
  className?: string
}

const HeaderActions = ({ onSignUpClick, onLoginClick, className }: HeaderActionsProps) => {
  const { data: session } = useSession()

  if (!session?.user) {
    return (
      <div className={`hidden md:flex items-center gap-6 ${className}`}>
        <SignUpButton onClick={onSignUpClick} />

        <button 
          onClick={onLoginClick}
          className="text-oceanBlue hover:text-oceanBlue/80 px-6 py-2 font-primary font-medium hover:bg-oceanBlue/5 rounded-lg transition-all duration-200"
        >
          Sign In
        </button>
      </div>
    )
  }

  return (
    <div className={`hidden md:flex items-center gap-6 ${className}`}>
      <SignUpButton onClick={onSignUpClick} />
    </div>
  )
}

export default HeaderActions
