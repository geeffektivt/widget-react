import classNames from 'classnames'
import { useEffect, useRef } from 'react'

import { sliderInput, sliderRoot, sliderProgress } from './Slider.style'

export type SliderProps = Omit<JSX.IntrinsicElements['input'], 'type'>

const Slider = ({
  value,
  min = 0,
  max = 100,

  disabled,

  className,

  ...inputProps
}: SliderProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const rootEl = rootRef.current
    rootEl?.style.setProperty(
      '--value',
      String((Number(value) / Number(max)) * 100)
    )
  })

  return (
    <div
      className={classNames(sliderRoot().className, className)}
      ref={rootRef}
      data-disabled={disabled}
    >
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

export default Slider
