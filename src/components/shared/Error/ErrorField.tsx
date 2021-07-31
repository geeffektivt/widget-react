import { styled } from '../../../styles/stitches.config'
import { ErrorMessage } from '../../panes/Panes.style'

const ErrorWrapper = styled('div', {
  paddingBottom: '$s150',
  display: 'flex',
  alignItems: 'flex-end',
})
interface ErrorFieldProps {
  text: string
}

export default function ErrorField({ text }: ErrorFieldProps) {
  return (
    <ErrorWrapper>
      <ErrorMessage>{text}</ErrorMessage>
    </ErrorWrapper>
  )
}
