import { useContext, useMemo } from 'react'
import { ThemeContext } from 'styled-components'

import { ThemeProps } from '../theme'
import { OmitThemeProp } from '../types'
import { getColor } from '../utils/getters'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function partialGetter<T extends (...args: any) => any>(
  getter: T,
  props: ThemeProps
) {
  return function x(...args: OmitThemeProp<Parameters<T>>): ReturnType<T> {
    return getter(...args, props)
  }
}

export default function useTheme() {
  const theme = useContext(ThemeContext)

  return useMemo(() => {
    const themeProps = { theme }

    return {
      color: partialGetter(getColor, themeProps),
    }
  }, [theme])
}
