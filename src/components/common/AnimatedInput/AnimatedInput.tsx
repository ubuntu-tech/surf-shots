import { InputHTMLAttributes, forwardRef } from 'react'

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          className={`
            peer w-full px-4 py-3 rounded-md border
            bg-white text-gray-900 text-base
            placeholder-transparent
            transition-all duration-200
            focus:outline-none focus:ring-2
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }
          `}
          placeholder={label}
        />
        <label
          className={`
            absolute left-4 -top-2.5 px-1 bg-white
            text-sm transition-all duration-200
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-500
            peer-placeholder-shown:top-3.5
            peer-focus:-top-2.5
            peer-focus:text-sm
            ${error ? 'text-red-500' : 'text-gray-600 peer-focus:text-blue-500'}
          `}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

AnimatedInput.displayName = 'AnimatedInput'

export default AnimatedInput
