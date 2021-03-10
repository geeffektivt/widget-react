import React from 'react'

import { RichSelectWrapper } from './RichSelect.style'
import { OptionProps, RichSelectOption } from './RichSelectOption'

interface RichSelectProps<T> {
  name?: string

  selected: T

  children: React.ReactElement<OptionProps<T>>[]

  onChange: (value: T) => void
}

export function RichSelect<T>({
  name,

  selected,

  children,

  onChange,
}: RichSelectProps<T>) {
  return (
    <RichSelectWrapper>
      {children.map((child, i) => (
        <RichSelectOption
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          name={name}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...child.props}
          selected={child.props.value === selected}
          onSelect={onChange}
        />
      ))}
    </RichSelectWrapper>
  )
}
