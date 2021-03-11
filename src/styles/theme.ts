import { css } from './stitches.config'
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

export const orangeTheme = css.theme({
  colors: {
    $primary100: 'hsl(36deg 100% 58%)', // orange 20
    $primary200: 'hsl(36deg 100% 67%)', // orange 15

    $secondary100: 'hsl(198deg 82% 23%)',
    $secondary200: 'hsl(198deg 82% 13%)',
  },
})
