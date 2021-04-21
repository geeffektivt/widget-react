import { Cause } from '../../@types/import/content/organizations.types'
import { ShareType } from '../../constants/enums/ShareType'
import {
  mutableRoundRobinUpdateAllShares,
  mutableRoundRobinUpdateShareAtIndex,
} from '../../utils/donationUtils'

import {
  BaseDistribution,
  CauseDistribution,
  OrganizationDistribution,
} from './donation.types'

export function resetDistributionsHelper(causesData: Cause[], sum: number) {
  let totalCauseShareLeft = sum

  return causesData.map((cause) => {
    const standardShareInKronor = (cause.standardShare / 100) * (sum ?? 0)
    const share = Math.max(
      totalCauseShareLeft - standardShareInKronor,
      standardShareInKronor
    )

    totalCauseShareLeft -= share

    let totalOrganizationShareLeft = share
    const nbrOfOrganizations = cause.organizations.length

    const causeDistribution: CauseDistribution = {
      id: cause.id,

      share,
      isLocked: false,
      shareType: ShareType.Standard,

      lastOrganizationRoundRobinIndex: 0,

      organizationsDistribution: cause.organizations.map(
        (organization, index) => {
          const isLast = index === nbrOfOrganizations - 1

          const startShare = isLast
            ? totalOrganizationShareLeft
            : Math.min(
                totalOrganizationShareLeft,
                Math.round(share / nbrOfOrganizations)
              )

          totalOrganizationShareLeft -= startShare

          const organizationDistribution: OrganizationDistribution = {
            id: organization.id,
            share: startShare,
            isLocked: false,
          }

          return organizationDistribution
        }
      ),
    }

    return causeDistribution
  })
}

/**
 * Update cause distributions, and their organizations distributions accordingly
 */
export function updateCauseDistributionsHelper(
  distributions: CauseDistribution[],
  updatedId: BaseDistribution['id'],
  updatedValue: number,
  lastRoundRobinIndex: number,
  sum: number
) {
  const itemIndex = distributions.findIndex((item) => item.id === updatedId)

  if (itemIndex === -1) {
    return null
  }
  const oldDistributionShares = distributions.map((d) => d.share)

  const roundrobinIndex = mutableRoundRobinUpdateShareAtIndex(
    distributions,
    itemIndex,
    updatedValue,
    lastRoundRobinIndex,
    sum
  )

  distributions.forEach((d, i) => {
    const { roundRobinEndIndex } = mutableRoundRobinUpdateAllShares(
      d.organizationsDistribution,
      oldDistributionShares[i],
      d.share,
      d.lastOrganizationRoundRobinIndex
    )
    d.lastOrganizationRoundRobinIndex = roundRobinEndIndex
  })

  return roundrobinIndex
}

export function updateDistributionsHelper(
  distributions: BaseDistribution[],
  updatedId: BaseDistribution['id'],
  updatedValue: number,
  lastRoundRobinIndex: number,
  sum: number
) {
  const itemIndex = distributions.findIndex((item) => item.id === updatedId)

  if (itemIndex === -1) {
    return null
  }

  return mutableRoundRobinUpdateShareAtIndex(
    distributions,
    itemIndex,
    updatedValue,
    lastRoundRobinIndex,
    sum
  )
}

// export function updateDistributionValuesHelper(
//   distributions: WritableDraft<BaseDistribution>[],
//   values: BaseDistribution[]
// ) {
//   distributions.forEach((item, index) => {
//     item.share = values[index]
//   })
// }
