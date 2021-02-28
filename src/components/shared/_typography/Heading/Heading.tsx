import React, { ReactNode } from 'react'

import { styled } from '../../../../styles/stitches.config'

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'

  className?: string

  children: ReactNode
}

const StyledHeading = styled('h1', {
  variants: {
    size: {
      xs: {
        fontSize: '1.25rem',
        lineHeight: '1.3',
      },

      s: {
        fontSize: '1.563rem',
        lineHeight: '1.3',
      },

      m: {
        fontSize: '1.953rem',
        lineHeight: '1.3',
      },

      l: {
        fontSize: '2.441rem',
        lineHeight: '1.3',
      },

      xl: {
        fontSize: '3.052rem',
        lineHeight: '1.3',
      },
    },
  },
})

export default function Heading({
  as = 'h1',
  size,

  className,
  children,
}: HeadingProps) {
  return (
    <StyledHeading as={as} className={className} size={size}>
      {children}
    </StyledHeading>
  )
}
