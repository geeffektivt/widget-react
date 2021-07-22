import {
  Cause,
  Organization,
} from '../../@types/import/content/organizations.types'
import { ShareType } from '../../constants/enums/ShareType'
import { mutableRoundRobinUpdateShareAtIndex } from '../../utils/donationUtils'

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

  return organizations.map(
    (organization): OrganizationDistribution => {
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
    }
  )
}

function setOrgDistribution(
  organizations: OrganizationDistribution[],
  causeSum: number
) {
  let remainingSumOrgs = causeSum

  return organizations.map(
    (organization): OrganizationDistribution => {
      const initialOrganizationSum =
        (organization.share / 100) * (causeSum ?? 0)

      const organizationSum = Math.max(
        remainingSumOrgs - initialOrganizationSum,
        initialOrganizationSum
      )
      remainingSumOrgs -= organizationSum

      return {
        id: organization.id,
        isLocked: organization.isLocked,
        name: organization.name,
        share: organization.share,
        sum: organizationSum,
      }
    }
  )
}

export function updateAllSumsHelper(
  distributions: CauseDistribution[],
  totalSum: number
) {
  let remainingSumCauses = totalSum
  // let remainingShares = 100

  return distributions.map((cause) => {
    // per cause
    // make sure last share has no more than is left
    // calculate sum from share
    const initialCauseSum = (cause.share / 100) * (totalSum ?? 0)
    // make sure last sum has no more than is left
    const causeSum = Math.max(
      remainingSumCauses - initialCauseSum,
      initialCauseSum
    )
    // deduct sum from total amount
    remainingSumCauses -= causeSum

    const causeDistribution: CauseDistribution = {
      id: cause.id,
      isLocked: cause.isLocked,
      name: cause.name,
      lastOrganizationRoundRobinIndex: 0,
      organizationsDistribution: setOrgDistribution(
        cause.organizationsDistribution,
        causeSum
      ),
      share: cause.share,
      shareType: cause.shareType,
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
