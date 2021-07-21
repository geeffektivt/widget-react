import { Cause } from '../../@types/import/content/organizations.types'
import { ShareType } from '../../constants/enums/ShareType'
import { mutableRoundRobinUpdateShareAtIndex } from '../../utils/donationUtils'

import {
  BaseDistribution,
  CauseDistribution,
  OrganizationDistribution,
} from './donation.types'

function setOrgDistribution(organizationIds: string[], causeSum: number) {
  const nbrOfOrgs = organizationIds.length
  const totalShares = 100
  let remainingSumOrgs = causeSum
  let remainingSharesOrgs = totalShares

  return organizationIds.map((id) => {
    const orgSum = Math.min(remainingSumOrgs, Math.round(causeSum / nbrOfOrgs))
    const orgShare = Math.min(
      remainingSharesOrgs,
      Math.round(totalShares / nbrOfOrgs)
    )

    remainingSumOrgs -= orgSum
    remainingSharesOrgs -= orgShare

    const organizationDistribution: OrganizationDistribution = {
      id,
      isLocked: false,
      name: organization.name,
      share: orgShare,
      sum: orgSum,
    }

    return organizationDistribution
  })
}

export function updateAllSumsHelper(
  distributions: CauseDistribution[],
  totalSum: number
) {
  let remainingSumCauses = totalSum
  let remainingShares = 100

  return distributions.map((cause) => {
    // per cause
    // make sure last share has no more than is left
    const causeShare = Math.max(remainingShares - cause.share, cause.share)
    // calculate sum from share
    const initialCauseSum = (causeShare / 100) * (totalSum ?? 0)
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
      lastOrganizationRoundRobinIndex: 0,
      organizationsDistribution: setOrgDistribution(
        cause.organizationsDistribution.map((org) => org.id),
        causeSum
      ),
      share: causeShare,
      shareType: ShareType.Standard,
      sum: causeSum,
    }

    return causeDistribution
  })
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
      organizationsDistribution: setOrgDistribution(
        cause.organizations.map((org) => org.id),
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
  distributions: CauseDistribution[],
  updatedId: BaseDistribution['id'],
  updatedValue: number,
  lastRoundRobinIndex: number
) {
  const itemIndex = distributions.findIndex((item) => item.id === updatedId)

  if (itemIndex === -1) {
    return null
  }
  // const oldDistributionShares = distributions.map((d) => d.share)

  const roundrobinIndex = mutableRoundRobinUpdateShareAtIndex(
    distributions,
    itemIndex,
    updatedValue,
    lastRoundRobinIndex
  )

  // distributions.forEach((d, i) => {
  //   const { roundRobinEndIndex } = mutableRoundRobinUpdateAllShares(
  //     d.organizationsDistribution,
  //     oldDistributionShares[i],
  //     d.share,
  //     d.lastOrganizationRoundRobinIndex
  //   )
  //   d.lastOrganizationRoundRobinIndex = roundRobinEndIndex
  // })

  return roundrobinIndex
}

export function updateDistributionsHelper(
  distributions: BaseDistribution[],
  updatedId: BaseDistribution['id'],
  updatedValue: number,
  lastRoundRobinIndex: number
) {
  const itemIndex = distributions.findIndex((item) => item.id === updatedId)

  if (itemIndex === -1) {
    return null
  }

  return mutableRoundRobinUpdateShareAtIndex(
    distributions,
    itemIndex,
    updatedValue,
    lastRoundRobinIndex
  )
}
