import { ThemeProps } from './theme'

export type Resolver<T> = (props: ThemeProps) => T

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OmitThemeProp<Args extends any[]> = Args[3] extends ThemeProps
  ? [Args[0], Args[1], Args[2]]
  : Args[2] extends ThemeProps
  ? [Args[0], Args[1]]
  : [Args[0]]
