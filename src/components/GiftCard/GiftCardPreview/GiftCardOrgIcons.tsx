import useTypedSelector from 'hooks/store/useTypedSelector'
import { FC } from 'react'
import { selectOrganisationLogos } from 'store/donation/donation.selector'

import {
  OrganisationLogoContainer,
  OrganisationLogoImg,
  OrganisationLogoLinkContainer,
  OrganisationLogosContainer,
} from './GiftCardPreview.styles'

export const GiftCardPreviewOrganisationIcons: FC = () => {
  const organisationsLogos = useTypedSelector(selectOrganisationLogos)

  return (
    <OrganisationLogosContainer>
      {organisationsLogos.map(({ id, name, logo, infoUrl }) => (
        <OrganisationLogoContainer key={id}>
          <OrganisationLogoLinkContainer href={infoUrl} target="_blank">
            <OrganisationLogoImg src={logo} alt={name} />
          </OrganisationLogoLinkContainer>
        </OrganisationLogoContainer>
      ))}
    </OrganisationLogosContainer>
  )
}
