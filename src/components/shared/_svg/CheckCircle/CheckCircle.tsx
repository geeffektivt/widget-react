import classNames from 'classnames'

interface CheckCircleProps {
  className?: string
}

export default function CheckCircle({ className }: CheckCircleProps) {
  return (
    <svg
      className={classNames(className?.toString())}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <circle fill="#4d9c4d" cx="12" cy="12" r="10" />

      <path
        fill="white"
        d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"
      />
    </svg>
  )
}
