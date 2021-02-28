import { css } from '../../../styles/stitches.config'

export const overlay = css({
  backgroundColor: '$grey800',
  bottom: 0,
  left: 0,
  opacity: 0.7,
  position: 'fixed',
  right: 0,
  top: 0,
})

export const content = css({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 200,
  maxWidth: 'fit-content',
  maxHeight: '85vh',
  padding: '$s200 $s300',
  marginTop: '-5vh',
  backgroundColor: '$grey050',
  borderRadius: 6,

  '&:focus': {
    outline: 'none',
  },
})
