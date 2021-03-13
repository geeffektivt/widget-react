import { useCallback, useRef } from 'react'

import useOnUnmount from './useOnUnmount'

export default function useRequestAnimationFrame() {
  const rafIdRef = useRef(-1)

  useOnUnmount(() => cancelAnimationFrame(rafIdRef.current))

  return useCallback((callback: FrameRequestCallback) => {
    cancelAnimationFrame(rafIdRef.current)
    rafIdRef.current = requestAnimationFrame(callback)
    return rafIdRef.current
  }, [])
}
