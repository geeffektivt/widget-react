import styled from 'styled-components'

import { gray20 } from '../../../config/colors'

export const MethodWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const TextWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
`

export const InfoText = styled.p`
  color: ${gray20};
  font-size: 12px;
  line-height: 150%;
  margin: 0;
`

export const MethodButton = styled.button`
  align-items: center;
  background: none;
  border: 0;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  color: ${gray20};
  cursor: pointer;
  display: flex;
  height: 80px;
  justify-content: flex-end;
  margin-bottom: 15px;
  padding: 16px;
  padding-right: 56px;
  position: relative;
  transition: all 90ms;
  user-select: none;
  width: 100%;

  &:active {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  }

  &.bank {
    background-image: url('https://storage.googleapis.com/effekt-widget/assets/logos/bank.png');
    background-position: 16px center;
    background-repeat: no-repeat;
    background-size: 120px;
  }

  &.swish {
    background-image: url('/images/swish-logotype.svg');
    background-position: 16px center;
    background-repeat: no-repeat;
    background-size: 120px;
  }

  &::after {
    background-image: url('https://storage.googleapis.com/effekt-widget/assets/next.svg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    content: '';
    height: 100%;
    position: absolute;
    right: 16px;
    top: 0;
    width: 32px;
  }
`

export const RecurringSelectWrapper = styled.div`
  padding-bottom: 15px;
  padding-top: 10px;
`
