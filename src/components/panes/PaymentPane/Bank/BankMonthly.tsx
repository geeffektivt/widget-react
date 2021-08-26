import { MenuItem, InputLabel } from '@material-ui/core'

import { DonationFrequency } from '../../../../constants/enums/RecurringDonation'
import useAllTexts from '../../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../../hooks/store/useTypedSelector'
import { paymentActions } from '../../../../store/payment/payment.slice'
import { NavigationButtons } from '../../../shared/Buttons/NavigationButtons'
import { RichSelect } from '../../../shared/RichSelect/RichSelect'
import { RichSelectOption } from '../../../shared/RichSelect/RichSelectOption'
import {
  Pane,
  Paragraph,
  PrimaryLink,
  PaneTitle,
  DetailsWrapper,
  DetailsRow,
  BoldText,
} from '../../Panes.style'

import { StyledSelect } from './BankMonthly.style'

export default function BankMonthly() {
  const { sum, recurring } = useTypedSelector((state) => state.donation)
  const dispatch = useTypedDispatch()

  const {
    createPaymentResponse,
    preferredTransferDate,
    monthlyPaymentMethod,
  } = useTypedSelector((state) => state.payment)
  const texts = useAllTexts()
  const paymentTexts = texts.donations.payment

  const handleConfirm = () => {}
  const handleChange = (value: string) =>
    dispatch(paymentActions.setPreferredTransferDate(value))
  const handlePaymentAlternativeChange = (value: string) =>
    dispatch(paymentActions.setMonthlyPaymentMethod(value))

  const transferDateOptions = [
    'Snarast möjligt',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ]
  return (
    <Pane>
      <PaneTitle>{paymentTexts.title}</PaneTitle>
      <Paragraph>{paymentTexts.descriptionMonthly}</Paragraph>
      <RichSelect
        name="monthlyPaymentMethod"
        selected={monthlyPaymentMethod}
        onChange={(value) => handlePaymentAlternativeChange(value)}
      >
        <RichSelectOption label={paymentTexts.altATitle} value="A">
          <DetailsWrapper>
            <DetailsRow>
              <BoldText>{paymentTexts.sumTitle}</BoldText>
              <p>{sum}</p>
            </DetailsRow>
            <DetailsRow>
              <BoldText>{paymentTexts.kontonummerTitle}</BoldText>
              <p>{paymentTexts.kontonummer}</p>
            </DetailsRow>
            <DetailsRow>
              <BoldText>
                {recurring === DonationFrequency.Monthly
                  ? paymentTexts.referenceTitleRecurring
                  : paymentTexts.referenceTitleSingle}
              </BoldText>
              <p>{createPaymentResponse?.reference}</p>
            </DetailsRow>
          </DetailsWrapper>
          <Pane>{paymentTexts.altADescription}</Pane>
        </RichSelectOption>
        <RichSelectOption label={paymentTexts.altBTitle} value="B">
          <Pane>
            <Paragraph>{paymentTexts.altBDescription}</Paragraph>
            <Paragraph>{paymentTexts.altBWarning}</Paragraph>
            <Paragraph>
              <BoldText>
                Önskar du att betalningen dras på ett särskilt datum varje
                månad?
              </BoldText>
            </Paragraph>
            <Paragraph>
              <InputLabel id="select-date-label">Välj datum</InputLabel>
            </Paragraph>
            <StyledSelect
              labelId="select-date-label"
              id="preferred-transfer-date"
              value={preferredTransferDate}
              onChange={(
                e: React.ChangeEvent<{
                  name?: string | undefined
                  value: unknown
                }>
              ) => handleChange((e.target.value as string) ?? '')}
            >
              {transferDateOptions.map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </StyledSelect>
          </Pane>
        </RichSelectOption>
        <RichSelectOption label={paymentTexts.altCTitle} value="C">
          <Pane>
            <Paragraph>{paymentTexts.altCDescription}</Paragraph>
            <Paragraph>
              Använd där
              <BoldText>{` ditt betalarnummmer: ${createPaymentResponse?.reference}`}</BoldText>
            </Paragraph>
            <PrimaryLink href={paymentTexts.altCLink}>
              {paymentTexts.altCLinkText}
            </PrimaryLink>
          </Pane>
        </RichSelectOption>
      </RichSelect>
      <NavigationButtons
        nextButtonTitle={paymentTexts.confirmButtonTitle}
        nextButtonOnClick={handleConfirm}
        showBackButton={false}
      />
    </Pane>
  )
}
