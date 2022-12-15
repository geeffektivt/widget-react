import {
  MAX_CAUSE_POSTERS_SHOWN_IN_GIFTCARD,
  MAX_ORGANISATION_LOGOS_SHOWN_IN_GIFTCARD,
  MAX_ORGANISATION_SHOWN_IN_GIFTCARD,
} from 'constants/GiftCardConstants'

import { createSelector } from 'reselect'
import { getCausesPoster } from 'utils/imageUtils'

import { ShareType } from '../../constants/enums/ShareType'
import { WidgetStoreState } from '../store'

import { CauseDistribution, OrganizationDistribution } from './donation.types'

const donationSlice = (state: WidgetStoreState) => state.donation

const doesCauseOrOrgHaveDonations = (
  causeOrOrgDistribution: CauseDistribution | OrganizationDistribution
): boolean => causeOrOrgDistribution.sum > 0

const isShareTypeStandard = (cause: CauseDistribution): boolean =>
  cause.shareType == ShareType.Standard

export const selectDonationSum = createSelector(
  donationSlice,
  (state) => state.sum
)
export const selectCausesWithDonation = createSelector(
  donationSlice,
  (state) => {
    return state.causesDistribution.filter(doesCauseOrOrgHaveDonations)
  }
)

type PosterImage = {
  id: string
  imgUrl: string
  name: string
}

export const selectCausesWithDonationPosters = createSelector(
  selectCausesWithDonation,
  (state) => {
    if (state.length == 1) {
      return state
        .filter((cause) => typeof cause.imgUrl !== undefined)
        .reduce((acc, cause) => {
          if (typeof cause.imgUrl === 'string') {
            acc.push({
              id: cause.id,
              imgUrl: cause.imgUrl,
              name: cause.name,
            })
          } else {
            cause.imgUrl?.map((url) => {
              acc.push({
                id: cause.id,
                imgUrl: url,
                name: cause.name,
              })
            })
          }
          return acc
        }, [] as PosterImage[])
    } else {
      return state
        .filter((cause) => typeof cause.imgUrl !== undefined)
        .map((cause) => {
          return {
            id: cause.id,
            imgUrl: getCausesPoster(cause.imgUrl as string | string[]),
            name: cause.name,
          }
        })
        .slice(0, MAX_CAUSE_POSTERS_SHOWN_IN_GIFTCARD)
    }
  }
)

export const selectCauseNamesWithDonation = createSelector(
  selectCausesWithDonation,
  (state) => {
    return state.map((causesDistribution) => causesDistribution.name)
  }
)

export const selectOranisationsWithDonation = createSelector(
  donationSlice,
  (state) =>
    state.causesDistribution
      .filter(doesCauseOrOrgHaveDonations)
      .map((cause) =>
        cause.organizationsDistribution.filter(doesCauseOrOrgHaveDonations)
      )
      .flat()
)

// selects causes with a standard share type and organisations that have a customised allocation share.
export const selectCausesOrOranisationsWithDonation = createSelector(
  selectCausesWithDonation,
  (state) => {
    const standardTypeShareCauses = state.filter(isShareTypeStandard)
    const otherOrgs = state
      .filter((cause) => !isShareTypeStandard(cause))
      .map((cause) =>
        cause.organizationsDistribution.filter(doesCauseOrOrgHaveDonations)
      )
      .flat()
    return [...standardTypeShareCauses, ...otherOrgs]
  }
)

export const selectAllOrTopThreeOranisationsWithDonation = createSelector(
  [selectCausesOrOranisationsWithDonation, (_, onlyThree = true) => onlyThree],
  (state, onlyThree: boolean) => {
    if (onlyThree) {
      return state
        .sort((a, b) => a.sum - b.sum)
        .slice(0, MAX_ORGANISATION_SHOWN_IN_GIFTCARD)
    } else {
      return state.sort((a, b) => a.sum - b.sum)
    }
  }
)

export const selectOrganisationLogos = createSelector(
  selectAllOrTopThreeOranisationsWithDonation,
  (state) =>
    state
      .slice(0, MAX_ORGANISATION_LOGOS_SHOWN_IN_GIFTCARD)
      .filter((organisation) => organisation.imgUrl !== undefined)
      .filter(
        (
          organisation: CauseDistribution | OrganizationDistribution
        ): organisation is OrganizationDistribution =>
          !('organizationsDistribution' in organisation)
      )
      .map((organisation) => {
        return {
          id: organisation.id,
          logo: organisation.imgUrl as string,
          infoUrl: organisation.infoUrl,
          name: organisation.name,
        }
      })
)

export const selectOranisationsWithDonationTrunked = createSelector(
  selectCausesOrOranisationsWithDonation,
  (state) => state.length > MAX_ORGANISATION_SHOWN_IN_GIFTCARD
)
