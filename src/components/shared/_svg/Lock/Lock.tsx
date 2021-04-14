import * as styles from './Lock.styles'

interface LockProps {
  isLocked?: boolean
  disabled?: boolean
}

const Lock = ({ isLocked = false, disabled = false }: LockProps) =>
  isLocked ? (
    <svg
      className={disabled ? styles.disabled() : styles.locked()}
      stroke="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1.5em"
      width="1.5em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12,2C9.243,2,7,4.243,7,7v2H6c-1.103,0-2,0.897-2,2v9c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2v-9c0-1.103-0.897-2-2-2 h-1V7C17,4.243,14.757,2,12,2z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v2H9V7z M18.002,20H13v-2.278c0.595-0.347,1-0.985,1-1.722 c0-1.103-0.897-2-2-2s-2,0.897-2,2c0,0.736,0.405,1.375,1,1.722V20H6v-9h12L18.002,20z" />
    </svg>
  ) : (
    <svg
      className={disabled ? styles.disabled() : styles.unLocked()}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1.5em"
      width="1.5em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12,4c1.654,0,3,1.346,3,3h2c0-2.757-2.243-5-5-5S7,4.243,7,7v2H6c-1.103,0-2,0.897-2,2v9c0,1.103,0.897,2,2,2h12 c1.103,0,2-0.897,2-2v-9c0-1.103-0.897-2-2-2H9V7C9,5.346,10.346,4,12,4z M18.002,20H13v-2.278c0.595-0.347,1-0.985,1-1.722 c0-1.103-0.897-2-2-2s-2,0.897-2,2c0,0.736,0.405,1.375,1,1.722V20H6v-9h12L18.002,20z" />
    </svg>
  )

export default Lock
