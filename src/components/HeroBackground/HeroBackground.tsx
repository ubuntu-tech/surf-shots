const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg 
      className="w-full h-full"
      viewBox="0 0 1920 1080" 
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor: '#F9BC60', stopOpacity: 0.8}}/>
          <stop offset="100%" style={{stopColor: '#1B4965', stopOpacity: 0.9}}/>
        </linearGradient>
        
        {/* Wave patterns */}
        <pattern id="wavePattern" x="0" y="0" width="400" height="100" patternUnits="userSpaceOnUse">
          <path d="M0 50 Q 100 0, 200 50 T 400 50" fill="none" stroke="#BEE3DB" strokeWidth="2" strokeOpacity="0.3"/>
        </pattern>
      </defs>

      {/* Background */}
      <rect width="100%" height="100%" fill="url(#skyGradient)"/>
      
      {/* Sun */}
      <circle cx="1600" cy="300" r="120" fill="#F9BC60" opacity="0.8"/>
      <circle cx="1600" cy="300" r="80" fill="#F9BC60"/>
      
      {/* Ocean */}
      <path d="M0 500 
               Q 400 450, 800 500 
               T 1600 500
               T 1920 500
               V 1080 H 0 Z" 
            fill="#1B4965" 
            opacity="0.8"/>
      
      {/* Wave details */}
      <path d="M0 600 
               Q 300 550, 600 600 
               T 1200 600
               T 1920 600" 
            fill="none" 
            stroke="#BEE3DB" 
            strokeWidth="3"
            opacity="0.4"/>
            
      <path d="M0 650 
               Q 400 600, 800 650 
               T 1600 650
               T 1920 650" 
            fill="none" 
            stroke="#BEE3DB" 
            strokeWidth="2"
            opacity="0.3"/>
            
      {/* Surfer silhouette */}
      <g transform="translate(800, 450) scale(0.8)">
        <path d="M40 0 
                 C 30 20, 60 40, 40 60
                 L 50 80
                 C 60 70, 80 90, 90 70
                 C 100 60, 90 30, 70 20
                 C 60 10, 50 10, 40 0Z" 
              fill="#000000" 
              opacity="0.8"/>
      </g>
      
      {/* Spray effect */}
      <g transform="translate(750, 480)">
        <path d="M0 0 Q 10 -20, 20 0" stroke="#BEE3DB" fill="none" opacity="0.6"/>
        <path d="M10 5 Q 20 -15, 30 5" stroke="#BEE3DB" fill="none" opacity="0.6"/>
        <path d="M20 0 Q 30 -20, 40 0" stroke="#BEE3DB" fill="none" opacity="0.6"/>
      </g>
    </svg>
  </div>
)

export default HeroBackground
