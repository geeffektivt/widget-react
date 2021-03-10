import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Validate from 'validator'

import useAllTexts from '../../../hooks/content/useAllTexts'
import { submitDonorInfo } from '../../../store/donation/actions'
import { nextPane } from '../../../store/layout/actions'
import { DonorInput } from '../../../store/state'
import { DonorType } from '../../../types/Temp'
import { NextButton } from '../../shared/Buttons/NavigationButtons.style'
import ErrorField from '../../shared/Error/ErrorField'
import { TextInput } from '../../shared/Input/TextInput'
import { RichSelect } from '../../shared/RichSelect/RichSelect'
import { RichSelectOption } from '../../shared/RichSelect/RichSelectOption'
import { ToolTip } from '../../shared/ToolTip/ToolTip'
import ActionString from '../../shared/_functional/ActionString'
import {
  InputFieldWrapper,
  TextField,
  CheckboxLabel,
  CheckBox,
  CheckboxWrapper,
} from '../Forms.style'
import { PrimaryLink, Pane } from '../Panes.style'

import { DonorForm } from './DonorPane.style'

interface DonorFormValues extends DonorInput {
  privacyPolicy: boolean
}

export function DonorPane() {
  const dispatch = useDispatch()

  const texts = useAllTexts()
  const paneTexts = texts.donations.donor

  const [donorType, setDonorType] = useState(DonorType.DONOR)

  const {
    register,
    watch,
    errors,
    handleSubmit,
    clearErrors,
  } = useForm<DonorFormValues>()

  const watchAllFields = watch()

  const isNameInvalid = Boolean(errors.name)
  const isEmailInvalid = Boolean(errors.email)
  const isSsnInvalid = Boolean(errors.ssn)
  const isPrivacyPolicyInvalid = Boolean(errors.privacyPolicy)

  const isAnonymous = donorType === DonorType.ANONYMOUS

  const isNextDisabled = !isAnonymous && Object.keys(errors).length > 0

  function onFormSubmit(formValues: DonorFormValues) {
    let donorInfo: Required<DonorInput>
    if (donorType === DonorType.ANONYMOUS) {
      donorInfo = { ...paneTexts.anonymousDonor }
    } else {
      donorInfo = {
        name: formValues.name ?? '',
        email: formValues.email ?? '',
        taxDeduction: formValues.taxDeduction ?? false,
        ssn: formValues.ssn ?? -1,
        newsletter: formValues.newsletter ?? false,
      }
    }

    dispatch(submitDonorInfo(donorInfo))
    dispatch(nextPane())
  }

  return (
    <Pane>
      <DonorForm onSubmit={handleSubmit(onFormSubmit)}>
        <RichSelect
          name="donorType"
          selected={donorType}
          onChange={(type) => setDonorType(type)}
        >
          <RichSelectOption
            label={paneTexts.personalInfoLabel}
            value={DonorType.DONOR}
          >
            <InputFieldWrapper>
              <TextInput
                name="name"
                type="text"
                placeholder={paneTexts.namePlaceholder}
                innerRef={register({ required: !isAnonymous, minLength: 1 })}
              />
              {isNameInvalid && <ErrorField text={paneTexts.nameError} />}

              <TextInput
                name="email"
                type="text"
                placeholder={paneTexts.emailPlaceholder}
                innerRef={register({
                  required: !isAnonymous,
                  validate: (val) => Validate.isEmail(val),
                })}
              />
              {isEmailInvalid && <ErrorField text={paneTexts.emailError} />}
            </InputFieldWrapper>

            <div>
              <CheckboxWrapper>
                <CheckBox name="taxDeduction" type="checkbox" ref={register} />

                <CheckboxLabel>{paneTexts.taxDeductionLabel}</CheckboxLabel>

                <ToolTip
                  text={paneTexts.taxDeductionTooltip}
                  link={paneTexts.taxDeductionLink}
                />
              </CheckboxWrapper>

              {watch('taxDeduction') && (
                <InputFieldWrapper>
                  <TextField
                    name="ssn"
                    type="number"
                    inputMode="tel"
                    placeholder={paneTexts.ssnPlaceholder}
                    ref={register({
                      required: false,
                      validate: (val) =>
                        !watchAllFields.taxDeduction ||
                        (Validate.isInt(val) &&
                          Validate.isLength(val, { min: 9, max: 11 })),
                    })}
                  />

                  {isSsnInvalid && <ErrorField text={paneTexts.ssnError} />}
                </InputFieldWrapper>
              )}

              <CheckboxWrapper>
                <CheckBox
                  name="privacyPolicy"
                  type="checkbox"
                  ref={register({ required: !isAnonymous })}
                />

                <CheckboxLabel>
                  <ActionString value={paneTexts.privacyPolicyLabel}>
                    {(text, link) => (
                      <PrimaryLink
                        target="_blank"
                        rel="noopener noreferrer"
                        href={link}
                      >
                        {text}
                      </PrimaryLink>
                    )}
                  </ActionString>
                </CheckboxLabel>
              </CheckboxWrapper>

              {isPrivacyPolicyInvalid && (
                <ErrorField text={paneTexts.privacyPolicyError} />
              )}

              <CheckboxWrapper>
                <CheckBox name="newsletter" type="checkbox" ref={register} />
                <CheckboxLabel>{paneTexts.newsletterLabel}</CheckboxLabel>
              </CheckboxWrapper>
            </div>
          </RichSelectOption>

          <RichSelectOption
            label={paneTexts.donateAnonymouslyLabel}
            value={DonorType.ANONYMOUS}
          />
        </RichSelect>

        <NextButton type="submit" disabled={isNextDisabled}>
          {paneTexts.nextLabel}
        </NextButton>
      </DonorForm>
    </Pane>
  )
}
