import React, { ReactNode } from 'react'

import {
  Content,
  HeaderLabel,
  HeaderSubLabel,
  HeaderWrapper,
  HiddenInput,
  LabelWrapper,
  RadioBall,
  Wrapper,
} from './RichSelectOption.style'

export interface OptionProps<T> {
  label: string
  sublabel?: string

  name?: string
  value: T
  selected?: boolean

  children?: ReactNode

  onSelect?: (value: T) => void
}

export function RichSelectOption<T>({
  label,
  sublabel,

  name,
  value,
  selected,

  children,

  onSelect,
}: OptionProps<T>) {
  const onInputChange = () => {
    onSelect?.(value)
  }

  return (
    <Wrapper>
      <LabelWrapper>
        <HiddenInput
          name={name}
          type="radio"
          value={value as unknown as string}
          checked={selected}
          onChange={onInputChange}
        />

        <RadioBall />

        <HeaderWrapper>
          <HeaderLabel>{label}</HeaderLabel>
          {sublabel && <HeaderSubLabel>{sublabel}</HeaderSubLabel>}
        </HeaderWrapper>
      </LabelWrapper>

      {children && selected && <Content>{children}</Content>}
    </Wrapper>
  )
}
