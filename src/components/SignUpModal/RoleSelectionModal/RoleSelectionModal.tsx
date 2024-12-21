'use client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

interface RoleSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (role: string) => void
}

const RoleSelectionModal = ({ isOpen, onClose }: RoleSelectionModalProps) => {
  const [selectedRole, setSelectedRole] = useState<'photographer' | 'user' | ''>('')
  const { data: session } = useSession()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await fetch(`/api/user/${session?.user?.id}/profile/${selectedRole}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: selectedRole }),
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-2xl font-bold text-oceanBlue font-primary">
              Choose Your Role
            </h2>
            <p className="text-slate font-secondary mt-1">
              Tell us how you'll be using Snapline
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setSelectedRole('photographer')}
              className={`px-4 py-6 rounded-lg border ${
                selectedRole === 'photographer'
                  ? 'border-oceanBlue bg-oceanBlue/10 text-oceanBlue'
                  : 'border-seaFoam text-slate hover:border-oceanBlue'
              } transition-all font-secondary flex flex-col items-center gap-2`}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Photographer
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('user')}
              className={`px-4 py-6 rounded-lg border ${
                selectedRole === 'user'
                  ? 'border-oceanBlue bg-oceanBlue/10 text-oceanBlue'
                  : 'border-seaFoam text-slate hover:border-oceanBlue'
              } transition-all font-secondary flex flex-col items-center gap-2`}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Surfer
            </button>
          </div>

          <button
            type="submit"
            className={`w-full bg-sunsetGold text-white py-3 px-4 rounded-lg font-primary font-semibold hover:bg-sunsetGold/90 transition-all focus:ring-2 focus:ring-sunsetGold focus:ring-offset-2 ${!selectedRole ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!selectedRole}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default RoleSelectionModal