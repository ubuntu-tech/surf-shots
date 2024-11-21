'use client'
import posthog from 'posthog-js'
import { PostHogProvider as _PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  })
}
function PostHogProvider({ children }: { children: React.ReactNode }) {
    return <_PostHogProvider client={posthog}>{children}</_PostHogProvider>
}

export default PostHogProvider

