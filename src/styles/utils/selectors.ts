/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProps } from '../theme'
import { OmitThemeProp, Resolver } from '../types'

import { getColor, getSpacing } from './getters'

function createSelector<T extends (...args: any) => any>(getter: T) {
  function x(...args: OmitThemeProp<Parameters<T>>): Resolver<ReturnType<T>>
  function x(...args: Parameters<T>): ReturnType<T>
  function x(...args: any): any {
    if (args.length === getter.length) {
      return getter(...args)
    }

    return (props: ThemeProps) => getter(...args, props)
  }

  return x
}

export const color = createSelector(getColor)
export const spacings = createSelector(getSpacing)
