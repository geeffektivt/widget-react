import useAllCauses from '../../../../hooks/content/useAllCauses'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../../hooks/store/useTypedSelector'
import { donationActions } from '../../../../store/donation/donation.slice'
import { isValidNumber } from '../../../../utils/typeUtils'
import { TextInput } from '../../../shared/Input/TextInput'

export default function DonationSumPanel() {
  const dispatch = useTypedDispatch()
  const sum = useTypedSelector((state) => state.donation.sum)
  const causes = useAllCauses()

  const handleSumChange = (value: number) => {
    dispatch(
      donationActions.setDonationSum(isValidNumber(value) ? value : null)
    )

    dispatch(donationActions.resetDistribution(causes))
  }
  return (
    <div>
      <TextInput
        type="number"
        denomination="kr"
        label="Summa"
        placeholder="0"
        onChange={(e) => handleSumChange(e.target.valueAsNumber)}
        value={String(sum) || ''}
        inputMode="numeric"
      />
    </div>
  )
}
