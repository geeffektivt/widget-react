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

  const handleSumChange = (value: number) => {
    dispatch(
      donationActions.setDonationSum(isValidNumber(value) ? value : null)
    )

    dispatch(donationActions.updateAllDistributionSums(causesDistribution))
  }
  return (
    <div>
      <TextInput
        type="number"
        inputMode="numeric"
        label="Summa"
        placeholder="0"
        onChange={(e) => handleSumChange(e.target.valueAsNumber)}
        value={String(sum) || ''}
        denomination="kr"
        valid={isValidNumber(sum)}
        showWarning={false}
      />
    </div>
  )
}

export default DonationSumPanel
