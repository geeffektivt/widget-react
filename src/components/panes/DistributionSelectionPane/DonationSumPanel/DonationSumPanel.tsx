import { TextInput } from '../../../shared/Input/TextInput'

export default function DonationSumPanel() {
  return (
    <div>
      <TextInput
        type="number"
        denomination="kr"
        label="Summa"
        placeholder="0"
      />
    </div>
  )
}
