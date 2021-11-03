import React from 'react'

import Warning from '../_svg/Warning/Warning'

import {
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
    <TextInputWrapper label={label} denomination={denomination} valid={valid}>
      {!valid && showWarning && (
        <WarningContainer>
          <Warning />
        </WarningContainer>
      )}
      <TextInputField
        label={label}
        name={name}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        defaultValue={defaultValue}
        denomination={denomination}
        ref={innerRef}
        onClick={(e) => {
          if (selectOnClick) {
            e.currentTarget.select()
          }
        }}
        onChange={onChange}
        value={value}
      />
    </TextInputWrapper>
  )
}
