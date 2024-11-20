import { FC } from 'react'

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className = '' }) => {
  return (
    <svg 
      width="140" 
      height="40" 
      viewBox="0 0 140 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Lens Ring */}
      <circle cx="20" cy="20" r="15" stroke="#0891B2" strokeWidth="2"/>
      
      {/* Inner Lens Circles */}
      <circle cx="20" cy="20" r="12" stroke="#0891B2" strokeWidth="1"/>
      <circle cx="20" cy="20" r="9" stroke="#0891B2" strokeWidth="1"/>
      <circle cx="20" cy="20" r="6" stroke="#0891B2" strokeWidth="1"/>
      
      {/* Lens Reflection */}
      <path 
        d="M15 15 L17 17" 
        stroke="#0891B2" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="1" fill="#0891B2"/>
      
      {/* Aperture Blades */}
      <path 
        d="M20 8 C18 8, 16 9, 14 12" 
        stroke="#0891B2" 
        strokeWidth="1" 
        fill="none"
      />
      <path 
        d="M32 20 C32 18, 31 16, 28 14" 
        stroke="#0891B2" 
        strokeWidth="1" 
        fill="none"
      />
      <path 
        d="M20 32 C22 32, 24 31, 26 28" 
        stroke="#0891B2" 
        strokeWidth="1" 
        fill="none"
      />
      
      {/* Wave - Moved up by adjusting the Y coordinates from 20 to 17 */}
      <path 
        d="M45 17 C50 10, 55 10, 60 17 C65 24, 70 24, 75 17 C80 10, 85 10, 90 17" 
        stroke="#0891B2" 
        strokeWidth="2" 
        fill="none"
      />
      
      {/* Text */}
      <text 
        x="45" 
        y="35" 
        fontFamily="Arial" 
        fontSize="12" 
        fontWeight="bold" 
        fill="#0891B2"
        letterSpacing="0.5"
      >
        SURF SHOTS
      </text>
    </svg>
  )
}

export default Logo
