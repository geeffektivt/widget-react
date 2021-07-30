import { styled } from '../../../styles/stitches.config'
import LeftArrow from '../_svg/LeftArrow'

interface BackButtonProps {
  onClick: () => void
}

const Button = styled('button', {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
})

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <Button type="button" onClick={onClick}>
      <LeftArrow />
    </Button>
  )
}
