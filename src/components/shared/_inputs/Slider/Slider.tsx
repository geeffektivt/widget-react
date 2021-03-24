import { useEffect, useRef } from 'react'

import { sliderInput, sliderRoot, sliderProgress } from './Slider.style'

// interface ISliderProps {}

export type SliderProps = Omit<JSX.IntrinsicElements['input'], 'type'>

export default function Slider({
  value,
  min = 0,
  max = 100,

  disabled,

  className,

  ...inputProps
}: SliderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const rootEl = rootRef.current
    rootEl?.style.setProperty('--value', String(value))
  })

  return (
    <div className={sliderRoot()} ref={rootRef} data-disabled={disabled}>
      <input
        className={sliderInput()}
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        {...inputProps}
      />

      <div className={sliderProgress()} />
    </div>
  )
}