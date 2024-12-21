// theme/constants.ts
export const colors = {
    oceanBlue: '#1B4965',
    seaFoam: '#BEE3DB',
    sunsetGold: '#F9BC60',
    coral: '#FF6B6B',
    slate: '#555B6E'
  } as const
  
  export const typography = {
    fontPrimary: 'Montserrat',
    fontSecondary: 'Karla'
  } as const
  
  export const tailwindConfig = {
    theme: {
      extend: {
        colors: {
          oceanBlue: colors.oceanBlue,
          seaFoam: colors.seaFoam,
          sunsetGold: colors.sunsetGold,
          coral: colors.coral,
          slate: colors.slate,
        },
        fontFamily: {
          primary: [typography.fontPrimary, 'sans-serif'],
          secondary: [typography.fontSecondary, 'sans-serif'],
        }
      }
    }
  }