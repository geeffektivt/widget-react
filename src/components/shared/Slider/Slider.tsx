import {
  Root,
  Track,
  Thumb,
  Range,
  SliderOwnProps,
} from '@radix-ui/react-slider'
import React from 'react'

import * as styles from './Slider.styles'

interface SliderProps extends SliderOwnProps {
  className?: string
}

export default function Slider({ className, ...sliderOwnProps }: SliderProps) {
  return (
    <Root className={styles.root} {...sliderOwnProps}>
      <Track className={styles.track}>
        <Range className={styles.range} />
      </Track>

      <Thumb className={styles.thumb} />
    </Root>
  )
}
