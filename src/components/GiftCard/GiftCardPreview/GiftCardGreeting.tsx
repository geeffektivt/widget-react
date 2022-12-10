import { FC } from 'react'

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
