import { styled } from '../../../../styles/stitches.config'

export const CauseTitle = styled('h3', {
  paddingLeft: '$s50',
  fontSize: '$16',
  padding: '$s50',
  color: 'black',
})

export const ShareTypeContainer = styled('div', {
  paddingBottom: '$s50',
})

export const Overlay = styled('div', {
  position: 'absolute',
  padding: '$s200',
  margin: '$s200',
  background: '$primary100',
  borderRadius: '5px',
  zIndex: 2,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
})
