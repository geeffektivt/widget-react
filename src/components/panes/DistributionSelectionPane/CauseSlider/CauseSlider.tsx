import React, { ChangeEvent, ReactNode } from 'react'

import { PercentageToKronor } from '../../../../utils/donationUtils'
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
          <span>{share} %</span>
          <LockButton
            disabled={disabled}
            title="Lås"
            aria-label="Lås"
            onClick={onLockButtonChange}
          >
            <Lock isLocked={isLocked} disabled={disabled} />
          </LockButton>
          {/* <span>{share}%</span> */}
          <span>{PercentageToKronor(share, sum)} kr</span>
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
