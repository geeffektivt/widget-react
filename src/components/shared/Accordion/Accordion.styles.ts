import { css } from '../../../styles/stitches.config'

export const item = css({
  borderBottom: '1px solid $grey300',
})

export const itemHeader = css({
  margin: 0,
  display: 'flex',
})

export const itemButton = css({
  backgroundColor: 'transparent',
  border: 'none',
  padding: '$s100',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const itemPanel = css({
  padding: '$s100',
})
