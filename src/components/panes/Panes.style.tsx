import { styled } from '../../styles/stitches.config'

export const Pane = styled('div', {
  padding: '$s100',
})

export const CenteredContainer = styled('div', {
  marginTop: '$s150',
  marginRight: '$s150',
  marginLeft: '$s150',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const PaneTitle = styled('h3', {
  fontSize: '$25',
  margin: '$s25 0 $s50',
})

export const PrimaryLink = styled('a', {
  color: '$primary100',
})

export const SecondaryLink = styled('a', {
  color: '$white',
})

export const ErrorMessage = styled('span', {
  color: '$error100',
  fontSize: '$14',
})

export const DetailsWrapper = styled('div', {
  border: '1px solid $grey18',
  borderRadius: '5px',
  marginBottom: '10px',
  marginTop: '10px',
})

export const DetailsRow = styled('div', {
  borderBottom: '1px solid $grey14',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '$s100',

  '&:last-child': {
    borderBottom: 'none',
  },
})
export const DetailsSubRow = styled(DetailsRow, {
  paddingLeft: '$s200',
})

export const BoldText = styled('span', {
  fontWeight: 'bold',
})

export const Paragraph = styled('p', {
  paddingBottom: '$s100',
})
