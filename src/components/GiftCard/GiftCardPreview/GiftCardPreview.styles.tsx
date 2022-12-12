import { Box, ImageList, ImageListItem, Paper } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import { PreviewButton } from 'components/shared/Buttons/PreviewButton'

import { styled } from '../../../styles/stitches.config'

PreviewButton.toString = () => '.preview-button'

export const GiftCardPreviewRoot = styled(Box, {
  position: 'relative',
  minWidth: '55%',
  display: 'flex',
  fontFamily: 'Inter',
})

export const GiftCardFullPreviewContainer = withStyles({
  root: {
    height: '92%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '8px',
    padding: '16px',
    display: 'flex',
    backgroundImage: `url('https://storage.googleapis.com/geeffektivt-se-frontend-3814d91/chrismas_decoration_1.svg')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom 1% right -2%',
    backgroundSize: '15% 20%',
    fontFamily: 'Inter',
  },
})(Paper)

export const GiftCardFullPreviewImagesContainer = styled(Box, {
  minWidth: '30%',
  maxHeight: '65%',
  marginLeft: '16px',
  paddingTop: '16px',
  justifyContent: 'space-between',
  flexDirection: 'column',
})

export const GiftCardPosterContainer = styled('img', {
  height: '49%',
  width: '100%',
})

export const GiftCardPreviewContainer = styled(Box, {
  top: 0,
  left: 0,
  height: '100%',
  backgroundImage: `url('https://storage.googleapis.com/geeffektivt-se-frontend-3814d91/chrismas_decoration_2.svg')`,
  backgroundSize: '15% 15%',
  backgroundRepeat: 'no-repeat',
})

export const GiftCardGreetingsContainer = styled('h1', {
  textAlign: 'center',
  marginBottom: '$s150',
  color: '$primary100',
})

export const GiftCardTextAccent = styled('b', {
  color: '$primary100',
})

export const GiftCardIntroductionContainer = styled('p', {
  textAlign: 'center',
  marginBottom: '$s150',
})

export const GiftCardPersonalMessageContainer = styled('blockquote', {
  textAlign: 'center',
  margin: '$s300 0 $s300 0',
  color: '$primary100',
  fontWeight: '$600',
})

export const GiftCardPreviewOrganisationsContainer = styled('div', {})

export const OrganisationContainer = styled('p', {
  margin: '$s100 0 $s100 0',
})

export const GiftCardPreviewFooterContainer = styled('div', {
  margin: '$s100 0 $s150 0',
})

export const OrganisationLogosContainer = withStyles({
  root: {
    paddingTop: '8px',
    justifyContent: 'center',
  },
})(ImageList)

export const OrganisationLogoContainer = withStyles({
  root: {
    margin: '4px',
  },
})(ImageListItem)

export const OrganisationLogoLinkContainer = styled('a', {
  minWidth: '100%',
  minHeight: '100%',
})

export const OrganisationLogoImg = styled('img', {
  maxWidth: '100%',
  maxHeight: '100%',
})
