import styled from "styled-components";
import { gray20 } from "../../../config/colors";

export const NextButton = styled.button`
  height: 45px;
  background: ${(props: NextButtonProps) => (props.disabled ? gray20 : "#000")};
  color: white;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  border: none;
  cursor: pointer;
`;

interface NextButtonProps {
  disabled?: boolean;
}
