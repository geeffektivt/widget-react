import { createStyled } from '@stitches/react'

export const { styled, css } = createStyled({
  prefix: '',
  tokens: {
    colors: {
      $grey050: 'hsl(109, 0%, 97%)',
      $grey100: 'hsl(0, 0%, 88%)',
      $grey200: 'hsl(0, 0%, 81%)',
      $grey300: 'hsl(0, 0%, 69%)',
      $grey400: 'hsl(0, 0%, 62%)',
      $grey500: 'hsl(0, 0%, 49%)',
      $grey600: 'hsl(0, 0%, 38%)',
      $grey700: 'hsl(0, 0%, 32%)',
      $grey800: 'hsl(0, 0%, 23%)',
      $grey900: 'hsl(0, 0%, 13%)',

      $white: 'hsl(0, 0%, 97%)',
      $red: 'hsl(348, 94%, 20%)',
    },
    space: {
      $s25: '0.25rem', // 4px
      $s50: '0.5rem', // 8px
      $s75: '0.75rem', // 12px
      $s100: '1rem', // 16px
      $s150: '1.5rem', // 24px
      $s200: '2rem', // 32px
      $s300: '3rem', // 48px
      $s400: '4rem', // 64px
      $s600: '6rem', // 96px
      $s800: '8rem', // 128px
      $s1200: '12rem', // 192px
      $s2400: '24rem', // 384px
    },
  },
  breakpoints: {},
  utils: {},
})
