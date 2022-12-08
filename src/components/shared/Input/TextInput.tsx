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

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      denomination,
      name,
      type,
      placeholder,
      defaultValue,
      selectOnClick,
      onChange,
      onInput,
      onBlur,
      value,
      inputMode,
      valid = true,
      showWarning = true,
    },
    ref
  ) => (
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
        ref={ref}
        onClick={(e) => {
          if (selectOnClick) {
            e.currentTarget.select()
          }
        }}
        onChange={onChange}
        onInput={onInput}
        onBlur={onBlur}
        value={value}
      />
      {denomination && <Denomination>{denomination}</Denomination>}
    </TextInputWrapper>
  )
)

export default TextInput
