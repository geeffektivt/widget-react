import { useRef, useState, useEffect, ReactNode } from 'react'

import useCurrentStepIndex from '../../hooks/ui/useCurrentStepIndex'

import * as styles from './Carousel.styles'

interface ICarouselProps {
  children: ReactNode[]
}

export default function Carousel({ children }: ICarouselProps) {
  const [currentPaneNumber, setCurrentPaneNumber] = useState(0) // get from redux global state
  const [renderedPanes, setRenderedPanes] = useState([true])

  const renderedPanesRef = useRef(renderedPanes)
  renderedPanesRef.current = renderedPanes

  const currentPaneNumberRef = useRef(currentPaneNumber)
  currentPaneNumberRef.current = currentPaneNumber

  const reduxPaneNumber = useCurrentStepIndex()

  // This hook detects when paneNumber changes in the Redux store
  useEffect(() => {
    if (reduxPaneNumber !== currentPaneNumber) {
      changePaneByOffset(reduxPaneNumber - currentPaneNumber)
    }
  }, [reduxPaneNumber])

  function changePaneByOffset(offset: number) {
    const newRenderedPanes = [...renderedPanes]
    newRenderedPanes[currentPaneNumber + offset] = true
    setRenderedPanes(newRenderedPanes)

    setCurrentPaneNumber(currentPaneNumber + offset)

    setTimeout(() => {
      const newRenderedPanes2 = [...renderedPanesRef.current]
      newRenderedPanes2[currentPaneNumberRef.current - offset] = false
      setRenderedPanes(newRenderedPanes2)
    }, 200)
  }

  return (
    <div className={styles.carousel()}>
      <div
        className={styles.carouselInner()}
        style={{
          transform: `translate3d(${currentPaneNumber * -100}%, 0, 0)`,
        }}
      >
        {children.filter(Boolean).map((child, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div className={styles.carouselItem()} key={index}>
              {renderedPanes[index] && child}
            </div>
          )
        })}
      </div>
    </div>
  )
}
