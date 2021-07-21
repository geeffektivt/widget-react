import { BaseDistribution } from '../store/donation/donation.types'

import { mutableRoundRobinUpdateShareAtIndex } from './donationUtils'

describe('mutableRoundRobinUpdateShareAtIndex', () => {
  describe('when all unlocked', () => {
    describe('decreasing', () => {
      it('should update all 3', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 20, 0)
        expect(entries[0].share).toBe(20)
        expect(entries[1].share).toBe(45)
        expect(entries[2].share).toBe(35)
      })
      it('should round to 5 for decrease', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 25, 0)
        expect(entries[0].share).toBe(25)
        expect(entries[1].share).toBe(45)
        expect(entries[2].share).toBe(30)
      })
      it('should not update cause set to 0', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 1, 20, 0)
        expect(entries[0].share).toBe(0)
        expect(entries[1].share).toBe(20)
        expect(entries[2].share).toBe(30)
      })
    })
    describe('increasing', () => {
      it('should update all 3', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 70, 0)
        expect(entries[0].share).toBe(70)
        expect(entries[1].share).toBe(20)
        expect(entries[2].share).toBe(10)
      })
      it('should update all 3 when two reach 0', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 100, 0)
        expect(entries[0].share).toBe(100)
        expect(entries[1].share).toBe(0)
        expect(entries[2].share).toBe(0)
      })
      it('should round to 5', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 55, 0)
        expect(entries[0].share).toBe(55)
        expect(entries[1].share).toBe(27)
        expect(entries[2].share).toBe(18)
      })
      it('should not update cause set to 0', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 1, 40, 0)
        expect(entries[0].share).toBe(0)
        expect(entries[1].share).toBe(40)
        expect(entries[2].share).toBe(10)
      })
    })
  })
  describe('when some locked', () => {
    describe('increasing', () => {
      it('should update 2 when 1 is locked', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 2, 30, 0)
        expect(entries[0].share).toBe(40)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(30)
      })
      it('should not update locked cause', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 1, 70, 0)
        expect(entries[0].share).toBe(50)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(20)
      })

      it('should update 0 when other 2 is locked', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 80, 0)
        expect(entries[0].share).toBe(50)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(20)
      })

      it('should round to 5', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 65, 0)
        expect(entries[0].share).toBe(65)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(5)
      })
      it('should update 0 when one is 0 and other locked', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 2, 30, 0)
        expect(entries[0].share).toBe(0)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(20)
      })
    })
    describe('decreasing', () => {
      it('should update 2 when 1 is locked', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 2, 10, 0)
        expect(entries[0].share).toBe(60)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(10)
      })
      it('should not update locked cause', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 1, 10, 0)
        expect(entries[0].share).toBe(50)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(20)
      })

      it('should update 0 when other 2 is locked', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 10, 0)
        expect(entries[0].share).toBe(50)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(20)
      })
      it('should round to 5', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 45, 0)
        expect(entries[0].share).toBe(45)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(25)
      })
      it('should update cause set to 0 when only option', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 2, 10, 0)
        expect(entries[0].share).toBe(10)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(10)
      })
    })
  })
})
