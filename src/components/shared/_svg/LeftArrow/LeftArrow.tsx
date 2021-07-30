import { styled } from '../../../../styles/stitches.config'

export const StyledSvg = styled('svg', {
  display: 'flex',
  height: 50,
  paddingRight: '$s50',
  alignSelf: 'center',
  width: 50,
  cursor: 'pointer',
  opacity: 0.5,

  '&:hover': {
    opacity: 1,
    transform: 'scale(0.9)',
  },
})

const LeftArrow = () => (
  <StyledSvg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 16 16"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M7.854 4.646a.5.5 0 010 .708L5.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M4.5 8a.5.5 0 01.5-.5h6.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z"
      clipRule="evenodd"
    />
  </StyledSvg>
)

export default LeftArrow
