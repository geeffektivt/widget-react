import styled from "styled-components";

export const ReferralsWrapper = styled.div``;

export const ReferralButtonsWrapper = styled.div`
  white-space: normal;
  display: flex;
  align-items: space-between;
  flex-wrap: wrap;
  align-self: center;
`;

export const OtherInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const OtherInput = styled.textarea`
  margin-top: 10px;
  width: 200px;
  height: 100px;
  padding: 5px;
`;

export const ReferralButton = styled.button`
  width: 48%;
  padding: 2%;
  margin: 1%;
  background-color: white;
  font-size: 15px;
  color: #484848;
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: 3px;
  box-shadow: 0 0 5px lightgray;

  &:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
`;
