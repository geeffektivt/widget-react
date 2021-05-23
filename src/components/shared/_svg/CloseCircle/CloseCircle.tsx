import classNames from 'classnames'

interface CloseCircleProps {
  className?: string
}

export default function CloseCircle({ className }: CloseCircleProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={classNames(className?.toString())} // ! TODO search a better alternative for this
    >
      <circle fill="#c30000" cx="12" cy="12" r="10" />

      <path
        fill="white"
        d="M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z"
      />
    </svg>
  )
}
