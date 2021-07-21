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
        // expect(entries[0].sum).toBe(40)
        // expect(entries[1].sum).toBe(90)
        // expect(entries[2].sum).toBe(70)
      })
      it('should round to 5 for decrease', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: false },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 25, 0)
        expect(entries[0].share).toBe(25)
        expect(entries[1].share).toBe(43)
        expect(entries[2].share).toBe(32)
      })
      it('should update cause set to 0', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 0, sum: 0, isLocked: false },
          { id: 'health', share: 60, sum: 30, isLocked: false },
          { id: 'animal', share: 40, sum: 20, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 1, 20, 0)
        expect(entries[0].share).toBe(20)
        expect(entries[1].share).toBe(20)
        expect(entries[2].share).toBe(60)
      })
    })
    describe('increasing', () => {
      it('should update all 3', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 52, sum: 100, isLocked: false },
          { id: 'health', share: 29, sum: 60, isLocked: false },
          { id: 'animal', share: 19, sum: 40, isLocked: false },
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
      it('should not decrease a cause that is already 0', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 0, sum: 0, isLocked: false },
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
      it('should update index 2 when index 1 is locked', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: true },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 2, 30, 0)
        expect(entries[0].share).toBe(40)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(30)
      })
      it('should not update anything when all causes are locked', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: true },
          { id: 'health', share: 30, sum: 60, isLocked: true },
          { id: 'animal', share: 20, sum: 40, isLocked: true },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 1, 70, 0)
        expect(entries[0].share).toBe(50)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(20)
      })

      it('should not update unlocked index 0 when the other 2 are locked', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: true },
          { id: 'animal', share: 20, sum: 40, isLocked: true },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 0, 80, 0)
        expect(entries[0].share).toBe(50)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(20)
      })

      // it('should round sum up to 5', () => {
      //   const entries: BaseDistribution[] = [
      //     { id: 'climate', share: 50, sum: 100, isLocked: false },
      //     { id: 'health', share: 30, sum: 60, isLocked: false },
      //     { id: 'animal', share: 20, sum: 40, isLocked: false },
      //   ]
      //   mutableRoundRobinUpdateShareAtIndex(entries, 0, 65, 0)
      //   expect(entries[0].share).toBe(65)
      //   expect(entries[1].share).toBe(30)
      //   expect(entries[2].share).toBe(5)
      // })
      it('should not update when one other value is 0 and the other is locked', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 0, sum: 0, isLocked: false },
          { id: 'health', share: 60, sum: 60, isLocked: true },
          { id: 'animal', share: 40, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 2, 50, 0)
        expect(entries[0].share).toBe(0)
        expect(entries[1].share).toBe(60)
        expect(entries[2].share).toBe(40)
      })
    })
    describe('decreasing', () => {
      it('should update correctly when just one other value is locked', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 50, sum: 100, isLocked: false },
          { id: 'health', share: 30, sum: 60, isLocked: true },
          { id: 'animal', share: 20, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 2, 10, 0)
        expect(entries[0].share).toBe(60)
        expect(entries[1].share).toBe(30)
        expect(entries[2].share).toBe(10)
      })
      it('should update when one value from 0 when the third one is locked', () => {
        const entries: BaseDistribution[] = [
          { id: 'climate', share: 0, sum: 0, isLocked: false },
          { id: 'health', share: 60, sum: 60, isLocked: true },
          { id: 'animal', share: 40, sum: 40, isLocked: false },
        ]
        mutableRoundRobinUpdateShareAtIndex(entries, 2, 30, 0)
        expect(entries[0].share).toBe(10)
        expect(entries[1].share).toBe(60)
        expect(entries[2].share).toBe(30)
      })
      // it('should round sum to 5', () => {
      //   const entries: BaseDistribution[] = [
      //     { id: 'climate', share: 50, sum: 50, isLocked: false },
      //     { id: 'health', share: 30, sum: 30, isLocked: false },
      //     { id: 'animal', share: 20, sum: 20, isLocked: false },
      //   ]
      //   mutableRoundRobinUpdateShareAtIndex(entries, 0, 43, 0)
      //   expect(entries[0].share).toBe(43)
      //   expect(entries[1].share).toBe(34)
      //   expect(entries[2].share).toBe(23)
      //   expect(entries[0].sum).toBe(45)
      //   expect(entries[1].sum).toBe(35)
      //   expect(entries[2].sum).toBe(20)
      // })
    })
  })
})
