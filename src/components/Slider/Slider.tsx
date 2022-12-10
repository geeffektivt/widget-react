import {
  Children,
  FC,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import { SliderContainer, SliderWindow } from './Slider.styles'

type SliderProps = {
  slideNumber: number
  children: ReactNode | ReactNode[]
}

export const Slider: FC<SliderProps> = ({ children, slideNumber }) => {
  const [sliderWidth, setSliderWidth] = useState(0)
  const childrenSize = Children.toArray(children).length
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleWindowResize = () => {
      if (sliderWidth != windowRef.current?.offsetWidth) {
        setSliderWidth(windowRef.current?.offsetWidth || 0)
      }
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  useLayoutEffect(() => {
    if (sliderWidth != windowRef.current?.offsetWidth) {
      setSliderWidth(windowRef.current?.offsetWidth || 0)
    }
  })

  return (
    <SliderWindow ref={windowRef}>
      <SliderContainer
        style={{
          width: `${100 * childrenSize}%`,
          transform: `translate3d(${-slideNumber * sliderWidth}px, 0px, 0px)`,
        }}
      >
        {Children.map(children, (child, index) => {
          return (
            <div
              style={{
                width: `${sliderWidth}px`,
                transition: 'width 200ms ease',
              }}
            >
              {index == slideNumber && child}
            </div>
          )
        })}
      </SliderContainer>
    </SliderWindow>
  )
}
