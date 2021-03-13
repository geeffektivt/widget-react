import { useLayoutEffect, useRef } from 'react'

import useRequestAnimationFrame from '../utils/useRequestAnimationFrame'

export default function useAnimatedMesuredHeight<
  TElement extends HTMLElement = HTMLDivElement
>() {
  const elementRef = useRef<TElement | null>(null)
  const safeRequestAnimationFrame = useRequestAnimationFrame()

  useLayoutEffect(() => {
    const element = elementRef.current
    if (!element) {
      return undefined
    }

    const inlineHeight = element.style.height

    element.style.height = ''

    const measuredNewHeight = element.getBoundingClientRect().height

    element.style.height = inlineHeight

    let rafId = safeRequestAnimationFrame(() => {
      rafId = safeRequestAnimationFrame(() => {
        element.style.height = `${measuredNewHeight}px`
        element.style.transition = 'height 300ms'
      })
    })

    return () => {
      cancelAnimationFrame(rafId)
    }
  })

  return elementRef
}
