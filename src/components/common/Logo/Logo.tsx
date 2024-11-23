import { FC } from 'react'

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className = '' }) => {
  return (
    <svg 
      className={`w-64 h-24 ${className}`}
      viewBox="0 0 400 200" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M50 55 h10 l3 -5 h24 l3 5 h10 v35 h-50 z" 
        fill="#BEE3DB" 
        opacity="0.5"
        stroke="#1B4965"
        strokeWidth="2"/>
  
      <circle cx="75" cy="72" 
        r="12" 
        fill="none"
        stroke="#F9BC60"
        strokeWidth="3"/>
          
      <path d="M95 72 C120 72, 130 60, 150 60 S180 72, 200 72" 
        stroke="#1B4965" 
        strokeWidth="12" 
        strokeLinecap="round"
        fill="none"/>
  
      <text x="40" y="130" 
        fontFamily="Montserrat, sans-serif" 
        fontSize="52" 
        fontWeight="700" 
        fill="#1B4965"
        letterSpacing="-1">
        snap
      </text>
      <text x="155" y="130" 
        fontFamily="Montserrat, sans-serif" 
        fontSize="52" 
        fontWeight="500" 
        fill="#1B4965"
        letterSpacing="-1">
        line
      </text>
  
      <circle cx="190" cy="145" r="2" fill="#FF6B6B"/>
      <circle cx="200" cy="145" r="2" fill="#FF6B6B"/>
      <circle cx="210" cy="145" r="2" fill="#FF6B6B"/>
  
      <text x="42" y="160" 
        fontFamily="Karla, sans-serif" 
        fontSize="14" 
        fill="#555B6E"
        letterSpacing="1">
        CATCH YOUR WAVE, KEEP THE MOMENT
      </text>
    </svg>
  )
}

export default Logo
