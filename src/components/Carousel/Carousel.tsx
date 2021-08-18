import { useRef, useState, useEffect, ReactNode } from 'react'

import useCurrentStepIndex from '../../hooks/ui/useCurrentStepIndex'

import * as styles from './Carousel.styles'

interface ICarouselProps {
  children: ReactNode[]
}

export default function Carousel({ children }: ICarouselProps) {
  const [currentPaneNumber, setCurrentPaneNumber] = useState(0) // get from redux global state
  const [renderedPanes, setRenderedPanes] = useState([true])

  const containerRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    window.scrollTo(0, 0)
    containerRef.current?.scrollTo(0, 0)
  }, [currentPaneNumber])

  function changePaneByOffset(offset: number) {
    const newRenderedPanes = [...renderedPanes]
    newRenderedPanes[currentPaneNumber + offset] = true
    setRenderedPanes(newRenderedPanes)

    setCurrentPaneNumber(currentPaneNumber + offset)

    setTimeout(() => {
      const newRenderedPanes2 = [...renderedPanesRef.current]
      newRenderedPanes2[currentPaneNumberRef.current - offset] = false
      setRenderedPanes(newRenderedPanes2)
      window.scrollTo(0, 0)
      containerRef.current?.scrollTo(0, 0)
    }, 100)
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
            <div
              className={styles.carouselItem()}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              ref={containerRef}
            >
              {renderedPanes[index] && child}
            </div>
          )
        })}
      </div>
    </div>
  )
}
