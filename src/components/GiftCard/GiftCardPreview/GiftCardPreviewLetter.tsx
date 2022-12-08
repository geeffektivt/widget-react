import useAllTexts from 'hooks/content/useAllTexts'
import { CSSProperties, FC } from 'react'
import { GiftCard } from 'store/giftCards/giftCards.types'

import { GiftCardGreeting } from './GiftCardGreeting'
import { GiftCardIntroduction } from './GiftCardIntroduction'
import {
  GiftCardPersonalMessageContainer,
  GiftCardPreviewContainer,
} from './GiftCardPreview.styles'
import { GiftCardPreviewFooter } from './GiftCardPreviewFooter'
import { GiftCardPreviewOrganisations } from './GiftCardPreviewOrganisations'

interface GiftCardPreviewLetterProps {
  giftCard: GiftCard
  style?: CSSProperties
}

export const GiftCardPreviewLetter: FC<GiftCardPreviewLetterProps> = ({
  giftCard,
  style,
}) => {
  const {
    donations: { giftCards: paneTexts },
  } = useAllTexts()

  return (
    <>
      <GiftCardPreviewContainer style={style}>
        <GiftCardGreeting
          receiverName={giftCard.receiverName}
        ></GiftCardGreeting>
        <GiftCardIntroduction />
        <GiftCardPersonalMessageContainer>
          {giftCard.body}
        </GiftCardPersonalMessageContainer>
        <p>{paneTexts.previewCausesInformation}</p>
        <GiftCardPreviewOrganisations />
        <GiftCardPreviewFooter />
      </GiftCardPreviewContainer>
    </>
  )
}
