import { useForm } from 'react-hook-form'
import Validate from 'validator'

import { DonorType } from '../../../constants/enums/DonorType'
import useAllTexts from '../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../hooks/store/useTypedSelector'
import { donationActions } from '../../../store/donation/donation.slice'
import { DonorInput } from '../../../store/state'
import { uiActions } from '../../../store/ui/ui.slice'
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

interface DonorFormValues extends DonorInput {
  privacyPolicy: boolean
}

export function DonorPane() {
  const dispatch = useTypedDispatch()

  const selectedDonorType = useTypedSelector(
    (state) => state.donation.donorType
  )

  const texts = useAllTexts()
  const paneTexts = texts.donations.donor

  const { register, watch, errors, handleSubmit } = useForm<DonorFormValues>()

  const watchAllFields = watch()

  const isNameInvalid = Boolean(errors.name)
  const isEmailInvalid = Boolean(errors.email)
  const isSsnInvalid = Boolean(errors.ssn)
  const isPrivacyPolicyInvalid = Boolean(errors.privacyPolicy)

  const isAnonymous = selectedDonorType === DonorType.Anonymous

  const isNextDisabled = !isAnonymous && Object.keys(errors).length > 0

  function onDonorTypeChange(donorType: DonorType) {
    dispatch(donationActions.setDonorType(donorType))
  }

  function onFormSubmit(formValues: DonorFormValues) {
    let donorInfo: Required<DonorInput>
    if (selectedDonorType === DonorType.Anonymous) {
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

    dispatch(donationActions.setDonorInformation(donorInfo))
    dispatch(uiActions.goToNextStep())
  }

  return (
    <Pane>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <RichSelect
          name="donorType"
          selected={selectedDonorType}
          onChange={onDonorTypeChange}
        >
          <RichSelectOption
            label={paneTexts.personalInfoLabel}
            value={DonorType.Donor}
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
            value={DonorType.Anonymous}
          />
        </RichSelect>

        <NextButton type="submit" disabled={isNextDisabled}>
          {paneTexts.nextLabel}
        </NextButton>
      </form>
    </Pane>
  )
}
