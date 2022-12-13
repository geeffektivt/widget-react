import {
  Children,
  FC,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import { SliderContainer } from './Slider.styles'

type SliderProps = {
  slideNumber: number
  children: ReactNode | ReactNode[]
}

export const Slider: FC<SliderProps> = ({ children, slideNumber }) => {
  const [slideWidth, setSlideWidth] = useState(0)
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleWindowResize = () => {
      if (slideWidth != windowRef.current?.offsetWidth) {
        setSlideWidth(windowRef.current?.offsetWidth || 0)
      }
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  useLayoutEffect(() => {
    if (slideWidth != windowRef.current?.offsetWidth) {
      setSlideWidth(windowRef.current?.offsetWidth || 0)
    }
  })

  return (
    <div ref={windowRef} style={{ width: '100%', position: 'relative' }}>
      <SliderContainer
        style={{
          width: `${slideWidth}px`,
        }}
      >
        {Children.map(children, (child, index) => {
          return (
            <div
              style={{
                width: `${slideWidth}px`,
                transform: `translate3d(${
                  (index - slideNumber) * slideWidth
                }px, 0px, 0px)`,
                transition: 'transform 200ms ease, width 200ms ease',
              }}
            >
              {index == slideNumber && child}
            </div>
          )
        })}
      </SliderContainer>
    </div>
  )
}
