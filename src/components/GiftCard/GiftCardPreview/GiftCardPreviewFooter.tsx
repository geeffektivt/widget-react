import useAllTexts from '../../../hooks/content/useAllTexts'

import { GiftCardPreviewOrganisationIcons } from './GiftCardOrgIcons'
import { GiftCardPreviewFooterContainer } from './GiftCardPreview.styles'

export const GiftCardPreviewFooter = () => {
  const {
    donations: { giftCards: paneTexts },
  } = useAllTexts()
  return (
    <GiftCardPreviewFooterContainer>
      {paneTexts.previewAdditionalInformation}
      <a style={{ marginLeft: '4px' }} href="https://geeffektivt.se/metod">
        {paneTexts.previewAdditionalInformationLink}
      </a>
      <div style={{ height: '16px' }} />
      <GiftCardPreviewOrganisationIcons />
    </GiftCardPreviewFooterContainer>
  )
}
