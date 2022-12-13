import useTypedSelector from 'hooks/store/useTypedSelector'
import { FC } from 'react'
import { selectCausesWithDonationPosters } from 'store/donation/donation.selector'

import {
  GiftCardFullPreviewImagesContainer,
  GiftCardPosterContainer,
} from './GiftCardPreview.styles'

export const GiftCardPoster: FC = () => {
  const causePosters = useTypedSelector(selectCausesWithDonationPosters)
  return (
    <GiftCardFullPreviewImagesContainer
      display={{
        xs: 'none',
        sm: 'flex',
      }}
    >
      {causePosters.map((poster) => (
        <GiftCardPosterContainer key={poster.id} src={poster.imgUrl} />
      ))}
    </GiftCardFullPreviewImagesContainer>
  )
}
