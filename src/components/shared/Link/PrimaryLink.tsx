// Add PrimaryLinkStyles with higher specificity than just class selector
// so the styling gets higher priority than tilda styling
export const PrimaryLink = ({
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => (
  <a style={PrimaryLinkStyles} {...rest}>
    {children}
  </a>
)

const PrimaryLinkStyles = {
  color: '$primary100',
  textDecoration: 'underline solid currentColor auto',
}
