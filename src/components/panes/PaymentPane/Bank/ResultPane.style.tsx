import { styled } from '../../../../styles/stitches.config'

export const ResultWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const VippsLogo = styled('img', {
  width: '120px',
  margin: '20px',
})

export const Heart = styled('img', {
  width: '50px',
  height: '50px',
})

export const BlackContainer = styled('div', {
  backgroundColor: 'black',
  width: '100%',
})

export const BoldWhiteText = styled('p', {
  color: 'white',
  fontWeight: 'bold',
})

export const WhiteText = styled('p', {
  color: 'white',
  display: 'inline',
  marginLeft: '5px',
})

export const TextWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
})

export const InfoText = styled('div', {
  textAlign: 'center',
  fontSize: '13px',
  padding: '10px',
})

export const PaymentDetailsWrapper = styled('div', {
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

  ':last-child': {
    borderBottom: 'none',
  },
})

export const BoldText = styled('p', {
  fontWeight: 'bold',
})
