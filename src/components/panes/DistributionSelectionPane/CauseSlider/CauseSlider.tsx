import React, { ChangeEvent, ReactNode } from 'react'

import { getStepLength } from '../../../../utils/donationUtils'
import Slider from '../../../shared/_inputs/Slider'
import Lock from '../../../shared/_svg/Lock'

import {
  AccordionContainer,
  FlexContainer,
  LockButton,
} from './CauseSlider.style'

interface CauseSliderProps {
  children: ReactNode
  onLockButtonChange: () => void
  onSliderChange: (event: ChangeEvent<HTMLInputElement>) => void
  isLocked: boolean
  disabled?: boolean
  share: number
  sum: number | null
}

const CauseSlider = ({
  children,
  onLockButtonChange,
  onSliderChange,
  isLocked,
  disabled = false,
  share,
  sum,
}: CauseSliderProps) => {
  return (
    <>
      <AccordionContainer>
        {children}
        <FlexContainer>
          <span>{share} kr</span>
          <LockButton
            disabled={disabled}
            title="Lås"
            aria-label="Lås"
            onClick={onLockButtonChange}
          >
            <Lock isLocked={isLocked} disabled={disabled} />
          </LockButton>
        </FlexContainer>
      </AccordionContainer>
      <div>
        <Slider
          min={0}
          max={sum ?? 0}
          step={share % 5 === 0 ? getStepLength(sum ?? 0) : 1}
          value={share}
          disabled={disabled || isLocked}
          onChange={onSliderChange}
        />
      </div>
    </>
  )
}

export default CauseSlider
