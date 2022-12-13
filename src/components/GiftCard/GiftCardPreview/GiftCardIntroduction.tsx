import { FC } from 'react'

import useAllTexts from '../../../hooks/content/useAllTexts'
import useTypedSelector from '../../../hooks/store/useTypedSelector'
import {
  selectCauseNamesWithDonation,
  selectDonationSum,
} from '../../../store/donation/donation.selector'

import {
  GiftCardIntroductionContainer,
  GiftCardTextAccent,
} from './GiftCardPreview.styles'

export const GiftCardIntroduction: FC = () => {
  const {
    donations: { giftCards: paneTexts },
  } = useAllTexts()

  const donationSum = useTypedSelector(selectDonationSum)
  const donationCauses = useTypedSelector(selectCauseNamesWithDonation)
  return (
    <GiftCardIntroductionContainer>
      {paneTexts.previewIntroduction[0]}{' '}
      <GiftCardTextAccent>{donationSum}</GiftCardTextAccent>{' '}
      {paneTexts.previewIntroduction[1]}{' '}
      <GiftCardTextAccent>{donationCauses.join(', ')}</GiftCardTextAccent>
      {'.'}
    </GiftCardIntroductionContainer>
  )
}
