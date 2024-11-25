import { FC } from 'react'
import { colors } from '@/theme/constants'

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className = '' }) => {
  return (
    <svg 
      className={`w-48 h-16 ${className}`}
      viewBox="0 0 400 200" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Camera body */}
      <path 
        d="M50 55 h10 l3 -5 h24 l3 5 h10 v35 h-50 z" 
        fill={colors.seaFoam}
        opacity="0.8"
        stroke={colors.oceanBlue}
        strokeWidth="2"
      />
  
      {/* Lens */}
      <circle 
        cx="75" 
        cy="72" 
        r="12" 
        fill="none"
        stroke={colors.sunsetGold}
        strokeWidth="3"
      />
          
      {/* Wave line */}
      <path 
        d="M95 72 C120 72, 130 60, 150 60 S180 72, 200 72" 
        stroke={colors.oceanBlue}
        strokeWidth="12" 
        strokeLinecap="round"
        fill="none"
      />
  
      {/* Text */}
      <text 
        x="40" 
        y="130" 
        fontFamily="Montserrat, sans-serif" 
        fontSize="52" 
        fontWeight="700" 
        fill={colors.oceanBlue}
        letterSpacing="-1"
      >
        snap
      </text>
      <text 
        x="155" 
        y="130" 
        fontFamily="Montserrat, sans-serif" 
        fontSize="52" 
        fontWeight="500" 
        fill={colors.oceanBlue}
        letterSpacing="-1"
      >
        line
      </text>
    </svg>
  )
}

export default Logo