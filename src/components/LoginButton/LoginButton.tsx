'use client'

import { useSession, signOut} from "next-auth/react"

function LoginButton({ onClick }: { onClick: () => void }) {
    const { data: session } = useSession()

    if (session && session.user) {
        return (
            <button 
                onClick={() => signOut()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
                Logout
            </button>
        )
    }

    return (
        <button 
            onClick={onClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
        </button>
    )
}

export default LoginButton