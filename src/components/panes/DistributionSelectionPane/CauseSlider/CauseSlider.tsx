import React, { ChangeEvent, ReactNode } from 'react'

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
}

const CauseSlider = ({
  children,
  onLockButtonChange,
  onSliderChange,
  isLocked,
  disabled = false,
  share,
}: CauseSliderProps) => {
  return (
    <>
      <AccordionContainer>
        {children}
        <FlexContainer>
          <LockButton
            disabled={disabled}
            title="Lås"
            aria-label="Lås"
            onClick={onLockButtonChange}
          >
            <Lock isLocked={isLocked} disabled={disabled} />
          </LockButton>
          <span>{share}%</span>
        </FlexContainer>
      </AccordionContainer>
      <div>
        <Slider
          min={0}
          max={100}
          step={1}
          value={share}
          disabled={disabled || isLocked}
          onChange={onSliderChange}
        />
      </div>
    </>
  )
}

export default CauseSlider
