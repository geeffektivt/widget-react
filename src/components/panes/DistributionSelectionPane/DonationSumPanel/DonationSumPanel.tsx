import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import { donationActions } from '../../../../store/donation/donation.slice'
import { CauseDistribution } from '../../../../store/donation/donation.types'
import { isValidNumber } from '../../../../utils/typeUtils'
import { TextInput } from '../../../shared/Input/TextInput'

interface DonationSumPanelProps {
  sum: number | null
  causesDistribution: CauseDistribution[]
}
const DonationSumPanel = ({
  sum,
  causesDistribution,
}: DonationSumPanelProps) => {
  const dispatch = useTypedDispatch()

  const handleSumChange = (value: string) => {
    const valueAsNumber = Math.round(
      Number(value.replace(/\s/g, '').replace(',', '.'))
    )
    dispatch(
      donationActions.setDonationSum(
        isValidNumber(valueAsNumber) ? valueAsNumber : null
      )
    )

    dispatch(donationActions.updateAllDistributionSums(causesDistribution))
  }
  return (
    <div>
      <TextInput
        type="text"
        inputMode="numeric"
        label="Summa"
        placeholder="0"
        onChange={(e) => handleSumChange(e.target.value)}
        value={sum?.toLocaleString('sv-SE') || ''}
        denomination="kr"
        valid={isValidNumber(sum)}
        showWarning={false}
        selectOnClick
      />
    </div>
  )
}

export default DonationSumPanel
