import styled from "styled-components";
import { gray18 } from "../../config/colors";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const InputFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextField = styled.input`
  padding: 20px;
  display: block;
  margin: 5px;
  font-size: 15px;
  border: 1px solid ${gray18};
  border-radius: 5px;
  box-sizing: border-box;
`;

export const CheckBox = styled.input`
  margin-left: 10px;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export const RadioWrapper = styled.div``;

export const RadioButton = styled.input`
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const InputLabel = styled.p`
  align-self: start;
  font-size: 12px;
  display: inline;
  position: relative;
  bottom: 2px;
  margin-left: 5px;
`;
