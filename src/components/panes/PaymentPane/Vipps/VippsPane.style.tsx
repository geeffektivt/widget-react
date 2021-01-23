import styled from "styled-components";

export const VippsButton = styled.div`
  width: 210px;
  height: 44px;
  background-image: url(https://storage.googleapis.com/effekt-widget/assets/vipps/vipps-btn.svg);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: inline-block;
  margin: 100px;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;
