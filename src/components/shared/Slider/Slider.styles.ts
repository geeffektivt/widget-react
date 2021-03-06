import { css } from '../../../styles/stitches.config'

export const root = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  height: 16,
})

export const track = css({
  backgroundColor: 'gainsboro',
  position: 'relative',
  flexGrow: 1,
  height: 2,
})

export const range = css({
  position: 'absolute',
  backgroundColor: 'dodgerblue',
  borderRadius: '9999px',
  height: '100%',
})

export const thumb = css({
  display: 'block',
  width: 16,
  height: 16,
  backgroundColor: 'white',
  border: '1px solid lightgray',
  borderRadius: '20px',

  ':focus': {
    borderColor: 'dodgerblue',
    outline: 'none',
  },
})
