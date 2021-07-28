import React from 'react'

import {
  TextInputField,
  TextInputProps,
  TextInputWrapper,
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
}: TextInputProps) {
  return (
    <TextInputWrapper label={label} denomination={denomination}>
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
          if (selectOnClick) e.currentTarget.select()
        }}
        onChange={onChange}
        value={value}
      />
    </TextInputWrapper>
  )
}
