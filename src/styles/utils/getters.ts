import defaultTheme, { ColorType, SpacingType, ThemeProps } from '../theme'

function getTheme(props: ThemeProps) {
  return props.theme && props.theme.colors ? props.theme : defaultTheme
}

export function getColor(type: ColorType, props: ThemeProps) {
  return getTheme(props).colors[type]
}

export function getSpacing(type: SpacingType, props: ThemeProps) {
  return getTheme(props).spacings[type]
}
