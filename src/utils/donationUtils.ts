/* eslint-disable no-continue */

import { BaseDistribution } from '../store/donation/donation.types'

type ShareEntry = BaseDistribution

export const getStepLength = (sum: number) => (sum < 5 ? 1 : 5)

/**
 * @warn Will mutate entries.
 */
export function mutableRoundRobinUpdateAllShares(
  entries: ShareEntry[],
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
  entries: ShareEntry[],
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
 */
export function updateValues(
  entries: BaseDistribution[],
  updateDelta: number,
  lastRoundRobinIndex: number,
  minValue: number,
  maxValue: number,
  updatedIndex?: number
) {
  let updateAbsDiff = Math.abs(updateDelta)
  const deltaPerStep = updateDelta / updateAbsDiff

  let deltaPerStep = (updateDelta / updateAbsDiff) * stepLength

  let roundRobinIndex = lastRoundRobinIndex
  while (updateAbsDiff > 0) {
    if (updateAbsDiff < deltaPerStep) {
      stepLength = 1
      deltaPerStep = (updateDelta / Math.abs(updateDelta)) * stepLength
    }
    roundRobinIndex = (roundRobinIndex + 1) % nbrOfValues

    if (roundRobinIndex === updatedIndex) {
      continue
    }

    const entry = entries[roundRobinIndex]
    // If a cause was set to 0, then it should be kept at 0 unless the remaining causes also are 0 or locked
    // ie only update a 0-cause when there is no other option
    const shouldStickToZero = () =>
      entry.share === 0 &&
      entries
        .filter((_, i) => i !== updatedIndex)
        .filter((e) => e.share === 0 || e.isLocked).length === 1
    if (updatedIndex !== undefined && (entry.isLocked || shouldStickToZero())) {
      continue
    }

    const currentStepValue = entry.share
    const nextValue = clamp(minValue, maxValue, currentStepValue + deltaPerStep)
    if (currentStepValue !== nextValue) {
      entries[roundRobinIndex].share = nextValue
      updateAbsDiff -= 1
    }
  }

  return { roundRobinEndIndex: roundRobinIndex }
}

function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value))
}
