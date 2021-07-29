import { styled } from '../../../../styles/stitches.config'

export const StyledSvg = styled('svg', {
  display: 'flex',
  height: 50,
  margin: '$s100 auto',
  width: 50,
})

export default function CloseCircle() {
  return (
    <StyledSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <circle fill="#c30000" cx="12" cy="12" r="10" />

      <path
        fill="white"
        d="M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z"
      />
    </StyledSvg>
  )
}
