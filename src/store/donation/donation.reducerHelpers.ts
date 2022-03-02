import {
  Cause,
  Organization,
} from '../../@types/import/content/organizations.types'
import { ShareType } from '../../constants/enums/ShareType'
import {
  mutableRoundRobinUpdateShareAtIndex,
  clamp,
} from '../../utils/donationUtils'

import {
  BaseDistribution,
  CauseDistribution,
  OrganizationDistribution,
} from './donation.types'

function resetOrgDistribution(organizations: Organization[], causeSum: number) {
  const nbrOfOrgs = organizations.length
  const totalShares = 100
  let remainingSumOrgs = causeSum
  let remainingSharesOrgs = totalShares

  return organizations.map((organization): OrganizationDistribution => {
    // orgShare as equal shar could be replaced with standard values
    // if they are added as a standardValue to the Organization type
    const orgShare = Math.min(
      remainingSharesOrgs,
      Math.ceil(totalShares / nbrOfOrgs)
    )
    const orgSum = Math.min(
      (orgShare / 100) * (causeSum ?? 0),
      remainingSumOrgs
    )

    remainingSumOrgs -= orgSum
    remainingSharesOrgs -= orgShare

    return {
      id: organization.id,
      isLocked: false,
      name: organization.name,
      share: orgShare,
      sum: orgSum,
    }
  })
}

const PercentageToKronor = (percentage: number, max: number | null) => {
  const stepLength = 5
  const value = max ? (percentage / 100) * max : 0
  const rounded = Math.ceil(Math.round(value) / stepLength) * stepLength
  return rounded
}

export const updateAllSums = <T extends BaseDistribution>(
  distributions: T[],
  totalSum: number
): T[] => {
  let remainingSum = totalSum

  return distributions.map((distribution) => {
    const sumInKronor = PercentageToKronor(distribution.share, totalSum)
    const clampedSum = clamp(0, remainingSum, sumInKronor)
    remainingSum -= clampedSum
    return { ...distribution, sum: clampedSum }
  })
}

export const updateAllSumsForCauses = (
  causes: CauseDistribution[],
  totalSum: number
) => {
  const remainingSumCauses = totalSum

  return updateAllSums(causes, remainingSumCauses).map((c) => ({
    ...c,
    lastOrganizationRoundRobinIndex: 0,
    organizationsDistribution: updateAllSums(
      c.organizationsDistribution,
      c.sum
    ),
  }))
}

export function resetDistributionsHelper(
  causesData: Cause[],
  donationSum: number
) {
  let remainingSumCauses = donationSum
  let remainingShares = 100

  return causesData.map((cause) => {
    // per cause
    // make sure last share has no more than is left
    const causeShare = Math.max(
      remainingShares - cause.standardShare,
      cause.standardShare
    )
    // calculate sum from share
    const initialCauseSum = (causeShare / 100) * (donationSum ?? 0)
    // make sure last sum has no more than is left
    const causeSum = Math.max(
      remainingSumCauses - initialCauseSum,
      initialCauseSum
    )

    // deduct sum from total amount
    remainingShares -= causeShare
    remainingSumCauses -= causeSum

    const causeDistribution: CauseDistribution = {
      id: cause.id,
      isLocked: false,
      name: cause.name,
      lastOrganizationRoundRobinIndex: 0,
      organizationsDistribution: resetOrgDistribution(
        cause.organizations,
        causeSum
      ),
      share: causeShare,
      shareType: ShareType.Standard,
      sum: causeSum,
    }

    return causeDistribution
  })
}

/**
 * Update cause distributions, and their organizations distributions accordingly
 */
export function updateCauseDistributionsHelper(
  totalSum: number,
  distributions: CauseDistribution[],
  updatedId: BaseDistribution['id'],
  updatedValue: number,
  lastRoundRobinIndex: number
) {
  const itemIndex = distributions.findIndex((item) => item.id === updatedId)

  if (itemIndex === -1) {
    return null
  }

  const roundrobinIndex = mutableRoundRobinUpdateShareAtIndex(
    distributions,
    itemIndex,
    updatedValue,
    lastRoundRobinIndex
  )

  distributions = updateAllSumsForCauses(distributions, totalSum)

  return { roundrobinIndex, distributions }
}

export function updateDistributionsHelper(
  totalSum: number,
  distributions: BaseDistribution[],
  updatedId: BaseDistribution['id'],
  updatedValue: number,
  lastRoundRobinIndex: number
) {
  const itemIndex = distributions.findIndex((item) => item.id === updatedId)

  if (itemIndex === -1) {
    return null
  }

  const roundrobinIndex = mutableRoundRobinUpdateShareAtIndex(
    distributions,
    itemIndex,
    updatedValue,
    lastRoundRobinIndex
  )

  distributions = updateAllSums(distributions, totalSum)

  return { roundrobinIndex, distributions }
}
