import { FC, FocusEvent, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import Validate from 'validator'

import useAllTexts from '../../hooks/content/useAllTexts'
import useTypedDispatch from '../../hooks/store/useTypedDispatch'
import { giftCardsActions } from '../../store/giftCards/giftCards.slice'
import { GiftCard } from '../../store/giftCards/giftCards.types'
import { InputFieldWrapper } from '../panes/Forms.style'
import ErrorField from '../shared/Error/ErrorField'
import TextArea from '../shared/Input/TextArea'
import TextInput from '../shared/Input/TextInput'

import { GiftCardFormContainer } from './GiftCardForm.styles'

type FormInputs = {
  receiverName: string
  receiverEmail: string
  body: string
  schedule: Date
}

type GiftCardProps = {
  giftCard: GiftCard
}

export const GiftCardForm: FC<GiftCardProps> = ({ giftCard }) => {
  const {
    donations: { giftCards: paneTexts },
  } = useAllTexts()
  const dispatch = useTypedDispatch()
  const [formId] = useState(`giftCard.${giftCard.id}`)

  const {
    register,
    setFocus,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onTouched',
    defaultValues: {
      receiverName: giftCard.receiverName,
      receiverEmail: giftCard.receiverEmail,
      schedule: new Date(),
      body: giftCard?.body,
    },
  })

  const onBlur = (event: FocusEvent<HTMLFormElement, Element>) => {
    const { name, value } = event.target
    dispatch(giftCardsActions.updateGiftCard({ ...giftCard, [name]: value }))
  }

  const isNameInvalid = useMemo(
    () => Boolean(errors.receiverName),
    [errors.receiverName]
  )
  const isEmailInvalid = useMemo(
    () => Boolean(errors.receiverEmail),
    [errors.receiverEmail]
  )

  useEffect(() => {
    setFocus('receiverName')
    if (giftCard.body === undefined) {
      dispatch(
        giftCardsActions.updateGiftCard({
          ...giftCard,
          body: paneTexts.bodyDefaultValue,
        })
      )
    }
  }, [])

  return (
    <GiftCardFormContainer onBlur={onBlur} id={formId}>
      <InputFieldWrapper>
        <TextInput
          type="text"
          placeholder={paneTexts.namePlaceholder}
          {...register('receiverName', { required: true, minLength: 1 })}
          valid={!isNameInvalid}
        />
        {isNameInvalid && <ErrorField text={paneTexts.nameError} />}
        <TextInput
          inputMode="email"
          type="text"
          placeholder={paneTexts.emailPlaceholder}
          {...register('receiverEmail', {
            required: true,
            validate: (val) => val && Validate.isEmail(val),
          })}
          valid={!isEmailInvalid}
        />
        {isEmailInvalid && <ErrorField text={paneTexts.emailError} />}
        <TextArea
          placeholder={`${paneTexts.bodyPlaceholder} ${
            giftCard.receiverName || '[Namn]'
          }`}
          {...register('body', {
            required: false,
            deps: ['name', 'email'],
          })}
        />
        <TextInput
          type="date"
          label={paneTexts.scheduleLabel}
          {...register('schedule', {
            required: true,
          })}
        />{' '}
      </InputFieldWrapper>
    </GiftCardFormContainer>
  )
}
