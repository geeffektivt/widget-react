import { Cause } from '../../@types/import/content/organizations.types'
import causesAndOrganizations from '../../content/organizations.json'

// Named as a hook because the idea is to put them in the store later
export default function useAllCauses(): Cause[] {
  return causesAndOrganizations
}
