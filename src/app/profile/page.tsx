'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useLoadScript } from '@react-google-maps/api'
import { PlacesAutocomplete } from '@/components/common/PlacesAutocomplete'
import { AnimatedInput } from '@/components/common/AnimatedInput'
import { AnimatedTextarea } from '@/components/common/AnimatedTextarea'

interface UserProfile {
  name: string
  email: string
  image?: string
  bio?: string
  profileImageUrl?: string
  location?: string
  websiteUrl?: string
  birthday?: string
  type: string
  profileImage?: File
  imagePreview?: string
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    } else if (session?.user) {
      setProfile({
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || '',
        bio: '',
        profileImageUrl: '',
        location: '',
        websiteUrl: '',
        birthday: '',
        type: 'user',
      })
    }
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    try {
      const formData = new FormData()
      Object.keys(profile).forEach(key => {
        if (key === 'profileImage' && profile.profileImage) {
          formData.append('profileImage', profile.profileImage)
        } else {
          formData.append(key, profile[key as keyof UserProfile]?.toString() || '')
        }
      })

    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  if (status === 'loading') {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      {profile && (
        <div className="bg-white rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
                        
          <div>
              <div className="relative mt-2">
                <button
                  type="button"
                  onClick={() => document.getElementById('profile-upload')?.click()}
                  className="relative w-20 h-20 rounded-full overflow-hidden group hover:opacity-90 focus:outline-none"
                >
                  {profile.imagePreview ? (
                    <Image
                      src={profile.imagePreview}
                      alt="Profile preview"
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <Image
                      src={profile.image || '/profile-avatar.svg'}
                      alt="Default avatar"
                      fill
                      className="object-cover rounded-full"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </button>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const imageUrl = URL.createObjectURL(file)
                      setProfile({
                        ...profile,
                        profileImage: file,
                        imagePreview: imageUrl
                      })
                    }
                  }}
                  className="hidden"
                />
              </div>
            </div>
            
            <div>
              <AnimatedInput
                label="Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              {isLoaded ? (
                <div className="relative">
                  <PlacesAutocomplete
                    value={profile.location || ''}
                    onChange={(address) => setProfile({ ...profile, location: address })}
                    className={`
                      peer w-full rounded-md
                      bg-white text-gray-900 text-base
                      transition-all duration-200
                      focus:outline-none focus:ring-2
                      focus:border-blue-500 focus:ring-blue-200
                    `}
                  />
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </div>

            <div>
              <AnimatedTextarea
                label="Bio"
                value={profile.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
