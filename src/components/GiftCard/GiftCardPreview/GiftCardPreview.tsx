import { Modal } from '@mui/material'
import { PreviewButton } from 'components/shared/Buttons/PreviewButton'
import { FC, useState } from 'react'

import { GiftCard } from '../../../store/giftCards/giftCards.types'

import { GiftCardPoster } from './GiftCardPoster'
import {
  GiftCardFullPreviewContainer,
  GiftCardPreviewRoot,
} from './GiftCardPreview.styles'
import { GiftCardPreviewLetter } from './GiftCardPreviewLetter'

type GiftCardPreviewProps = {
  giftCard: GiftCard
}

export const GiftCardPreview: FC<GiftCardPreviewProps> = ({ giftCard }) => {
  const [showFullPreview, setShowFullPreview] = useState(false)
  const toggleShowFullPreview = () => {
    setShowFullPreview(!showFullPreview)
  }

  const [showPreviewButton, setShowPreviewButton] = useState(false)

  return (
    <>
      <GiftCardPreviewRoot
        display={{
          xs: 'none',
          sm: 'block',
        }}
        onMouseEnter={() => setShowPreviewButton(true)}
        onMouseLeave={() => setShowPreviewButton(false)}
      >
        <GiftCardPreviewLetter giftCard={giftCard} />
        {showPreviewButton && <PreviewButton onClick={toggleShowFullPreview} />}
      </GiftCardPreviewRoot>
      <Modal open={showFullPreview} onClose={toggleShowFullPreview}>
        <GiftCardFullPreviewContainer
          style={{
            maxWidth: '80%',
            backgroundColor: '#004466',
            marginBottom: '8px',
            overflowY: 'auto',
          }}
        >
          <GiftCardPreviewLetter
            style={{
              backgroundColor: 'white',
              maxWidth: '90%',
              minWidth: '65%',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '95%',
              height: 'fit-content',
            }}
            giftCard={giftCard}
          ></GiftCardPreviewLetter>
          <GiftCardPoster />
        </GiftCardFullPreviewContainer>
      </Modal>
    </>
  )
}
