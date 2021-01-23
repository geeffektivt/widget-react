import styled from "styled-components";

export const ShareInputContainer = styled.div`
  border: 1px solid gray;
  border-radius: 8px;
  margin: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OrganizationName = styled.p`
  margin-left: 5px;
  display: inline-block;
  font-size: 20px;
`;

export const PercentageText = styled.p`
  margin-left: 5px;
  margin-right: 5px;
  display: inline-block;
  color: gray;
  font-size: 20px;
`;

export const ShareInput = styled.input`
  width: 4vw;
  border: none;
  font-size: 20px;
  text-align: right;
  box-sizing: border-box;

  &&:hover {
    box-sizing: border-box;
    border: 2px solid gray;
    border-radius: 5px;
  }

  &&:focus {
    outline: none;
    box-sizing: border-box;
    border: 2px solid black;
    border-radius: 5px;
  }
`;
