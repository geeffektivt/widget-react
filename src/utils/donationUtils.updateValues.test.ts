import { BaseDistribution } from '../store/donation/donation.types'

import { updateValues } from './donationUtils'

// These need to be updates
describe('updateValues', () => {
  describe('when total available sum has', () => {
    it('decreased, all shares should decrease', () => {
      const entries: BaseDistribution[] = [
        { id: 'climate', share: 10, isLocked: false, sum: 10 },
        { id: 'health', share: 70, isLocked: false, sum: 70 },
        { id: 'animal', share: 20, isLocked: false, sum: 20 },
      ]
      updateValues(entries, -32, 2, 0, 68, undefined)
      expect(entries[0].share).toBe(0)
      expect(entries[1].share).toBe(59)
      expect(entries[2].share).toBe(9)
    })
    it('decreased so that two ends up at 0, the remaining cause should have the total share', () => {
      const entries: BaseDistribution[] = [
        { id: 'climate', share: 10, isLocked: false, sum: 10 },
        { id: 'health', share: 70, isLocked: false, sum: 70 },
        { id: 'animal', share: 20, isLocked: false, sum: 20 },
      ]
      updateValues(entries, -80, 0, 0, 20, undefined)
      expect(entries[0].share).toBe(0)
      expect(entries[1].share).toBe(20)
      expect(entries[2].share).toBe(0)
    })
    it('decreased and shares not rounded, all shares should decrease', () => {
      const entries: BaseDistribution[] = [
        { id: 'climate', share: 34, isLocked: false, sum: 17 },
        { id: 'health', share: 34, isLocked: false, sum: 17 },
        { id: 'animal', share: 32, isLocked: false, sum: 16 },
      ]
      updateValues(entries, -10, 2, 0, 40, undefined)
      expect(entries[0].share).toBe(13)
      expect(entries[1].share).toBe(14)
      expect(entries[2].share).toBe(13)
    })
    it('decreased a lot, all shares should decrease', () => {
      const entries: BaseDistribution[] = [
        { id: 'climate', share: 34, isLocked: false, sum: 17 },
        { id: 'health', share: 34, isLocked: false, sum: 17 },
        { id: 'animal', share: 32, isLocked: false, sum: 16 },
      ]
      updateValues(entries, -45, 2, 0, 5, undefined)
      expect(entries[0].share).toBe(2)
      expect(entries[1].share).toBe(2)
      expect(entries[2].share).toBe(1)
    })
    it('increased, all shares should increase', () => {
      const entries: BaseDistribution[] = [
        { id: 'climate', share: 10, isLocked: false, sum: 10 },
        { id: 'health', share: 70, isLocked: false, sum: 70 },
        { id: 'animal', share: 20, isLocked: false, sum: 20 },
      ]
      updateValues(entries, 300, 0, 0, 400, undefined)
      expect(entries[0].share).toBe(110)
      expect(entries[1].share).toBe(170)
      expect(entries[2].share).toBe(120)
    })
    it('increased and shares not rounded, all shares should increase', () => {
      const entries: BaseDistribution[] = [
        { id: 'climate', share: 10, isLocked: false, sum: 10 },
        { id: 'health', share: 70, isLocked: false, sum: 70 },
        { id: 'animal', share: 20, isLocked: false, sum: 20 },
      ]
      updateValues(entries, 5, 2, 0, 55, undefined)
      expect(entries[0].share).toBe(19)
      expect(entries[1].share).toBe(19)
      expect(entries[2].share).toBe(17)
    })
    it('increased, locked distributions should also increase', () => {
      const entries: BaseDistribution[] = [
        { id: 'climate', share: 10, isLocked: false, sum: 10 },
        { id: 'health', share: 70, isLocked: false, sum: 70 },
        { id: 'animal', share: 20, isLocked: false, sum: 20 },
      ]
      updateValues(entries, 300, 0, 0, 400, undefined)
      expect(entries[0].share).toBe(110)
      expect(entries[1].share).toBe(170)
      expect(entries[2].share).toBe(120)
    })
  })
})
