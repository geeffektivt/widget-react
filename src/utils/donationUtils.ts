/* eslint-disable no-continue */

import { BaseDistribution } from '../store/donation/donation.types'

type ShareEntry = BaseDistribution

/**
 * @warn Will mutate entries.
 */
export function mutableRoundRobinUpdateShareAtIndex(
  entries: ShareEntry[],
  updatedIndex: number,
  updatedShare: number,
  lastRoundRobinIndex: number
): { roundRobinEndIndex: number } {
  if (entries[updatedIndex].isLocked) {
    return { roundRobinEndIndex: lastRoundRobinIndex }
  }
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
  const stepLength = 5

  const clampedUpdatedValue = clamp(minValue, maxValue, updatedShare)

  const currentValue = entries[updatedIndex].share
  const updateDelta = currentValue - clampedUpdatedValue
  let updateAbsDiff = Math.abs(updateDelta)
  const deltaPerStep = (updateDelta / updateAbsDiff) * stepLength

  entries[updatedIndex].share = clampedUpdatedValue

  let roundRobinIndex = lastRoundRobinIndex
  while (updateAbsDiff > 0) {
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
    if (entry.isLocked || shouldStickToZero()) {
      continue
    }

    const currentStepValue = entry.share
    const nextValue = clamp(minValue, maxValue, currentStepValue + deltaPerStep)
    const rounded = Math.round(nextValue / stepLength) * stepLength
    if (currentStepValue !== rounded) {
      entries[roundRobinIndex].share = rounded
      updateAbsDiff -= stepLength
    }
  }

  return { roundRobinEndIndex: roundRobinIndex }
}

function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value))
}
