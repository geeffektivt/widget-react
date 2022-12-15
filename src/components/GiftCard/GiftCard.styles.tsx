import { Box } from '@mui/material'

import { styled } from '../../styles/stitches.config'

export const GiftCardContainer = styled(Box, {
  borderBottom: '1px dashed var(--colors-grey18)',
  display: 'inline-flex',
  width: '100%',
  justifyContent: 'space-between',
})

export const GiftCardWrapper = styled('div', {})
