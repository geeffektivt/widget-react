import React from 'react'

import Warning from '../_svg/Warning/Warning'

import { TextAreaField, TextAreaProps } from './TextArea.style'
import {
  Denomination,
  Label,
  TextInputWrapper,
  WarningContainer,
} from './TextInput.style'

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      denomination,
      name,
      placeholder,
      defaultValue,
      selectOnClick,
      onChange,
      onInput,
      onBlur,
      value,
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
      <TextAreaField
        label={!!label}
        denomination={!!denomination}
        name={name}
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

export default TextArea
