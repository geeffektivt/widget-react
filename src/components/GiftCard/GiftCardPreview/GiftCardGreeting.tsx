import { FC } from 'hoist-non-react-statics/node_modules/@types/react'

import { GiftCardGreetingsContainer } from './GiftCardPreview.styles'

interface GiftCardGreetingProps {
  receiverName: string
}

export const GiftCardGreeting: FC<GiftCardGreetingProps> = ({
  receiverName,
}) => (
  <GiftCardGreetingsContainer>
    Hej {receiverName || '[namn]'}!
  </GiftCardGreetingsContainer>
)
