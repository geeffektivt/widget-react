/* eslint-disable no-continue */

import { BaseDistribution } from '../store/donation/donation.types'

export const getStepLength = (sum: number) => (sum < 5 ? 1 : 5)

/**
 * @warn Will mutate entries.
 */
export function mutableRoundRobinUpdateAllShares(
  entries: BaseDistribution[],
  oldSum: number,
  sum: number,
  lastRoundRobinIndex: number
) {
  const minValue = 0
  const maxValue = sum
  const updateDelta = sum - oldSum

  return updateValues(
    entries,
    updateDelta,
    lastRoundRobinIndex,
    minValue,
    maxValue,
    undefined
  )
}

/**
 * @warn Will mutate entries.
 */
export function mutableRoundRobinUpdateShareAtIndex(
  entries: BaseDistribution[],
  updatedIndex: number,
  updatedShare: number,
  lastRoundRobinIndex: number,
  sum: number
): { roundRobinEndIndex: number } {
  const nbrOfValues = entries.length
  if (nbrOfValues === 1) {
    entries[updatedIndex].share = updatedShare
    return { roundRobinEndIndex: 0 }
  }

  const anyEntriesExceptIndexUnlocked = entries.some(
    (entry, index) => index !== updatedIndex && !entry.isLocked
  )
  if (!anyEntriesExceptIndexUnlocked) {
    return { roundRobinEndIndex: lastRoundRobinIndex }
  }

  const totalSumAvailable = entries.reduce(
    (acc, entry) => (acc += entry.isLocked ? 0 : entry.share),
    0
  )

  const minValue = 0
  const maxValue = Math.min(totalSumAvailable, 100)

  const clampedUpdatedValue = clamp(minValue, maxValue, updatedShare)
  const currentValue = entries[updatedIndex].share
  entries[updatedIndex].share = clampedUpdatedValue
  const updateDelta = currentValue - clampedUpdatedValue

  return updateValues(
    entries,
    updateDelta,
    lastRoundRobinIndex,
    minValue,
    maxValue,
    updatedIndex
  )
}

/**
 * updatedIndex = undefined means that the total available sum (maxValue) for the distributions changed,
 * so all entries should be updated even if they are locked
 * entries: orgs or cause proportion
  updateDelta: 
  updatedIndex?: number
 */
export function updateValues(
  entries: BaseDistribution[],
  updateDelta: number,
  lastRoundRobinIndex: number,
  minValue: number,
  maxValue: number,
  updatedIndex?: number
) {
  const minPercentage = 0
  const maxPercentage = 100
  if (updateDelta === 0) {
    console.log('Zero!!!!')
    return { roundRobinEndIndex: lastRoundRobinIndex }
  }
  let updateAbsDiff = Math.abs(updateDelta)
  const nbrOfValues = entries.length
  const stepLength = 1
  const deltaPerStep = (updateDelta / updateAbsDiff) * stepLength
  console.log('deltaPerStep', deltaPerStep)

  let roundRobinIndex = lastRoundRobinIndex
  let tries = 0
  while (updateAbsDiff > 0 && tries < 1000) {
    tries += 1
    if (tries >= 999) {
      console.log('SLIDER ERROR')
    }
    console.log('updateAbsDiff', updateAbsDiff)
    // if (updateAbsDiff < deltaPerStep) {
    //   stepLength = 1
    //   deltaPerStep = (updateDelta / Math.abs(updateDelta)) * stepLength
    // }
    roundRobinIndex = (roundRobinIndex + 1) % nbrOfValues

    if (roundRobinIndex === updatedIndex) {
      console.log('roundRobinIndex === updatedIndex')
      continue
    }

    const entry = entries[roundRobinIndex]
    // If a cause was set to 0, then it should be kept at 0 unless the remaining causes also are 0 or locked
    // ie only update a 0-cause when there is no other option
    const shouldStickToZero = () => false // TODO: FIX
    // () =>
    //   entry.share === 0 &&
    //   entries
    //     .filter((_, i) => i !== updatedIndex)
    //     .filter((e) => e.share === 0 || e.isLocked).length === 1
    if (updatedIndex !== undefined && (entry.isLocked || shouldStickToZero())) {
      console.log(
        'updatedIndex !== undefined && (entry.isLocked || shouldStickToZero())'
      )
      continue
    }

    const currentStepValue = entry.share
    const nextValue = currentStepValue + deltaPerStep // clamp(minValue, maxValue, currentStepValue + deltaPerStep)
    console.log('nextValue', nextValue)
    console.log('currentStepValue', currentStepValue)
    if (currentStepValue !== nextValue) {
      entries[roundRobinIndex].share = nextValue
      updateAbsDiff -= 1
    }
    // else {
    //   updateAbsDiff = 0
    // }
  }

  return { roundRobinEndIndex: roundRobinIndex }
}

function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value))
}

export const PercentageToKronor = (percentage: number, max: number | null) => {
  const stepLength = 5
  const value = max ? (percentage / 100) * max : 0
  const rounded = Math.round(value / stepLength) * stepLength
  return rounded
}
