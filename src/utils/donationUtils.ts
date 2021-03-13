export function roundRobinUpdateValueAtIndex(
  values: number[],
  updatedIndex: number,
  updatedValue: number,
  lastRoundRobinIndex: number
): { values: number[]; roundRobinEndIndex: number } {
  const nbrOfValues = values.length
  if (nbrOfValues === 1) {
    return { values: [updatedValue], roundRobinEndIndex: 0 }
  }

  const minValue = 0
  const maxValue = 100

  const clampedUpdatedValue = clamp(minValue, maxValue, updatedValue)

  const currentValue = values[updatedIndex]
  const updateDelta = currentValue - clampedUpdatedValue
  let updateAbsDiff = Math.abs(updateDelta)
  const deltaPerStep = updateDelta / updateAbsDiff

  const valuesClone = [...values]
  valuesClone[updatedIndex] = clampedUpdatedValue

  let roundRobinIndex = lastRoundRobinIndex
  while (updateAbsDiff > 0) {
    roundRobinIndex = (roundRobinIndex + 1) % nbrOfValues

    if (roundRobinIndex === updatedIndex) {
      // eslint-disable-next-line no-continue
      continue
    }

    const currentStepValue = valuesClone[roundRobinIndex]
    const nextValue = clamp(minValue, maxValue, currentStepValue + deltaPerStep)
    if (currentStepValue !== nextValue) {
      valuesClone[roundRobinIndex] = nextValue
      updateAbsDiff -= 1
    }
  }

  return { values: valuesClone, roundRobinEndIndex: roundRobinIndex }
}

function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value))
}
