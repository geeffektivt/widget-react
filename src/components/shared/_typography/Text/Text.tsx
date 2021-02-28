import React, { ReactNode } from 'react'

import { styled } from '../../../../styles/stitches.config'

interface TextProps {
  as?: 'p' | 'span'
  size?: 's' | 'm' | 'l' | 'xl'

  children: ReactNode
  className?: string
}

const StyledText = styled('span', {
  variants: {
    size: {
      s: {
        fontSize: '0.64rem',
        lineHeight: '1.75',
      },

      m: {
        fontSize: '0.8rem',
        lineHeight: '1.75',
      },

      l: {
        fontSize: '1rem',
        lineHeight: '1.75',
      },

      xl: {
        fontSize: '1.25rem',
        lineHeight: '1.75',
      },
    },
  },
})

export default function Text({
  as = 'p',
  size = 'l',

  children,
  className,
}: TextProps) {
  return (
    <StyledText className={className} as={as} size={size}>
      {children}
    </StyledText>
  )
}
