import { Cause } from '../../@types/import/content/organizations.types'
import causesAndOrganizations from '../../content/organizations.json'

import useAllTexts from './useAllTexts'

// Named as a hook because the idea is to put them in the store later
const useAllCauses = (): Cause[] => {
  const texts = useAllTexts()
  const {
    id,
    name,
    standardShare,
    standardOrganizationShareText,
    standardOrganizationShareExplanation,
  } = texts.donations.tip
  const tip = {
    id,
    name,
    standardShare,
    standardOrganizationShareText,
    standardOrganizationShareExplanation,
    organizations: [],
  }
  return [...causesAndOrganizations, tip]
}
export default useAllCauses
