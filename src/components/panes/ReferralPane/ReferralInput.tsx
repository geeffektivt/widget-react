import { useEffect, useRef } from 'react'

import { ReferralOption } from '../../../@types/import/content/referrals.types'

import {
  ReferralButton,
  RelativeWrapper,
  TextInput,
} from './ReferralPane.style'

interface ReferralInputProps {
  referral: ReferralOption
  onChange: (value: string) => void
  onReferralSelect: (value: ReferralOption) => void
  value: string
  selected: boolean
}

const ReferralInput = ({
  referral,
  onChange,
  onReferralSelect,
  value,
  selected,
}: ReferralInputProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const { name, id } = referral
  useEffect(() => {
    if (selected) {
      ref.current?.focus()
    }
  }, [selected])
  return (
    <RelativeWrapper>
      <TextInput
        name="other"
        type="text"
        placeholder={name}
        onChange={(e) => onChange(e.target.value)}
        value={value ?? ''}
        selected={selected}
        ref={ref}
        hidden={!selected}
      />
      {!selected && (
        <ReferralButton
          key={id}
          onClick={() => {
            onReferralSelect(referral)
            ref.current?.focus()
            ref.current?.select()
          }}
          selected={selected}
        >
          {name}
        </ReferralButton>
      )}
    </RelativeWrapper>
  )
}

export default ReferralInput
