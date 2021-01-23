import styled from "styled-components";

export const PayPalFormWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const OrangeSubmit = styled.input`
  background-color: #ffaa2b;
  border: none;
  height: 30px;
  width: 100px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 10px;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;
