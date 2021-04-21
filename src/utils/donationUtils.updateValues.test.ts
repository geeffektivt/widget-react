import { BaseDistribution } from '../store/donation/donation.types'

import { updateValues } from './donationUtils'

describe('updateValues', () => {
  describe('when total available sum has', () => {
    it('decreased, all shares should decrease', () => {
      const entries: BaseDistribution[] = [
        { id: 'climate', share: 10, isLocked: false },
        { id: 'health', share: 70, isLocked: false },
        { id: 'animal', share: 20, isLocked: false },
      ]
      updateValues(entries, -32, 2, 0, 68, undefined)
      expect(entries[0].share).toBe(0)
      expect(entries[1].share).toBe(59)
      expect(entries[2].share).toBe(9)
    })
    it('decreased so that two ends up at 0, the remaining cause should have the total share', () => {
      const entries: BaseDistribution[] = [
        { id: 'climate', share: 10, isLocked: false },
        { id: 'health', share: 70, isLocked: false },
        { id: 'animal', share: 20, isLocked: false },
      ]
      updateValues(entries, -80, 0, 0, 20, undefined)
      expect(entries[0].share).toBe(0)
      expect(entries[1].share).toBe(20)
      expect(entries[2].share).toBe(0)
    })
    it('decreased a lot, all shares should decrease', () => {
      const entries: BaseDistribution[] = [
        { id: 'climate', share: 17, isLocked: false },
        { id: 'health', share: 17, isLocked: false },
        { id: 'animal', share: 16, isLocked: false },
      ]
      updateValues(entries, -45, 2, 0, 5, undefined)
      expect(entries[0].share).toBe(2)
      expect(entries[1].share).toBe(2)
      expect(entries[2].share).toBe(1)
    })
    it('increased, all shares should increase', () => {
      const entries: BaseDistribution[] = [
        { id: 'climate', share: 10, isLocked: false },
        { id: 'health', share: 70, isLocked: false },
        { id: 'animal', share: 20, isLocked: false },
      ]
      updateValues(entries, 300, 0, 0, 400, undefined)
      expect(entries[0].share).toBe(110)
      expect(entries[1].share).toBe(170)
      expect(entries[2].share).toBe(120)
    })
    it('increased, locked distributions should also increase', () => {
      const entries: BaseDistribution[] = [
        { id: 'climate', share: 10, isLocked: false },
        { id: 'health', share: 70, isLocked: true },
        { id: 'animal', share: 20, isLocked: true },
      ]
      updateValues(entries, 300, 0, 0, 400, undefined)
      expect(entries[0].share).toBe(110)
      expect(entries[1].share).toBe(170)
      expect(entries[2].share).toBe(120)
    })
  })
})
