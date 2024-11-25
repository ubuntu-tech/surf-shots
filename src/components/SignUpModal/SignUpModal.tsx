'use client'
import { useState } from 'react'
import { GoogleSignInButton } from '../GoogleSignInButton'
import { signIn } from 'next-auth/react'

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
  variant: 'signup' | 'signin'
}

const SignUpModal = ({ isOpen, onClose, variant }: SignUpModalProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const labels = {
    signup: {
      title: 'Join the Lineup',
      subtitle: 'Start capturing your perfect wave moments',
      button: 'Create Account'
    },
    signin: {
      title: 'Welcome Back',
      subtitle: 'Continue your journey with Snapline',
      button: 'Sign In'
    }
  }

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault()
    await signIn('credentials', { email, password })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-2xl font-bold text-oceanBlue font-primary">
              {labels[variant].title}
            </h2>
            <p className="text-slate font-secondary mt-1">
              {labels[variant].subtitle}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate hover:text-oceanBlue transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSignUp} className="space-y-6 mt-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate font-secondary mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-seaFoam focus:ring-2 focus:ring-oceanBlue focus:border-transparent transition-all outline-none font-secondary"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate font-secondary mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-seaFoam focus:ring-2 focus:ring-oceanBlue focus:border-transparent transition-all outline-none font-secondary"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sunsetGold text-white py-3 px-4 rounded-lg font-primary font-semibold hover:bg-sunsetGold/90 transition-all focus:ring-2 focus:ring-sunsetGold focus:ring-offset-2"
          >
            {labels[variant].button}
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-seaFoam"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-slate font-secondary">or continue with</span>
            </div>
          </div>

          <GoogleSignInButton />
        </form>
      </div>
    </div>
  )
}

export default SignUpModal