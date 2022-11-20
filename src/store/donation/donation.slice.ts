import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  Cause,
  CauseId,
  OrganizationId,
} from '../../@types/import/content/organizations.types'
import { DonorType } from '../../constants/enums/DonorType'
import { PaymentMethod } from '../../constants/enums/PaymentMethod'
import { DonationFrequency } from '../../constants/enums/RecurringDonation'
import { ShareType } from '../../constants/enums/ShareType'

import {
  resetDistributionsHelper,
  updateAllSumsForCauses,
  updateCauseDistributionsHelper,
  updateDistributionsHelper,
} from './donation.reducerHelpers'
import { CauseDistribution, DonationState, Donor } from './donation.types'

const initialState: DonationState = {
  recurring: DonationFrequency.Monthly,

  method: null,

  donorType: DonorType.Donor,

  sum: 750,

  lastCauseRoundRobinIndex: 0,
  causesDistribution: [],
  chosenOrganizationId:
    document.getElementById('root')?.getAttribute('data-organization-id') ??
    undefined,
}

export const donationSlice = createSlice({
  name: 'donation',
  initialState,

  reducers: {
    resetState() {
      return initialState
    },

    setDonationFrequency(state, action: PayloadAction<DonationFrequency>) {
      state.recurring = action.payload
    },

    setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.method = action.payload
    },

    setDonorType(state, action: PayloadAction<DonorType>) {
      state.donorType = action.payload
    },

    setDonorInformation(state, action: PayloadAction<Donor>) {
      state.donor = action.payload
    },

    setDonationSum(state, action: PayloadAction<number | null>) {
      state.sum = action.payload
    },

    resetDistribution(state, action: PayloadAction<Cause[]>) {
      const chosenCauseId =
        state.chosenOrganizationId &&
        action.payload.find((c) =>
          c.organizations.some((o) => o.id === state.chosenOrganizationId)
        )?.id
      state.causesDistribution = resetDistributionsHelper(
        action.payload,
        state.sum ?? 0,
        chosenCauseId,
        state.chosenOrganizationId ?? undefined
      )
      state.chosenCauseId = chosenCauseId
      state.lastCauseRoundRobinIndex = 0
    },

    updateAllDistributionSums(
      state,
      action: PayloadAction<CauseDistribution[]>
    ) {
      state.causesDistribution = updateAllSumsForCauses(
        action.payload,
        state.sum ?? 0
      )
      state.lastCauseRoundRobinIndex = 0
    },

    updateCauseShare(
      state,
      action: PayloadAction<{ causeId: CauseId; causeShare: number }>
    ) {
      const { causeId, causeShare } = action.payload

      if (state.sum) {
        const updatedDistribution = updateCauseDistributionsHelper(
          state.sum,
          state.causesDistribution,
          causeId,
          causeShare,
          state.lastCauseRoundRobinIndex
        )
        if (updatedDistribution) {
          // When one distribution has been maxed out, one of the siblings will be the last to be updated
          // and then it will fulfill the shouldStickToZero requirement
          // This if statement makes sure we dont pick a random distribution to get stuck but instead
          // it will always be the same one
          if (updatedDistribution.distributions.some((o) => o.share === 100)) {
            state.lastCauseRoundRobinIndex = 0
          } else {
            state.lastCauseRoundRobinIndex =
              updatedDistribution.roundrobinIndex.roundRobinEndIndex
          }
          state.causesDistribution = updatedDistribution.distributions
        }
      }
    },

    updateCauseShareLock(
      state,
      action: PayloadAction<{ causeId: CauseId; isLocked: boolean }>
    ) {
      const { causeId, isLocked } = action.payload

      const cause = state.causesDistribution.find(
        (causeItem) => causeItem.id === causeId
      )

      if (cause) {
        cause.isLocked = isLocked
      }
    },

    updateCauseShareType(
      state,
      action: PayloadAction<{ causeId: CauseId; shareType: ShareType }>
    ) {
      const { causeId, shareType } = action.payload

      const cause = state.causesDistribution.find(
        (causeItem) => causeItem.id === causeId
      )

      if (cause) {
        cause.shareType = shareType
      }
    },

    updateOrganizationShare(
      state,
      action: PayloadAction<{
        causeId: CauseId
        organizationId: OrganizationId
        organizationShare: number
      }>
    ) {
      const { causeId, organizationId, organizationShare } = action.payload

      const cause = state.causesDistribution.find(
        (causeItem) => causeItem.id === causeId
      )

      if (cause) {
        const updatedDistribution = updateDistributionsHelper(
          cause.sum,
          cause.organizationsDistribution,
          organizationId,
          organizationShare,
          cause.lastOrganizationRoundRobinIndex
        )

        if (updatedDistribution) {
          // When one distribution has been maxed out, one of the siblings will be the last to be updated
          // and then it will fulfill the shouldStickToZero requirement
          // This if statement makes sure we dont pick a random distribution to get stuck but instead
          // it will always be the same one
          if (updatedDistribution.distributions.some((o) => o.share === 100)) {
            cause.lastOrganizationRoundRobinIndex = 0
          } else {
            cause.lastOrganizationRoundRobinIndex =
              updatedDistribution.roundrobinIndex.roundRobinEndIndex
          }
          cause.organizationsDistribution = updatedDistribution.distributions
        }
      }
    },

    updateOrganizationShareLock(
      state,
      action: PayloadAction<{
        causeId: CauseId
        organizationId: OrganizationId
        isLocked: boolean
      }>
    ) {
      const { causeId, organizationId, isLocked } = action.payload

      const cause = state.causesDistribution.find(
        (causeItem) => causeItem.id === causeId
      )
      const organization = cause?.organizationsDistribution.find(
        (organizationItem) => organizationItem.id === organizationId
      )
      if (organization) {
        organization.isLocked = isLocked
      }
    },
  },
})

export const donationActions = donationSlice.actions
export const donationReducer = donationSlice.reducer
