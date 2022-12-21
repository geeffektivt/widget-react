import useTypedSelector from 'hooks/store/useTypedSelector'
import { FC } from 'react'
import { selectCausesWithDonationPosters } from 'store/donation/donation.selector'

import {
  GiftCardFullPreviewImagesContainer,
  GiftCardPosterContainer,
  GiftCardPostersContainer,
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
      <GiftCardPostersContainer>
        {causePosters.map((poster) => (
          <GiftCardPosterContainer key={poster.id} src={poster.imgUrl} />
        ))}
      </GiftCardPostersContainer>
      <img
        src="https://storage.googleapis.com/geeffektivt-se-frontend-3814d91/Geeffektivt_LogoSqua%201.png"
        alt="geeffektivt.se"
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: 'min(60%, 150px)',
          marginBottom: '64px',
        }}
      />
    </GiftCardFullPreviewImagesContainer>
  )
}
