import React from 'react'

import Warning from '../_svg/Warning/Warning'

import {
  Denomination,
  Label,
  TextInputField,
  TextInputProps,
  TextInputWrapper,
  WarningContainer,
} from './TextInput.style'

export function TextInput({
  label,
  denomination,
  name,
  type,
  placeholder,
  defaultValue,
  innerRef,
  selectOnClick,
  onChange,
  value,
  inputMode,
  valid = true,
  showWarning = true,
}: TextInputProps) {
  return (
    <TextInputWrapper valid={valid}>
      <Label>{label}</Label>
      {!valid && showWarning && (
        <WarningContainer>
          <Warning />
        </WarningContainer>
      )}
      <TextInputField
        label={!!label}
        denomination={!!denomination}
        name={name}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        defaultValue={defaultValue}
        ref={innerRef}
        onClick={(e) => {
          if (selectOnClick) {
            e.currentTarget.select()
          }
        }}
        onChange={onChange}
        value={value}
      />
      {denomination && <Denomination>{denomination}</Denomination>}
    </TextInputWrapper>
  )
}
