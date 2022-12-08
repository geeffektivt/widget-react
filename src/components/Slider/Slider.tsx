import { Box } from '@material-ui/core'
import {
  Children,
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

type SliderProps = {
  slideNumber: number
}

export const Slider: FC<SliderProps> = ({ children, slideNumber }) => {
  const [sliderWidth, setSliderWidth] = useState(0)
  const childrenNumber = Children.toArray(children).length
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
    <div ref={windowRef} style={{ width: '100%' }} className="window">
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        className="slider"
        style={{
          width: `${100 * childrenNumber}%`,
          transform: `translate3d(${-slideNumber * sliderWidth}px, 0px, 0px)`,
          transition: 'transform 200ms ease',
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
      </Box>
    </div>
  )
}
