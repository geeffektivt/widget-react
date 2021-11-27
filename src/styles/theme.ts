import colors from './values/colors'
import spacings from './values/spacings'

const theme = {
  colors,
  spacings,
}

export default theme

export type Theme = typeof theme
export type ThemeProps = { theme?: Theme }

export type ColorType = keyof Theme['colors']
export type SpacingType = keyof Theme['spacings']
