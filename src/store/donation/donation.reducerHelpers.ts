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

export function resetOrgDistribution(
  organizations: Organization[],
  causeSum: number,
  chosenOrganizationId?: string
) {
  const nbrOfOrgs = organizations.length
  const totalShares = 100
  let remainingSumOrgs = causeSum
  let remainingSharesOrgs = totalShares

  return organizations.map((organization): OrganizationDistribution => {
    // orgShare as equal shar could be replaced with standard values
    // if they are added as a standardValue to the Organization type
    const orgShare = chosenOrganizationId
      ? organization.id === chosenOrganizationId
        ? 100
        : 0
      : Math.min(remainingSharesOrgs, Math.ceil(totalShares / nbrOfOrgs))

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
      shortDescription: organization.shortDescription,
      imgUrl: organization.imgUrl,
      infoUrl: organization.infoUrl,
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
  donationSum: number,
  chosenCauseId?: string,
  chosenOrganizationId?: string
) {
  let remainingSumCauses = donationSum
  let remainingShares = 100

  causesData = chosenCauseId
    ? causesData.map((c) =>
        c.id === chosenCauseId
          ? { ...c, standardShare: 100 }
          : { ...c, standardShare: 0 }
      )
    : causesData

  return causesData.map((cause, i) => {
    const organizationOverride = chosenCauseId && cause.id === chosenCauseId

    const isLastCause = i == causesData.length
    // per cause
    // make sure last share has no more than is left
    const causeShare = isLastCause
      ? Math.max(remainingShares - cause.standardShare, cause.standardShare)
      : cause.standardShare
    // calculate sum from share
    const initialCauseSum = (causeShare / 100) * (donationSum ?? 0)
    // make sure last sum has no more than is left
    const causeSum = isLastCause
      ? Math.max(remainingSumCauses - initialCauseSum, initialCauseSum)
      : initialCauseSum

    // deduct sum from total amount
    remainingShares -= causeShare
    remainingSumCauses -= causeSum

    const causeDistribution: CauseDistribution = {
      id: cause.id,
      isLocked: false,
      name: cause.name,
      imgUrl: cause.imgUrl,
      lastOrganizationRoundRobinIndex: 0,
      organizationsDistribution: resetOrgDistribution(
        cause.organizations,
        causeSum,
        organizationOverride ? chosenOrganizationId : undefined
      ),
      share: causeShare,
      shareType: organizationOverride ? ShareType.Custom : ShareType.Standard,
      sum: causeSum,
      shortDescription: cause.standardOrganizationShareExplanation,
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
