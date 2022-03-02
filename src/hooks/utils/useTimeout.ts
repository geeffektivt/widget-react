import { useCallback, useRef } from 'react'

import useOnUnmount from './useOnUnmount'

export default function useTimeout() {
  const timeoutIdRef = useRef(-1)

  useOnUnmount(() => clearTimeout(timeoutIdRef.current))

  return useCallback((callback: () => void, timeout: number) => {
    clearTimeout(timeoutIdRef.current)
    timeoutIdRef.current = setTimeout(callback, timeout) as unknown as number
    return timeoutIdRef.current
  }, [])
}
