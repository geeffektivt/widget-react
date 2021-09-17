import { styled, keyframes } from '../../../../styles/stitches.config'

const stroke = keyframes({
  '100%': { strokeDashoffset: '0' },
})

const fill = keyframes({
  '100%': { boxShadow: 'inset 0px 0px 0px 30px #7ac142' },
})

const scale = keyframes({
  '0%, 100%': {
    transform: 'none',
  },
  '50%': {
    transform: 'scale3d(1.1, 1.1, 1)',
  },
})

export const StyledSvg = styled('svg', {
  '&.checkmark__circle': {
    animation: `${stroke} .6s cubic-bezier(0.650, 0.000, 0.450, 1.000) forwards`,
    fill: 'none',
    stroke: '#7ac142',
    strokeDasharray: '166',
    strokeDashoffset: '166',
    strokeMiterlimit: '10',
    strokeWidth: '1',
  },

  '&.checkmark': {
    animation: `${fill} .4s ease-in-out .4s forwards, ${scale} .3s ease-in-out .9s both`,
    borderRadius: '50%',
    boxShadow: 'inset 0px 0px 0px #7ac142',
    display: 'block',
    height: '56px',
    margin: '10% auto',
    stroke: '#fff',
    strokeMiterlimit: '10',
    strokeWidth: '2',
    width: '56px',
  },

  '&.checkmark__check': {
    animation: `${stroke} .3s cubic-bezier(0.650, 0.000, 0.450, 1.000) .8s forwards`,
    strokeDasharray: '48',
    strokeDashoffset: '48',
    transformOrigin: '50% 50%',
  },
})

export default function CheckCircle() {
  return (
    <StyledSvg
      className="checkmark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle
        className="checkmark__circle"
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />
      <path
        className="checkmark__check"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </StyledSvg>
  )
}
