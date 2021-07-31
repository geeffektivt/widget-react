import { ChangeEvent } from 'react'
import styled from 'styled-components'

import { gray18, orange15, red } from '../../../config/colors'

export interface TextInputProps extends TextInputWrapperProps {
  type: string
  name?: string
  placeholder?: string
  defaultValue?: string | number
  selectOnClick?: boolean
  innerRef?: React.Ref<HTMLInputElement>
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string | number | readonly string[]
  inputMode?: 'tel' | 'decimal' | 'text' | 'numeric' | 'email'
  valid?: boolean
}

export interface TextInputWrapperProps {
  label?: string
  denomination?: string
  valid?: boolean
}

export const TextInputWrapper = styled.div`
  display: block;
  margin-bottom: 5px;
  font-size: 1em;
  border: 1px solid
    ${({ valid = true }: TextInputWrapperProps) => (valid ? gray18 : red)};

  border-radius: 5px;
  box-sizing: border-box;
  position: relative;

  &:before {
    content: '${(props: TextInputWrapperProps) => props.label}';
    height: 100%;
    position: absolute;
    left: 12px;
    top: 0;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: normal;
  }

  ${(props: TextInputWrapperProps) => {
    if (props.denomination) {
      return `
        &:after {
          content: "${props.denomination}";
          height: 100%;
          position: absolute;
          right: 12px;
          top: 0;
          color: ${gray18};
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: normal;
        }
      `
    }
    return ''
  }}

  transition: box-shadow 180ms;
  &:focus-within {
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  }
`

export const TextInputField = styled.input`
  font-size: inherit;
  padding: 1.3em;
  ${(props: TextInputProps) => {
    if (props.denomination) {
      return `
        padding-right: 30px;
      `
    }
    return ''
  }}
  text-align: ${(props: TextInputProps) => (props.label ? 'right' : 'left')};
  border: none;
  box-sizing: border-box;
  width: 100%;
  background: transparent;
  box-shadow: none;
  position: relative;
  z-index: 2;
  border-radius: 5px;
  display: block;

  transition: box-shadow 180ms;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 1.5px ${orange15};
  }
`

export const WarningContainer = styled.div`
  padding: 1.3em;
  position: absolute;
  right: 0;
  top: 0;
`
