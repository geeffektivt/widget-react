import useAllTexts from 'hooks/content/useAllTexts'
import { FC, useState } from 'react'

import useTypedSelector from '../../../hooks/store/useTypedSelector'
import {
  selectAllOrTopThreeOranisationsWithDonation,
  selectOranisationsWithDonationTrunked,
} from '../../../store/donation/donation.selector'

import {
  GiftCardPreviewOrganisationsContainer,
  GiftCardTextAccent,
  OrganisationContainer,
} from './GiftCardPreview.styles'

export const GiftCardPreviewOrganisations: FC = () => {
  const [onlyThree, setOnlyThree] = useState(true)

  const {
    donations: { giftCards: paneTexts },
  } = useAllTexts()

  const causesOrOrganisations = useTypedSelector((state) =>
    selectAllOrTopThreeOranisationsWithDonation(state, onlyThree)
  )

  const areCausesAndOrgTrunked = useTypedSelector(
    selectOranisationsWithDonationTrunked
  )

  return (
    <GiftCardPreviewOrganisationsContainer>
      {causesOrOrganisations.map((organisation) => (
        <OrganisationContainer key={organisation.id}>
          <GiftCardTextAccent>{organisation.name}</GiftCardTextAccent>
          <span>, {organisation.shortDescription}</span>
        </OrganisationContainer>
      ))}
      {!areCausesAndOrgTrunked ? (
        <></>
      ) : onlyThree ? (
        <a
          style={{ cursor: 'pointer', textDecorationLine: 'underline' }}
          onClick={() => setOnlyThree(!onlyThree)}
        >
          {paneTexts.previewShowMoreOrganisation}
        </a>
      ) : (
        <a
          style={{ cursor: 'pointer', textDecorationLine: 'underline' }}
          onClick={() => setOnlyThree(!onlyThree)}
        >
          {paneTexts.previewShowLessOrganisation}
        </a>
      )}
    </GiftCardPreviewOrganisationsContainer>
  )
}
