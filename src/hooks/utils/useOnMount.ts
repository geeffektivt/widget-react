import { useEffect, EffectCallback } from 'react'

export default function useOnMount(callback: EffectCallback) {
  useEffect(callback, [])
}
