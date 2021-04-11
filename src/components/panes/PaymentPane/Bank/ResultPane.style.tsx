import styled from 'styled-components'

import { gray18, grey14 } from '../../../../config/colors'

export const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const VippsLogo = styled.img`
  width: 120px;
  margin: 20px;
`

export const Heart = styled.img`
  width: 50px;
  height: 50px;
`

export const BlackContainer = styled.div`
  background-color: black;
  width: 100%;
`

export const BoldWhiteText = styled.p`
  color: white;
  display: inline;
  font-weight: bold;
`

export const WhiteText = styled.p`
  color: white;
  display: inline;
  margin-left: 5px;
`

export const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const InfoText = styled.div`
  text-align: center;
  font-size: 13px;
  padding: 10px;
`

export const PaymentDetailsWrapper = styled.div`
  border: 1px solid ${gray18};
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 10px;
`
export const DetailsRow = styled.div`
  border-bottom: 1px solid ${grey14};
  display: flex;
  justify-content: space-between;
  padding: 10px;

  :last-child {
    border-bottom: none;
  }
`
