import styled from "styled-components";
import { gray20 } from "../../../config/colors";

export const MethodWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const InfoText = styled.p`
  font-size: 12px;
  line-height: 150%;
  color: ${gray20};
  margin: 0;
`;

export const MethodButton = styled.div`
  padding: 16px;
  height: 80px;
  box-sizing: border-box;
  box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.15);
  margin-bottom: 15px;
  width: 100%;
  transition: all 90ms;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 56px;
  color: ${gray20};
  position: relative;

  &:active {
    box-shadow: 0px 1px 2px 0 rgba(0, 0, 0, 0.3);
  }

  &.bank {
    background-image: url("https://storage.googleapis.com/effekt-widget/assets/logos/bank.png");
    background-position: 16px center;
    background-size: 120px;
    background-repeat: no-repeat;
  }

  &.vipps {
    background-image: url("https://storage.googleapis.com/effekt-widget/assets/logos/vipps.png");
    background-position: 16px center;
    background-size: 120px;
    background-repeat: no-repeat;
  }

  &.paypal {
    background-image: url("https://storage.googleapis.com/effekt-widget/assets/logos/PayPal.png");
    background-position: 16px center;
    background-size: 120px;
    background-repeat: no-repeat;
  }

  &::after {
    content: "";
    position: absolute;
    right: 16px;
    top: 0;
    height: 100%;
    width: 32px;
    background-image: url("https://storage.googleapis.com/effekt-widget/assets/next.svg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

export const RecurringSelectWrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 15px;
`;
