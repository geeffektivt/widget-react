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
  const updateDelta = currentValue - clampedUpdatedValue
  let updateAbsDiff = Math.abs(updateDelta)
  const deltaPerStep = updateDelta / updateAbsDiff

  entries[updatedIndex].share = clampedUpdatedValue

  let roundRobinIndex = lastRoundRobinIndex
  while (updateAbsDiff > 0) {
    roundRobinIndex = (roundRobinIndex + 1) % nbrOfValues

    if (roundRobinIndex === updatedIndex) {
      continue
    }

    const entry = entries[roundRobinIndex]
    if (entry.isLocked) {
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
